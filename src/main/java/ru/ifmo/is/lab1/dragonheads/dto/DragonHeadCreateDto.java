package ru.ifmo.is.lab1.dragonheads.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DragonHeadCreateDto {
  @NotNull
  private long size;

  private Float toothCount;
}
