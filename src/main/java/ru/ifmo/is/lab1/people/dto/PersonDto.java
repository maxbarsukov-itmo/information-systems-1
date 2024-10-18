package ru.ifmo.is.lab1.people.dto;

import lombok.Data;
import ru.ifmo.is.lab1.locations.Location;
import ru.ifmo.is.lab1.people.Color;
import ru.ifmo.is.lab1.users.User;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
public class PersonDto {
  private int id;
  private String name;
  private Color eyeColor;
  private Color hairColor;
  private Location location;
  private Date birthday;
  private double height;
  private String passportId;
  private User createdBy;
  private ZonedDateTime createdAt;
  private User updatedBy;
  private ZonedDateTime updatedAt;
}
