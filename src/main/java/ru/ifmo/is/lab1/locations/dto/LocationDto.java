package ru.ifmo.is.lab1.locations.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class LocationDto extends AuditableDto {
  private int id;
  private double x;
  private long y;
  private long z;
}
