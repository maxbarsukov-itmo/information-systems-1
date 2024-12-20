package ru.ifmo.is.lab1.locations.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ru.ifmo.is.lab1.batchoperations.contract.BatchMapper;
import ru.ifmo.is.lab1.locations.dto.LocationBatchDto;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.locations.dto.LocationCreateDto;
import ru.ifmo.is.lab1.locations.dto.LocationUpdateDto;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class LocationBatchMapper implements BatchMapper<LocationBatchDto, LocationCreateDto, LocationUpdateDto> {
  public abstract LocationCreateDto toCreate(LocationBatchDto dto);
  public abstract LocationUpdateDto toUpdate(LocationBatchDto model);
}
