package ru.ifmo.is.lab1.people;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.errors.ResourceNotFoundException;
import ru.ifmo.is.lab1.common.search.SearchDto;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.people.dto.*;
import ru.ifmo.is.lab1.users.User;
import ru.ifmo.is.lab1.users.UserService;

import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class PersonService {

  private final PersonRepository repository;
  private final PersonMapper mapper;
  private final SearchMapper<Person> searchMapper;
  private final PersonPolicy policy;
  private final UserService userService;

  public Page<PersonDto> getAll(Pageable pageable) {
    policy.showAll(currentUser());

    var people = repository.findAll(pageable);
    return people.map(mapper::map);
  }

  public Page<PersonDto> findBySearchCriteria(SearchDto searchData, Pageable pageable) {
    policy.search(currentUser());

    var people = repository.findAll(searchMapper.map(searchData), pageable);
    return people.map(mapper::map);
  }

  public PersonDto create(PersonCreateDto personData) {
    policy.create(currentUser());

    var person = mapper.map(personData);
    person.setCreatedBy(currentUser());
    person.setCreatedAt(ZonedDateTime.now());
    repository.save(person);
    return mapper.map(person);
  }

  public PersonDto getById(int id) {
    var person = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.show(currentUser(), person);

    return mapper.map(person);
  }

  public PersonDto update(PersonUpdateDto personData, int id) {
    var person = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.update(currentUser(), person);

    mapper.update(personData, person);
    person.setUpdatedBy(currentUser());
    person.setUpdatedAt(ZonedDateTime.now());
    repository.save(person);
    return mapper.map(person);
  }

  public boolean delete(int id) {
    return repository.findById(id)
      .map(person -> {
        policy.delete(currentUser(), person);
        repository.delete(person);
        return true;
      }).orElse(false);
  }

  private User currentUser() {
    try {
      return userService.getCurrentUser();
    } catch (UsernameNotFoundException _ex) {
      return null;
    }
  }
}
