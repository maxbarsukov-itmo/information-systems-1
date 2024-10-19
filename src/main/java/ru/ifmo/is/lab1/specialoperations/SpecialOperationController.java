package ru.ifmo.is.lab1.specialoperations;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.search.SearchCriteria;
import ru.ifmo.is.lab1.common.search.SearchDto;
import ru.ifmo.is.lab1.dragons.DragonService;
import ru.ifmo.is.lab1.dragons.dto.DragonDto;
import ru.ifmo.is.lab1.specialoperations.dto.*;

import java.util.Collections;

@RestController
@RequestMapping(value = "/api/special-operations", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Special Operation")
public class SpecialOperationController {

  private final SpecialOperationService service;
  private final DragonService dragonService;

  @GetMapping("/average-age")
  @Operation(summary = "Рассчитать среднее значение поля `age` для всех объектов.")
  public ResponseEntity<AverageAgeDto> getAverageDragonAge() {
    var averageAge = service.getAverageDragonAge();
    return ResponseEntity.ok(averageAge);
  }

  @GetMapping("/oldest-dragon")
  @Operation(summary = "Вернуть один (любой) объект, значение поля `age` которого является максимальным.")
  public ResponseEntity<DragonResultDto> getOldestDragon() {
    var dragon = service.getOldestDragon();
    return ResponseEntity.ok(dragon);
  }

  @GetMapping("/filter-by-name")
  @Operation(summary = "Вернуть массив объектов, значение поля `name` которых начинается с заданной подстроки.")
  public ResponseEntity<Page<DragonDto>> filterDragonsByName(
    @RequestParam("name") String name,
    @PageableDefault(size = 20) Pageable pageable
  ) {
    var searchCriteria = SearchCriteria.builder().filterKey("name").operation("BW").value(name).build();
    var searchDto = SearchDto.builder()
      .dataOption("ALL")
      .searchCriteriaList(Collections.singletonList(searchCriteria))
      .build();

    var dragons = dragonService.findBySearchCriteria(searchDto, pageable);
    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(dragons.getTotalElements()))
      .body(dragons);
  }

  @GetMapping("/deepest-cave-dragon")
  @Operation(summary = "Найти дракона, живущего в самой глубокой пещере.")
  public ResponseEntity<DragonResultDto> getDragonInDeepestCave() {
    var dragon = service.getDragonInDeepestCave();
    return ResponseEntity.ok(dragon);
  }

  @PostMapping("/kill-dragon/{id}")
  @Operation(summary = "Убить указанного дракона")
  public ResponseEntity<DragonResultDto> killDragon(@PathVariable int id) {
    var dragon = service.killDragon(id);
    return ResponseEntity.ok(dragon);
  }
}
