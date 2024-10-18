package ru.ifmo.is.lab1.coordinates.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CoordinateCreateDto {
  @NotNull
  @Max(301)
  private Integer x;

  @NotNull
  private Float y;
}
