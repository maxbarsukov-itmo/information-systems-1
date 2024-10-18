package ru.ifmo.is.lab1.common.entity;

import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class EntityTypeExtractor {
  public Pair<String, Integer> getEntityIdentification(BaseEntity entity) {
    return new ImmutablePair<>(
      entity.getClass().getAnnotation(Table.class).name(),
      entity.getId()
    );
  }
}
