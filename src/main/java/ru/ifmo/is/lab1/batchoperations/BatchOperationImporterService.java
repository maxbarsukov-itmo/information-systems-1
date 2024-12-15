package ru.ifmo.is.lab1.batchoperations;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationUnitDto;
import ru.ifmo.is.lab1.common.errors.ImportError;
import ru.ifmo.is.lab1.common.errors.PolicyViolationError;
import ru.ifmo.is.lab1.common.errors.ResourceAlreadyExists;

import ru.ifmo.is.lab1.coordinates.CoordinateImportService;
import ru.ifmo.is.lab1.dragoncaves.DragonCaveImportService;
import ru.ifmo.is.lab1.dragonheads.DragonHeadImportService;
import ru.ifmo.is.lab1.dragons.DragonImportService;
import ru.ifmo.is.lab1.locations.LocationImportService;
import ru.ifmo.is.lab1.people.PersonImportService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchOperationImporterService {

  private final BatchOperationRepository repository;

  private final CoordinateImportService coordinateImportService;
  private final DragonCaveImportService dragonCaveImportService;
  private final DragonHeadImportService dragonHeadImportService;
  private final DragonImportService dragonImportService;
  private final LocationImportService locationImportService;
  private final PersonImportService personImportService;

  @Transactional(isolation = Isolation.REPEATABLE_READ)
  public BatchOperation doImport(BatchOperation batchOperation, List<BatchOperationUnitDto> operations)
    throws ImportError, PolicyViolationError, ResourceAlreadyExists {

    for (var operation : operations) {
      switch (operation.getResourceType()) {
        case COORDINATES  -> coordinateImportService.handle(batchOperation, operation);
        case DRAGON_CAVES -> dragonCaveImportService.handle(batchOperation, operation);
        case DRAGON_HEADS -> dragonHeadImportService.handle(batchOperation, operation);
        case DRAGONS      -> dragonImportService.handle(batchOperation, operation);
        case LOCATIONS    -> locationImportService.handle(batchOperation, operation);
        case PEOPLE       -> personImportService.handle(batchOperation, operation);
        default -> throw new ImportError("Unhandled resource type: " + operation.getResourceType());
      }
    }

    batchOperation.setStatus(Status.SUCCESS);
    return repository.save(batchOperation);
  }
}
