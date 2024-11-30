package ru.ifmo.is.lab1.batchoperations;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationDto;

@RestController
@RequestMapping(value = "/api/import", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Batch Operations")
public class BatchOperationController {

  private final BatchOperationService service;

  @GetMapping
  @Operation(summary = "Получить все операции импорта", security = @SecurityRequirement(name = "bearerAuth"))
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  public ResponseEntity<Page<BatchOperationDto>> index(@PageableDefault(size = 20) Pageable pageable) {
    var batchOperations = service.getAll(pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(batchOperations.getTotalElements()))
      .body(batchOperations);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  @Operation(summary = "Получить операцию импорта по ID", security = @SecurityRequirement(name = "bearerAuth"))
  public ResponseEntity<BatchOperationDto> show(@PathVariable int id) {
    var batchOperations = service.getById(id);
    return ResponseEntity.ok(batchOperations);
  }
}
