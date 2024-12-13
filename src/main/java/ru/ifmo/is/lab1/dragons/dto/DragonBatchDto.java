package ru.ifmo.is.lab1.dragons.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import ru.ifmo.is.lab1.common.framework.dto.BatchDto;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveBatchDto;
import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadBatchDto;
import ru.ifmo.is.lab1.dragons.DragonType;
import ru.ifmo.is.lab1.people.dto.PersonBatchDto;
import ru.ifmo.is.lab1.coordinates.dto.CoordinateBatchDto;
import ru.ifmo.is.lab1.events.ResourceType;

@Data
public class DragonBatchDto implements BatchDto {
  @NotNull
  @NotBlank
  private String name;

  private Integer coordinatesId;
  private CoordinateBatchDto coordinates;

  private Integer caveId;
  private DragonCaveBatchDto cave;

  private Integer killerId;
  private PersonBatchDto killer;

  private Integer headId;
  private DragonHeadBatchDto head;

  @NotNull
  private DragonType type;

  @Positive
  private Integer age;

  @Positive
  private Integer wingspan;

  private Boolean speaking;

  @Override
  public ResourceType getResourceType() {
    return ResourceType.DRAGONS;
  }
}
