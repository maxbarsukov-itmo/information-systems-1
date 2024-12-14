package ru.ifmo.is.lab1.dragons;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.batchoperations.BatchOperation;
import ru.ifmo.is.lab1.batchoperations.contract.ImportService;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationUnitDto;
import ru.ifmo.is.lab1.batchoperations.dto.OperationType;
import ru.ifmo.is.lab1.coordinates.CoordinateImportService;
import ru.ifmo.is.lab1.dragoncaves.DragonCaveImportService;
import ru.ifmo.is.lab1.dragonheads.DragonHeadImportService;
import ru.ifmo.is.lab1.dragons.dto.DragonBatchDto;
import ru.ifmo.is.lab1.dragons.mappers.DragonBatchMapper;
import ru.ifmo.is.lab1.dragons.mappers.DragonMapper;
import ru.ifmo.is.lab1.events.ResourceType;
import ru.ifmo.is.lab1.people.PersonImportService;

@Service
@RequiredArgsConstructor
public class DragonImportService implements ImportService<Dragon> {

  private final CoordinateImportService coordinateImportService;
  private final DragonCaveImportService dragonCaveImportService;
  private final DragonHeadImportService dragonHeadImportService;
  private final PersonImportService personImportService;

  private final DragonBatchMapper batchMapper;
  private final DragonMapper mapper;
  private final DragonService service;

  public Pair<BatchOperation, Dragon> handle(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (DragonBatchDto) dto.getBody();

        // Coordinates
        if (body.getCoordinates() != null) {
          var coordinatesId = coordinateImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.COORDINATES, null, body.getCoordinates()
          )).getRight().getId();
          body.setCoordinatesId(coordinatesId);
        }

        // Cave
        if (body.getCave() != null) {
          var caveId = dragonCaveImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_CAVES, null, body.getCave()
          )).getRight().getId();
          body.setCaveId(caveId);
        }

        // Killer
        if (body.getKiller() != null) {
          var killerId = personImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.PEOPLE, null, body.getKiller()
          )).getRight().getId();
          body.setKillerId(killerId);
        }

        // Head
        if (body.getHead() != null) {
          var headId = dragonHeadImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_HEADS, null, body.getHead()
          )).getRight().getId();
          body.setHeadId(headId);
        }

        var createDto = batchMapper.toCreate(body);
        var objDto = service.create(createDto);
        return new ImmutablePair<>(batchOperation, mapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (DragonBatchDto) dto.getBody();

        // Coordinates
        if (body.getCoordinates() != null) {
          var coordinatesId = coordinateImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.COORDINATES, null, body.getCoordinates()
          )).getRight().getId();
          body.setCoordinatesId(coordinatesId);
        }

        // Cave
        if (body.getCave() != null) {
          var caveId = dragonCaveImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_CAVES, null, body.getCave()
          )).getRight().getId();
          body.setCaveId(caveId);
        }

        // Killer
        if (body.getKiller() != null) {
          var killerId = personImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.PEOPLE, null, body.getKiller()
          )).getRight().getId();
          body.setKillerId(killerId);
        }

        // Head
        if (body.getHead() != null) {
          var headId = dragonHeadImportService.handle(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_HEADS, null, body.getHead()
          )).getRight().getId();
          body.setHeadId(headId);
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
