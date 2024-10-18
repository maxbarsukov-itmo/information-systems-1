package ru.ifmo.is.lab1.locations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LocationRepository
  extends JpaRepository<Location, Integer>,
          JpaSpecificationExecutor<Location> {
}
