package ru.ifmo.is.lab1.common.search;

import lombok.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Data
public class SearchDto {
  @NotNull
  private List<SearchCriteria> searchCriteriaList;

  @NotNull
  private String dataOption;
}
