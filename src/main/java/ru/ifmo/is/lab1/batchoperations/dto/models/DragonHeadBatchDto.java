package ru.ifmo.is.lab1.batchoperations.dto.models;

import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadCreateDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class DragonHeadBatchDto extends DragonHeadCreateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.DRAGON_HEADS;
  }
}
