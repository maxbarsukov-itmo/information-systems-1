package ru.ifmo.is.lab1.locations.mappers;

import org.mapstruct.*;
import ru.ifmo.is.lab1.common.framework.CrudMapper;
import ru.ifmo.is.lab1.common.mapper.*;
import ru.ifmo.is.lab1.locations.Location;
import ru.ifmo.is.lab1.locations.dto.*;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class LocationMapper implements CrudMapper<Location, LocationDto, LocationCreateDto, LocationUpdateDto> {
  public abstract Location map(LocationCreateDto dto);

  public abstract LocationDto map(Location model);

  public abstract Location map(LocationDto model);

  public abstract void update(LocationUpdateDto dto, @MappingTarget Location model);
}
