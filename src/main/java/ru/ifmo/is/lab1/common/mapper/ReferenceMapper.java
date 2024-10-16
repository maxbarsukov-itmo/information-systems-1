package ru.ifmo.is.lab1.common.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.TargetType;

import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.entity.BaseEntity;

@Component
@Mapper(
  componentModel = MappingConstants.ComponentModel.SPRING
)
public abstract class ReferenceMapper {
  private final EntityManager entityManager;

  public ReferenceMapper(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  public <T extends BaseEntity> T toEntity(Long id, @TargetType Class<T> entityClass) {
    return id != null ? entityManager.find(entityClass, id) : null;
  }
}
