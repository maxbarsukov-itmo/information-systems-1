package ru.ifmo.is.lab1.specialoperations.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.ifmo.is.lab1.dragons.dto.DragonDto;

@Data
@AllArgsConstructor
public class DragonResultDto {
  private String errorMessage;
  private DragonDto dragon;
}
