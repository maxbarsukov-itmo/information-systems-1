package ru.ifmo.is.lab1.people;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.batchoperations.BatchOperation;
import ru.ifmo.is.lab1.batchoperations.contract.ImportService;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationUnitDto;
import ru.ifmo.is.lab1.batchoperations.dto.OperationType;
import ru.ifmo.is.lab1.events.ResourceType;
import ru.ifmo.is.lab1.locations.LocationImportService;
import ru.ifmo.is.lab1.people.dto.PersonBatchDto;
import ru.ifmo.is.lab1.people.mappers.PersonBatchMapper;
import ru.ifmo.is.lab1.people.mappers.PersonMapper;

@Service
@RequiredArgsConstructor
public class PersonImportService implements ImportService<Person> {

  private final LocationImportService locationImportService;

  private final PersonBatchMapper batchMapper;
  private final PersonMapper mapper;
  private final PersonService service;

  public Pair<BatchOperation, Person> handle(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (PersonBatchDto) dto.getBody();

        if (body.getLocation() != null) {
          var locationId = locationImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.LOCATIONS, null, body.getLocation()
          )).getRight().getId();
          body.setLocationId(locationId);
        }

        var createDto = batchMapper.toCreate(body);
        var objDto = service.create(createDto);
        return new ImmutablePair<>(batchOperation, mapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (PersonBatchDto) dto.getBody();

        if (body.getLocation() != null) {
          var locationId = locationImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.LOCATIONS, null, body.getLocation()
          )).getRight().getId();
          body.setLocationId(locationId);
        }

        var updateDto = batchMapper.toUpdate(body);
        var objDto = service.update(updateDto, dto.getResourceId());
        return new ImmutablePair<>(batchOperation, mapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        service.delete(dto.getResourceId());
        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }
}
