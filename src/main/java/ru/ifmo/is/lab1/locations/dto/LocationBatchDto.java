package ru.ifmo.is.lab1.locations.dto;

import ru.ifmo.is.lab1.common.framework.dto.BatchDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class LocationBatchDto extends LocationUpdateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.LOCATIONS;
  }
}
