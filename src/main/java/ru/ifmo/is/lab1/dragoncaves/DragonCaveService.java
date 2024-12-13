package ru.ifmo.is.lab1.dragoncaves;

import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.framework.CrudService;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.dragoncaves.dto.*;
import ru.ifmo.is.lab1.dragoncaves.mappers.DragonCaveMapper;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.users.UserService;

@Service
public class DragonCaveService
  extends CrudService<
    DragonCave,
    DragonCaveRepository,
    DragonCaveMapper,
    DragonCavePolicy,
    DragonCaveDto,
    DragonCaveCreateDto,
    DragonCaveUpdateDto
  > {

  public DragonCaveService(
    DragonCaveRepository repository,
    DragonCaveMapper mapper,
    DragonCavePolicy policy,
    SearchMapper<DragonCave> searchMapper,
    UserService userService,
    EventService<DragonCave> eventService
  ) {
    super(repository, mapper, policy, searchMapper, userService, eventService);
  }
}
