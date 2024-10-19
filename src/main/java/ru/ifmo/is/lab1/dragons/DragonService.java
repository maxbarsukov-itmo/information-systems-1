package ru.ifmo.is.lab1.dragons;

import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.framework.CrudService;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.dragons.dto.*;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.users.UserService;

@Service
public class DragonService
  extends CrudService<
    Dragon,
    DragonRepository,
    DragonMapper,
    DragonPolicy,
    DragonDto,
    DragonCreateDto,
    DragonUpdateDto
  > {

  public DragonService(
    DragonRepository repository,
    DragonMapper mapper,
    DragonPolicy policy,
    SearchMapper<Dragon> searchMapper,
    UserService userService,
    EventService eventService
  ) {
    super(repository, mapper, policy, searchMapper, userService, eventService);
  }
}
