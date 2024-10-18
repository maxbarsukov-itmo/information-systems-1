package ru.ifmo.is.lab1.coordinates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CoordinateRepository
  extends JpaRepository<Coordinate, Integer>,
          JpaSpecificationExecutor<Coordinate> {
}
