package ru.ifmo.is.lab1.dragoncaves.mappers;

import org.mapstruct.*;
import ru.ifmo.is.lab1.common.framework.CrudMapper;
import ru.ifmo.is.lab1.common.mapper.*;
import ru.ifmo.is.lab1.dragoncaves.DragonCave;
import ru.ifmo.is.lab1.dragoncaves.dto.*;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonCaveMapper implements CrudMapper<DragonCave, DragonCaveDto, DragonCaveCreateDto, DragonCaveUpdateDto> {
  public abstract DragonCave map(DragonCaveUpdateDto dto);

  public abstract DragonCaveDto map(DragonCave model);

  public abstract DragonCave map(DragonCaveDto model);

  public abstract void update(DragonCaveUpdateDto dto, @MappingTarget DragonCave model);
}
