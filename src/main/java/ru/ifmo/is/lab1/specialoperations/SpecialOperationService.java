package ru.ifmo.is.lab1.specialoperations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import ru.ifmo.is.lab1.common.errors.ResourceNotFoundException;
import ru.ifmo.is.lab1.dragons.*;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.events.EventType;
import ru.ifmo.is.lab1.specialoperations.dto.*;

@Service
@RequiredArgsConstructor
public class SpecialOperationService {
  private static final String NO_DRAGONS_FOUND = "Error 1762: Where the Dragons Went?";
  private static final String DEATH_PREFIX = "(dead) ";
  private static final String DRAGON_ALREADY_DEAD = "Дракон давно умер. В убийстве отказано";

  private final DragonRepository repository;
  private final DragonMapper mapper;
  private final EventService<Dragon> eventService;

  public AverageAgeDto getAverageDragonAge() {
    var result = repository.getAverageAge();
    return result
      .map(averageAge -> new AverageAgeDto(null, averageAge))
      .orElseGet(() -> new AverageAgeDto(NO_DRAGONS_FOUND, null));
  }

  public DragonResultDto getOldestDragon() {
    var result = repository.findTopAgeByAgeIsNotNullOrderByAgeDesc();
    return result
      .map(dragon -> new DragonResultDto(null, mapper.map(dragon)))
      .orElseGet(() -> new DragonResultDto(NO_DRAGONS_FOUND, null));
  }

  public DragonResultDto getDragonInDeepestCave() {
    var result = repository.findDragonInDeepestCave();
    return result
      .map(dragon -> new DragonResultDto(null, mapper.map(dragon)))
      .orElseGet(() -> new DragonResultDto(NO_DRAGONS_FOUND, null));
  }

  @Transactional(isolation = Isolation.REPEATABLE_READ)
  public DragonResultDto killDragon(int id) {
    var dragon = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));

    if (dragon.getName().toLowerCase().contains("(dead)")) {
      return new DragonResultDto(DRAGON_ALREADY_DEAD, null);
    }

    dragon.setName(DEATH_PREFIX + dragon.getName());
    dragon.setSpeaking(false);
    repository.save(dragon);
    eventService.notify(EventType.KILL, dragon);
    return new DragonResultDto(null, mapper.map(dragon));
  }
}
