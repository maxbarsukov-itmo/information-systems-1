package ru.ifmo.is.lab1.people;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PersonRepository
  extends JpaRepository<Person, Integer>,
          JpaSpecificationExecutor<Person> {
}
