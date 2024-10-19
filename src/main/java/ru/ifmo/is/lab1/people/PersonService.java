package ru.ifmo.is.lab1.people;

import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.framework.CrudService;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.people.dto.*;
import ru.ifmo.is.lab1.users.UserService;

@Service
public class PersonService
  extends CrudService<
    Person,
    PersonRepository,
    PersonMapper,
    PersonPolicy,
    PersonDto,
    PersonCreateDto,
    PersonUpdateDto
  > {

  public PersonService(
    PersonRepository repository,
    PersonMapper mapper,
    PersonPolicy policy,
    SearchMapper<Person> searchMapper,
    UserService userService,
    EventService eventService
  ) {
    super(repository, mapper, policy, searchMapper, userService, eventService);
  }
}
