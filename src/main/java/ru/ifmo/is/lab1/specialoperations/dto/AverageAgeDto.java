package ru.ifmo.is.lab1.specialoperations.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AverageAgeDto {
  private String errorMessage;
  private Double averageAge;
}
