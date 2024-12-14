package ru.ifmo.is.lab1.dragons.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ru.ifmo.is.lab1.batchoperations.contract.BatchMapper;
import ru.ifmo.is.lab1.dragons.dto.DragonBatchDto;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.dragons.dto.DragonCreateDto;
import ru.ifmo.is.lab1.dragons.dto.DragonUpdateDto;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonBatchMapper implements BatchMapper<DragonBatchDto, DragonCreateDto, DragonUpdateDto> {
  public abstract DragonCreateDto toCreate(DragonBatchDto dto);
  public abstract DragonUpdateDto toUpdate(DragonBatchDto model);
}
