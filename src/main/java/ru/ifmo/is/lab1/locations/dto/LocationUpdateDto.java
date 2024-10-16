package ru.ifmo.is.lab1.locations.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import org.openapitools.jackson.nullable.JsonNullable;

@Data
public class LocationUpdateDto {
  @NotNull
  private JsonNullable<Double> x;

  @NotNull
  private JsonNullable<Long> y;

  @NotNull
  private JsonNullable<Long> z;
}
