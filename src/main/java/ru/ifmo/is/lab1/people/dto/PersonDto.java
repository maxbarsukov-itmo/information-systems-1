package ru.ifmo.is.lab1.people.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;
import ru.ifmo.is.lab1.locations.Location;
import ru.ifmo.is.lab1.people.Color;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class PersonDto extends AuditableDto {
  private int id;
  private String name;
  private Color eyeColor;
  private Color hairColor;
  private Location location;
  private LocalDate birthday;
  private double height;
  private String passportId;
}
