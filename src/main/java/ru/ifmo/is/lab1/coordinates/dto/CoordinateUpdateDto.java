package ru.ifmo.is.lab1.coordinates.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import org.openapitools.jackson.nullable.JsonNullable;

@Data
public class CoordinateUpdateDto {
  @NotNull
  @Max(301)
  private JsonNullable<Integer> x;

  @NotNull
  private JsonNullable<Float> y;
}
