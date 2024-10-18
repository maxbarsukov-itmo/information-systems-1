package ru.ifmo.is.lab1.people;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PersonRepository
  extends JpaRepository<Person, Integer>,
          JpaSpecificationExecutor<Person> {
  Optional<Person> findByName(@Param("name") String name);
}
