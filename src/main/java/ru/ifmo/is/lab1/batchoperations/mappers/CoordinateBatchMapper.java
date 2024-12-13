package ru.ifmo.is.lab1.batchoperations.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ru.ifmo.is.lab1.batchoperations.dto.models.CoordinateBatchDto;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.coordinates.dto.CoordinateCreateDto;
import ru.ifmo.is.lab1.coordinates.dto.CoordinateUpdateDto;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class CoordinateBatchMapper {
  public abstract CoordinateCreateDto toCreate(CoordinateBatchDto dto);
  public abstract CoordinateUpdateDto toUpdate(CoordinateBatchDto model);
}
