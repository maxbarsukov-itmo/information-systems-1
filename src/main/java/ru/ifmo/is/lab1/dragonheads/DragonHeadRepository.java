package ru.ifmo.is.lab1.dragonheads;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DragonHeadRepository
  extends JpaRepository<DragonHead, Integer>,
          JpaSpecificationExecutor<DragonHead> {
}
