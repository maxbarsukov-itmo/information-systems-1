package ru.ifmo.is.lab1.common.framework;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CrudRepository<T>
  extends JpaRepository<T, Integer>,
          JpaSpecificationExecutor<T> {
}
