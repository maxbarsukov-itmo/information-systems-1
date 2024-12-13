package ru.ifmo.is.lab1.batchoperations.dto.models;

import ru.ifmo.is.lab1.coordinates.dto.CoordinateUpdateDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class CoordinateBatchDto extends CoordinateUpdateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.COORDINATES;
  }
}
