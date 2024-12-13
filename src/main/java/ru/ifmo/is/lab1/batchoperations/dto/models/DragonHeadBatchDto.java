package ru.ifmo.is.lab1.batchoperations.dto.models;

import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadUpdateDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class DragonHeadBatchDto extends DragonHeadUpdateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.DRAGON_HEADS;
  }
}
