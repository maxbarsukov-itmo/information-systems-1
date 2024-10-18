package ru.ifmo.is.lab1.dragonheads.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import org.openapitools.jackson.nullable.JsonNullable;

@Data
public class DragonHeadUpdateDto {
  @NotNull
  private JsonNullable<Long> size;

  private JsonNullable<Float> toothCount;
}
