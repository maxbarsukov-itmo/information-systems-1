package ru.ifmo.is.lab1.locations.dto;

import lombok.Data;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;
import ru.ifmo.is.lab1.users.User;
import java.time.ZonedDateTime;

@Data
public class LocationDto implements AuditableDto {
  private int id;
  private double x;
  private long y;
  private long z;
  private User createdBy;
  private ZonedDateTime createdAt;
  private User updatedBy;
  private ZonedDateTime updatedAt;
}
