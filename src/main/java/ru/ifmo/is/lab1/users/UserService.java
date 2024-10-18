package ru.ifmo.is.lab1.users;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.ifmo.is.lab1.common.errors.UserWithThisPasswordAlreadyExists;
import ru.ifmo.is.lab1.common.errors.UserWithThisUsernameAlreadyExists;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository repository;

  /**
   * Сохранение пользователя
   *
   * @return сохраненный пользователь
   */
  public User save(User user) {
    return repository.save(user);
  }

  /**
   * Создание пользователя
   *
   * @return созданный пользователь
   */
  public User create(User user) {
    if (repository.existsByUsername(user.getUsername())) {
      throw new UserWithThisUsernameAlreadyExists("Пользователь с таким именем уже существует");
    }

    var anotherUserWithThisPassword = repository.findByPassword(user.getPassword());
    if (anotherUserWithThisPassword.isPresent()) {
      throw new UserWithThisPasswordAlreadyExists(
        "Этот пароль уже занят пользователем '" + anotherUserWithThisPassword.get().getUsername()
          + "'. Попробуйте другой."
      );
    }

    return save(user);
  }

  /**
   * Получение пользователя по имени пользователя
   *
   * @return пользователь
   */
  @Cacheable("users")
  public User getByUsername(String username) {
    return repository.findByUsername(username)
      .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

  }

  /**
   * Получение пользователя по имени пользователя
   * <p>
   * Нужен для Spring Security
   *
   * @return пользователь
   */
  public UserDetailsService userDetailsService() {
    return this::getByUsername;
  }

  /**
   * Получение текущего пользователя
   *
   * @return текущий пользователь
   */
  @Cacheable("users")
  public User getCurrentUser() {
    // Получение имени пользователя из контекста Spring Security
    var username = SecurityContextHolder.getContext().getAuthentication().getName();
    return getByUsername(username);
  }

  /**
   * Получение имени текущего пользователя
   *
   * @return имя текущего пользователь
   */
  public String getCurrentUsername() {
    // Получение имени пользователя из контекста Spring Security
    return SecurityContextHolder.getContext().getAuthentication().getName();
  }
}