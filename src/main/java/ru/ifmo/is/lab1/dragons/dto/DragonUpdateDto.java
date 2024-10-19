package ru.ifmo.is.lab1.dragons.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import org.openapitools.jackson.nullable.JsonNullable;
import ru.ifmo.is.lab1.dragons.DragonType;

@Data
public class DragonUpdateDto {
  @NotNull
  @NotBlank
  private JsonNullable<String> name;

  @NotNull
  private JsonNullable<Integer> coordinatesId;

  private JsonNullable<Integer> caveId;

  private JsonNullable<Integer> killerId;

  @NotNull
  private JsonNullable<Integer> headId;

  @NotNull
  private JsonNullable<DragonType> type;

  @Positive
  private JsonNullable<Integer> age;

  @Positive
  private JsonNullable<Integer> wingspan;

  private JsonNullable<Boolean> speaking;
}
