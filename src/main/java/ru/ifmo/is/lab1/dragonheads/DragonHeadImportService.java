package ru.ifmo.is.lab1.dragonheads;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.batchoperations.BatchOperation;
import ru.ifmo.is.lab1.batchoperations.contract.ImportService;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationUnitDto;
import ru.ifmo.is.lab1.dragonheads.dto.DragonHeadBatchDto;
import ru.ifmo.is.lab1.dragonheads.mappers.DragonHeadBatchMapper;
import ru.ifmo.is.lab1.dragonheads.mappers.DragonHeadMapper;

@Service
@RequiredArgsConstructor
public class DragonHeadImportService implements ImportService<DragonHead> {

  private final DragonHeadBatchMapper batchMapper;
  private final DragonHeadMapper mapper;
  private final DragonHeadService service;

  public Pair<BatchOperation, DragonHead> handle(BatchOperation batchOperation, BatchOperationUnitDto dto) {
    switch (dto.getType()) {
      case CREATE -> {
        batchOperation.incAddedCount();
        var body = (DragonHeadBatchDto) dto.getBody();
        var createDto = batchMapper.toCreate(body);
        var objDto = service.create(createDto);
        return new ImmutablePair<>(batchOperation, mapper.map(objDto));
      }
      case UPDATE -> {
        batchOperation.incUpdatedCount();
        var body = (DragonHeadBatchDto) dto.getBody();
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
