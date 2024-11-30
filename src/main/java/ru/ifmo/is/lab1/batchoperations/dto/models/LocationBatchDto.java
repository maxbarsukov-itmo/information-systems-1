package ru.ifmo.is.lab1.batchoperations.dto.models;

import ru.ifmo.is.lab1.locations.dto.LocationCreateDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class LocationBatchDto extends LocationCreateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.LOCATIONS;
  }
}
