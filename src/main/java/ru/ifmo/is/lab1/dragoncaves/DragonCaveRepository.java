package ru.ifmo.is.lab1.dragoncaves;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DragonCaveRepository
  extends JpaRepository<DragonCave, Integer>,
          JpaSpecificationExecutor<DragonCave> {
}
