package ru.ifmo.is.lab1.locations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface LocationRepository
  extends JpaRepository<Location, Integer>,
          JpaSpecificationExecutor<Location> {
}
