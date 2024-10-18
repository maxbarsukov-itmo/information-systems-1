package ru.ifmo.is.lab1.dragonheads.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class DragonHeadDto extends AuditableDto {
  private int id;
  private long size;
  private Float toothCount;
}
