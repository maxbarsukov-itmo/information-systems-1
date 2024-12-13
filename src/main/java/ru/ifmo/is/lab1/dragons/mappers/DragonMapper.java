package ru.ifmo.is.lab1.dragons.mappers;

import org.mapstruct.*;
import ru.ifmo.is.lab1.common.framework.CrudMapper;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.dragons.Dragon;
import ru.ifmo.is.lab1.dragons.dto.*;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonMapper implements CrudMapper<Dragon, DragonDto, DragonCreateDto, DragonUpdateDto> {
  @Mapping(source = "coordinatesId", target = "coordinates")
  @Mapping(source = "caveId", target = "cave")
  @Mapping(source = "killerId", target = "killer")
  @Mapping(source = "headId", target = "head")
  public abstract Dragon map(DragonCreateDto dto);

  public abstract DragonDto map(Dragon model);

  public abstract Dragon map(DragonDto model);

  public abstract void update(DragonUpdateDto dto, @MappingTarget Dragon model);
}
