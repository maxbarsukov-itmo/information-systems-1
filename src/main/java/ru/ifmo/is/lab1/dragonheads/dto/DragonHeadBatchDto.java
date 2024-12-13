package ru.ifmo.is.lab1.dragonheads.dto;

import ru.ifmo.is.lab1.common.framework.dto.BatchDto;
import ru.ifmo.is.lab1.events.ResourceType;

public class DragonHeadBatchDto extends DragonHeadUpdateDto implements BatchDto {
  @Override
  public ResourceType getResourceType() {
    return ResourceType.DRAGON_HEADS;
  }
}
