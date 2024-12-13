package ru.ifmo.is.lab1.batchoperations.mappers;

import org.mapstruct.*;
import ru.ifmo.is.lab1.batchoperations.dto.models.DragonCaveBatchDto;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveCreateDto;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveUpdateDto;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonCaveBatchMapper {
  public abstract DragonCaveCreateDto toCreate(DragonCaveBatchDto dto);
  public abstract DragonCaveUpdateDto toUpdate(DragonCaveBatchDto model);
}
