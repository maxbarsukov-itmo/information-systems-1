package ru.ifmo.is.lab1.dragoncaves;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.batchoperations.BatchOperation;
import ru.ifmo.is.lab1.batchoperations.contract.ImportService;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationUnitDto;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveBatchDto;
import ru.ifmo.is.lab1.dragoncaves.mappers.DragonCaveBatchMapper;
import ru.ifmo.is.lab1.dragoncaves.mappers.DragonCaveMapper;

@Service
@RequiredArgsConstructor
public class DragonCaveImportService implements ImportService<DragonCave> {

  private final DragonCaveBatchMapper batchMapper;
  private final DragonCaveMapper mapper;
  private final DragonCaveService service;

  public Pair<BatchOperation, DragonCave> handle(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (DragonCaveBatchDto) dto.getBody();
        var createDto = batchMapper.toCreate(body);
        var objDto = service.create(createDto);
        return new ImmutablePair<>(batchOperation, mapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (DragonCaveBatchDto) dto.getBody();
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
