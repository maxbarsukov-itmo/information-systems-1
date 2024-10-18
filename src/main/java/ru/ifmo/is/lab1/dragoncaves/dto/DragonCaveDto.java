package ru.ifmo.is.lab1.dragoncaves.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class DragonCaveDto extends AuditableDto {
  private int id;
  private Float depth;
}
