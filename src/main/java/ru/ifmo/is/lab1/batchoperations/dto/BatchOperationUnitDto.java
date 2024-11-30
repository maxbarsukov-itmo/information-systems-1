package ru.ifmo.is.lab1.batchoperations.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import ru.ifmo.is.lab1.batchoperations.dto.models.BatchDto;
import ru.ifmo.is.lab1.events.ResourceType;

@Data
public class BatchOperationUnitDto {
  @NotNull
  private OperationType type;

  @NotNull
  private ResourceType resourceType;

  private Integer resourceId;

  private BatchDto body;
}
