package ru.ifmo.is.lab1.people.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import ru.ifmo.is.lab1.people.Color;

import java.time.LocalDate;

@Data
public class PersonCreateDto {
  @NotBlank
  @Size(max = 255)
  private String name;

  @NotNull
  private Color eyeColor;

  private Color hairColor;

  @NotNull
  private int locationId;

  @NotNull
  @Past
  private LocalDate birthday;

  @NotNull
  @Min(0)
  private double height;

  private String passportId;
}
