package ru.ifmo.is.lab1.dragoncaves.dto;

import lombok.Data;
import org.openapitools.jackson.nullable.JsonNullable;

@Data
public class DragonCaveUpdateDto {
  private JsonNullable<Float> depth;
}
