package ru.ifmo.is.lab1.locations.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LocationCreateDto {
  @NotNull
  private double x;

  @NotNull
  private long y;

  @NotNull
  private long z;
}
