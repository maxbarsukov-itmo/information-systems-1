package ru.ifmo.is.lab1.locations;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.locations.dto.LocationCreateDto;
import ru.ifmo.is.lab1.locations.dto.LocationUpdateDto;
import ru.ifmo.is.lab1.locations.dto.LocationDto;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/locations", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class LocationController {

  private final LocationService service;

  @GetMapping
  @Operation(summary = "Получить все локации")
  public ResponseEntity<Page<LocationDto>> index(@PageableDefault(size = 20) Pageable pageable) {
    var locations = service.getAll(pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(locations.getTotalElements()))
      .body(locations);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Получить локацию по ID")
  public ResponseEntity<LocationDto> show(@PathVariable int id) {
    var location = service.getById(id);
    return ResponseEntity.ok(location);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @Operation(summary = "Создать локацию")
  public ResponseEntity<LocationDto> create(@Valid @RequestBody LocationCreateDto request) {
    var location = service.create(request);
    return ResponseEntity.ok(location);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Обновить локацию по ID")
  public ResponseEntity<LocationDto> update(@PathVariable int id, @Valid @RequestBody LocationUpdateDto request) {
    var location = service.update(request, id);
    return ResponseEntity.ok(location);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Удалить локацию по ID")
  public ResponseEntity<Void> delete(@PathVariable int id) {
    if (service.delete(id)) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}
