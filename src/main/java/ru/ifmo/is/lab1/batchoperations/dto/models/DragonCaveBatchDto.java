package ru.ifmo.is.lab1.batchoperations.dto.models;

import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveCreateDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class DragonCaveBatchDto extends DragonCaveCreateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.DRAGON_CAVES;
  }
}
