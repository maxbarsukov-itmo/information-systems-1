package ru.ifmo.is.lab1.batchoperations;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationUnitDto;
import ru.ifmo.is.lab1.batchoperations.dto.OperationType;
import ru.ifmo.is.lab1.batchoperations.dto.models.*;
import ru.ifmo.is.lab1.batchoperations.mappers.*;
import ru.ifmo.is.lab1.common.context.ApplicationLockBean;
import ru.ifmo.is.lab1.common.errors.ImportError;
import ru.ifmo.is.lab1.common.errors.PolicyViolationError;
import ru.ifmo.is.lab1.common.errors.ResourceAlreadyExists;
import ru.ifmo.is.lab1.coordinates.*;
import ru.ifmo.is.lab1.dragoncaves.*;
import ru.ifmo.is.lab1.dragonheads.*;
import ru.ifmo.is.lab1.dragons.*;
import ru.ifmo.is.lab1.events.ResourceType;
import ru.ifmo.is.lab1.locations.Location;
import ru.ifmo.is.lab1.locations.LocationMapper;
import ru.ifmo.is.lab1.locations.LocationService;
import ru.ifmo.is.lab1.people.Person;
import ru.ifmo.is.lab1.people.PersonMapper;
import ru.ifmo.is.lab1.people.PersonService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchOperationImporterService {

  private static final Logger logger = LoggerFactory.getLogger(BatchOperationService.class);

  private final BatchOperationRepository repository;

  private final CoordinateBatchMapper coordinateBatchMapper;
  private final CoordinateMapper coordinateMapper;
  private final CoordinateService coordinateService;

  private final DragonCaveBatchMapper dragonCaveBatchMapper;
  private final DragonCaveMapper dragonCaveMapper;
  private final DragonCaveService dragonCaveService;

  private final DragonHeadBatchMapper dragonHeadBatchMapper;
  private final DragonHeadMapper dragonHeadMapper;
  private final DragonHeadService dragonHeadService;

  private final DragonBatchMapper dragonBatchMapper;
  private final DragonMapper dragonMapper;
  private final DragonService dragonService;

  private final LocationBatchMapper locationBatchMapper;
  private final LocationMapper locationMapper;
  private final LocationService locationService;

  private final PersonBatchMapper personBatchMapper;
  private final PersonMapper personMapper;
  private final PersonService personService;

  @Transactional(isolation = Isolation.SERIALIZABLE)
  public BatchOperation doImport(BatchOperation batchOperation, List<BatchOperationUnitDto> operations)
    throws ImportError, PolicyViolationError, ResourceAlreadyExists {

    for (var operation : operations) {
      switch (operation.getResourceType()) {
        case COORDINATES  -> handleCoordinates(batchOperation, operation);
        case DRAGON_CAVES -> handleDragonCaves(batchOperation, operation);
        case DRAGON_HEADS -> handleDragonHeads(batchOperation, operation);
        case DRAGONS      -> handleDragons(batchOperation, operation);
        case LOCATIONS    -> handleLocations(batchOperation, operation);
        case PEOPLE       -> handlePeople(batchOperation, operation);
        default -> throw new ImportError("Unhandled resource type: " + operation.getResourceType());
      }
    }

    return repository.save(batchOperation);
  }


  private Pair<BatchOperation, Dragon> handleDragons(BatchOperation batchOperation, BatchOperationUnitDto dto) {

    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (DragonBatchDto) dto.getBody();

        // Coordinates
        if (body.getCoordinates() != null) {
          var coordinatesId = handleCoordinates(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.COORDINATES, null, body.getCoordinates()
          )).getRight().getId();
          body.setCoordinatesId(coordinatesId);
        }

        // Cave
        if (body.getCave() != null) {
          var caveId = handleDragonCaves(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_CAVES, null, body.getCave()
          )).getRight().getId();
          body.setCaveId(caveId);
        }

        // Killer
        if (body.getKiller() != null) {
          var killerId = handlePeople(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.PEOPLE, null, body.getKiller()
          )).getRight().getId();
          body.setKillerId(killerId);
        }

        // Head
        if (body.getHead() != null) {
          var headId = handleDragonHeads(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_HEADS, null, body.getHead()
          )).getRight().getId();
          body.setHeadId(headId);
        }

        var createDto = dragonBatchMapper.toCreate(body);
        var objDto = dragonService.create(createDto);

        return new ImmutablePair<>(batchOperation, dragonMapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (DragonBatchDto) dto.getBody();

        // Coordinates
        if (body.getCoordinates() != null) {
          var coordinatesId = handleCoordinates(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.COORDINATES, null, body.getCoordinates()
          )).getRight().getId();
          body.setCoordinatesId(coordinatesId);
        }

        // Cave
        if (body.getCave() != null) {
          var caveId = handleDragonCaves(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_CAVES, null, body.getCave()
          )).getRight().getId();
          body.setCaveId(caveId);
        }

        // Killer
        if (body.getKiller() != null) {
          var killerId = handlePeople(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.PEOPLE, null, body.getKiller()
          )).getRight().getId();
          body.setKillerId(killerId);
        }

        // Head
        if (body.getHead() != null) {
          var headId = handleDragonHeads(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.DRAGON_HEADS, null, body.getHead()
          )).getRight().getId();
          body.setHeadId(headId);
        }

        var updateDto = dragonBatchMapper.toUpdate(body);
        var objDto = dragonService.update(updateDto, dto.getResourceId());

        return new ImmutablePair<>(batchOperation, dragonMapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        dragonService.delete(dto.getResourceId());

        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }

  private Pair<BatchOperation, Person> handlePeople(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (PersonBatchDto) dto.getBody();

        if (body.getLocation() != null) {
          var locationId = handleLocations(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.LOCATIONS, null, body.getLocation()
          )).getRight().getId();
          body.setLocationId(locationId);
        }

        var createDto = personBatchMapper.toCreate(body);
        var objDto = personService.create(createDto);
        return new ImmutablePair<>(batchOperation, personMapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (PersonBatchDto) dto.getBody();

        if (body.getLocation() != null) {
          var locationId = handleLocations(batchOperation, new BatchOperationUnitDto(
            OperationType.CREATE, ResourceType.LOCATIONS, null, body.getLocation()
          )).getRight().getId();
          body.setLocationId(locationId);
        }

        var updateDto = personBatchMapper.toUpdate(body);
        var objDto = personService.update(updateDto, dto.getResourceId());
        return new ImmutablePair<>(batchOperation, personMapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        personService.delete(dto.getResourceId());
        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }

  private Pair<BatchOperation, DragonCave> handleDragonCaves(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (DragonCaveBatchDto) dto.getBody();
        var createDto = dragonCaveBatchMapper.toCreate(body);
        var objDto = dragonCaveService.create(createDto);
        return new ImmutablePair<>(batchOperation, dragonCaveMapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (DragonCaveBatchDto) dto.getBody();
        var updateDto = dragonCaveBatchMapper.toUpdate(body);
        var objDto = dragonCaveService.update(updateDto, dto.getResourceId());
        return new ImmutablePair<>(batchOperation, dragonCaveMapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        dragonCaveService.delete(dto.getResourceId());
        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }

  private Pair<BatchOperation, DragonHead> handleDragonHeads(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (DragonHeadBatchDto) dto.getBody();
        var createDto = dragonHeadBatchMapper.toCreate(body);
        var objDto = dragonHeadService.create(createDto);
        return new ImmutablePair<>(batchOperation, dragonHeadMapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (DragonHeadBatchDto) dto.getBody();
        var updateDto = dragonHeadBatchMapper.toUpdate(body);
        var objDto = dragonHeadService.update(updateDto, dto.getResourceId());
        return new ImmutablePair<>(batchOperation, dragonHeadMapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        dragonHeadService.delete(dto.getResourceId());
        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }

  private Pair<BatchOperation, Coordinate> handleCoordinates(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (CoordinateBatchDto) dto.getBody();
        var createDto = coordinateBatchMapper.toCreate(body);
        var objDto = coordinateService.create(createDto);
        return new ImmutablePair<>(batchOperation, coordinateMapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (CoordinateBatchDto) dto.getBody();
        var updateDto = coordinateBatchMapper.toUpdate(body);
        var objDto = coordinateService.update(updateDto, dto.getResourceId());
        return new ImmutablePair<>(batchOperation, coordinateMapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        coordinateService.delete(dto.getResourceId());
        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }

  private Pair<BatchOperation, Location> handleLocations(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (LocationBatchDto) dto.getBody();
        var createDto = locationBatchMapper.toCreate(body);
        var objDto = locationService.create(createDto);
        return new ImmutablePair<>(batchOperation, locationMapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (LocationBatchDto) dto.getBody();
        var updateDto = locationBatchMapper.toUpdate(body);
        var objDto = locationService.update(updateDto, dto.getResourceId());
        return new ImmutablePair<>(batchOperation, locationMapper.map(objDto));
      }
      case DELETE -> {
        batchOperation.incDeletedCount();
        locationService.delete(dto.getResourceId());
        return new ImmutablePair<>(batchOperation, null);
      }
    }
    return new ImmutablePair<>(batchOperation, null);
  }
}
