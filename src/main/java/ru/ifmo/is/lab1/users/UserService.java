package ru.ifmo.is.lab1.users;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.ifmo.is.lab1.common.exceptions.UserWithThisUsernameAlreadyExists;

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

    return save(user);
  }

  /**
   * Получение пользователя по имени пользователя
   *
   * @return пользователь
   */
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
  public User getCurrentUser() {
    // Получение имени пользователя из контекста Spring Security
    var username = SecurityContextHolder.getContext().getAuthentication().getName();
    return getByUsername(username);
  }

  // TODO: remove
  /**
   * Выдача прав администратора текущему пользователю
   * <p>
   * Нужен для демонстрации
   */
  @Deprecated
  public void makeAdmin(User user) {
    user.setRole(Role.ROLE_ADMIN);
    save(user);
  }
}
