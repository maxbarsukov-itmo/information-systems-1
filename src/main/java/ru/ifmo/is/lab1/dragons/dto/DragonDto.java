package ru.ifmo.is.lab1.dragons.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;
import ru.ifmo.is.lab1.coordinates.Coordinate;
import ru.ifmo.is.lab1.dragoncaves.DragonCave;
import ru.ifmo.is.lab1.dragonheads.DragonHead;
import ru.ifmo.is.lab1.dragons.DragonType;
import ru.ifmo.is.lab1.people.Person;

@Data
@EqualsAndHashCode(callSuper = true)
public class DragonDto extends AuditableDto {
  private int id;
  private String name;
  private Coordinate coordinates;
  private DragonCave cave;
  private Person killer;
  private DragonHead head;
  private DragonType type;
  private Integer age;
  private Integer wingspan;
  private Boolean speaking;
}
