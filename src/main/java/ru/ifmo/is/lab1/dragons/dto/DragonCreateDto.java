package ru.ifmo.is.lab1.dragons.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import ru.ifmo.is.lab1.dragons.DragonType;

@Data
public class DragonCreateDto {
  @NotNull
  @NotBlank
  private String name;

  @NotNull
  private Integer coordinatesId;

  private Integer caveId;

  private Integer killerId;

  @NotNull
  private Integer headId;

  @NotNull
  private DragonType type;

  @Positive
  private Integer age;

  @Positive
  private Integer wingspan;

  private Boolean speaking;
}
