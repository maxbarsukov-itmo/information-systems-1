package ru.ifmo.is.lab1.dragonheads.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadBatchDto;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadCreateDto;
import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadUpdateDto;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonHeadBatchMapper {
  public abstract DragonHeadCreateDto toCreate(DragonHeadBatchDto dto);
  public abstract DragonHeadUpdateDto toUpdate(DragonHeadBatchDto model);
}
