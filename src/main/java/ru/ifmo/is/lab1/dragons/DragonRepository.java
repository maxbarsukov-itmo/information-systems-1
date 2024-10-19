package ru.ifmo.is.lab1.dragons;

import org.springframework.data.jpa.repository.Query;
import ru.ifmo.is.lab1.common.framework.CrudRepository;

import java.util.Optional;

public interface DragonRepository extends CrudRepository<Dragon> {
  @Query("SELECT AVG(d.age) FROM Dragon d")
  Optional<Double> getAverageAge();

  Optional<Dragon> findTopAgeByAgeIsNotNullOrderByAgeDesc();

  @Query("SELECT d FROM Dragon d JOIN d.cave dc WHERE dc.depth = (SELECT MAX(c.depth) FROM DragonCave c)")
  Optional<Dragon> findDragonInDeepestCave();
}
