package ru.ifmo.is.lab1.dragonheads;

import org.mapstruct.*;
import ru.ifmo.is.lab1.common.framework.CrudMapper;
import ru.ifmo.is.lab1.common.mapper.*;
import ru.ifmo.is.lab1.dragonheads.dto.*;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonHeadMapper implements CrudMapper<DragonHead, DragonHeadDto, DragonHeadCreateDto, DragonHeadUpdateDto> {
  public abstract DragonHead map(DragonHeadCreateDto dto);

  public abstract DragonHeadDto map(DragonHead model);

  public abstract DragonHead map(DragonHeadDto model);

  public abstract void update(DragonHeadUpdateDto dto, @MappingTarget DragonHead model);
}
