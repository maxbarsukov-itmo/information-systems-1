package ru.ifmo.is.lab1.people;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.search.SearchDto;
import ru.ifmo.is.lab1.people.dto.PersonCreateDto;
import ru.ifmo.is.lab1.people.dto.PersonUpdateDto;
import ru.ifmo.is.lab1.people.dto.PersonDto;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/people", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Person")
public class PersonController {

  private final PersonService service;

  @GetMapping
  @Operation(summary = "Получить всех персонажей")
  public ResponseEntity<Page<PersonDto>> index(@PageableDefault(size = 20) Pageable pageable) {
    var people = service.getAll(pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(people.getTotalElements()))
      .body(people);
  }

  @PostMapping("/search")
  @Operation(summary = "Поиск и фильтрация персонажей")
  public ResponseEntity<Page<PersonDto>> search(
    @PageableDefault(size = 20) Pageable pageable,
    @RequestBody(required = false) SearchDto request
  ) {
    var people = service.findBySearchCriteria(request, pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(people.getTotalElements()))
      .body(people);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Получить персонажа по ID")
  public ResponseEntity<PersonDto> show(@PathVariable int id) {
    var person = service.getById(id);
    return ResponseEntity.ok(person);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  @Operation(summary = "Создать персонажа")
  public ResponseEntity<PersonDto> create(@Valid @RequestBody PersonCreateDto request) {
    var person = service.create(request);
    return ResponseEntity.ok(person);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  @Operation(summary = "Обновить персонажа по ID")
  public ResponseEntity<PersonDto> update(@PathVariable int id, @Valid @RequestBody PersonUpdateDto request) {
    var person = service.update(request, id);
    return ResponseEntity.ok(person);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  @Operation(summary = "Удалить персонажа по ID")
  public ResponseEntity<Void> delete(@PathVariable int id) {
    if (service.delete(id)) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}
