package ru.ifmo.is.lab1.people.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import org.openapitools.jackson.nullable.JsonNullable;
import ru.ifmo.is.lab1.people.Color;

import java.util.Date;

@Data
public class PersonUpdateDto {
  @NotNull
  private JsonNullable<String> name;

  @NotNull
  private JsonNullable<Color> eyeColor;

  @NotNull
  private JsonNullable<Color> hairColor;

  @NotNull
  private JsonNullable<Integer> locationId;

  @NotNull
  private JsonNullable<Date> birthday;

  @NotNull
  private JsonNullable<Double> height;

  @NotNull
  private JsonNullable<String> passportId;
}
