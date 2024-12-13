package ru.ifmo.is.lab1.dragoncaves.dto;

import ru.ifmo.is.lab1.common.framework.dto.BatchDto;
import ru.ifmo.is.lab1.coordinates.dto.CoordinateUpdateDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class DragonCaveBatchDto extends CoordinateUpdateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.DRAGON_CAVES;
  }
}
