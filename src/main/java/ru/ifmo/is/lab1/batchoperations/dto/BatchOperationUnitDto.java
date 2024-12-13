package ru.ifmo.is.lab1.batchoperations.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.NotNull;
import ru.ifmo.is.lab1.batchoperations.dto.models.*;
import ru.ifmo.is.lab1.events.ResourceType;

@Data
public class BatchOperationUnitDto {
  @NotNull
  private OperationType type;

  @NotNull
  private ResourceType resourceType;

  private Integer resourceId;

  @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "resourceType", include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
  @JsonSubTypes(value = {
    @JsonSubTypes.Type(value = CoordinateBatchDto.class, name = "coordinates"),
    @JsonSubTypes.Type(value = DragonCaveBatchDto.class, name = "dragon-caves"),
    @JsonSubTypes.Type(value = DragonHeadBatchDto.class, name = "dragon-heads"),
    @JsonSubTypes.Type(value = DragonBatchDto.class, name = "dragons"),
    @JsonSubTypes.Type(value = LocationBatchDto.class, name = "locations"),
    @JsonSubTypes.Type(value = PersonBatchDto.class, name = "people")
  })
  private BatchDto body;
}