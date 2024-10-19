package ru.ifmo.is.lab1.common.framework;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;
import ru.ifmo.is.lab1.common.search.SearchDto;

@AllArgsConstructor
public abstract class CrudController<
  T extends CrudEntity,
  TDto extends AuditableDto,
  TCreateDto,
  TUpdateDto,
  TService extends CrudService<T, ?, ?, ?, TDto, TCreateDto, TUpdateDto>
  > {

  private TService service;

  @GetMapping
  @Operation(summary = "Получить все объекты")
  public ResponseEntity<Page<TDto>> index(@PageableDefault(size = 20) Pageable pageable) {
    var objs = service.getAll(pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(objs.getTotalElements()))
      .body(objs);
  }

  @PostMapping("/search")
  @Operation(summary = "Поиск и фильтрация объектов")
  public ResponseEntity<Page<TDto>> search(
    @PageableDefault(size = 20) Pageable pageable,
    @RequestBody(required = false) SearchDto request
  ) {
    var objs = service.findBySearchCriteria(request, pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(objs.getTotalElements()))
      .body(objs);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Получить объект по ID")
  public ResponseEntity<TDto> show(@PathVariable int id) {
    var obj = service.getById(id);
    return ResponseEntity.ok(obj);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  @Operation(summary = "Создать объект")
  public ResponseEntity<TDto> create(@Valid @RequestBody TCreateDto request) {
    var obj = service.create(request);
    return ResponseEntity.ok(obj);
  }

  @PatchMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  @Operation(summary = "Обновить объект по ID")
  public ResponseEntity<TDto> update(@PathVariable int id, @Valid @RequestBody TUpdateDto request) {
    var obj = service.update(request, id);
    return ResponseEntity.ok(obj);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  @Operation(summary = "Удалить объект по ID")
  public ResponseEntity<Void> delete(@PathVariable int id) {
    if (service.delete(id)) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}
