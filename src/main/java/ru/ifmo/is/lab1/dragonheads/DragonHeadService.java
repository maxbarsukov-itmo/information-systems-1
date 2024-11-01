package ru.ifmo.is.lab1.dragonheads;

import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.framework.CrudService;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.dragonheads.dto.*;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.users.UserService;

@Service
public class DragonHeadService
  extends CrudService<
    DragonHead,
    DragonHeadRepository,
    DragonHeadMapper,
    DragonHeadPolicy,
    DragonHeadDto,
    DragonHeadCreateDto,
    DragonHeadUpdateDto
  > {

  public DragonHeadService(
    DragonHeadRepository repository,
    DragonHeadMapper mapper,
    DragonHeadPolicy policy,
    SearchMapper<DragonHead> searchMapper,
    UserService userService,
    EventService<DragonHead> eventService
  ) {
    super(repository, mapper, policy, searchMapper, userService, eventService);
  }
}
