package ru.ifmo.is.lab1.people;

import org.mapstruct.*;

import ru.ifmo.is.lab1.common.framework.CrudMapper;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.people.dto.*;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class PersonMapper implements CrudMapper<Person, PersonDto, PersonCreateDto, PersonUpdateDto> {
  @Mapping(source = "locationId", target = "location")
  public abstract Person map(PersonCreateDto dto);

  public abstract PersonDto map(Person model);

  public abstract Person map(PersonDto model);

  public abstract void update(PersonUpdateDto dto, @MappingTarget Person model);
}
