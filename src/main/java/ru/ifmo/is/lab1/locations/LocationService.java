package ru.ifmo.is.lab1.locations;

import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.framework.CrudService;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.locations.dto.*;
import ru.ifmo.is.lab1.locations.mappers.LocationMapper;
import ru.ifmo.is.lab1.users.UserService;

@Service
public class LocationService
  extends CrudService<
    Location,
    LocationRepository,
    LocationMapper,
    LocationPolicy,
    LocationDto,
    LocationCreateDto,
    LocationUpdateDto
  > {

  public LocationService(
    LocationRepository repository,
    LocationMapper mapper,
    LocationPolicy policy,
    SearchMapper<Location> searchMapper,
    UserService userService,
    EventService<Location> eventService
  ) {
    super(repository, mapper, policy, searchMapper, userService, eventService);
  }
}
