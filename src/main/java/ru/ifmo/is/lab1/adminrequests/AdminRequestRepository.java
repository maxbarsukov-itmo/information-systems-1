package ru.ifmo.is.lab1.adminrequests;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.ifmo.is.lab1.users.User;

import java.util.Optional;

public interface AdminRequestRepository
  extends JpaRepository<AdminRequest, Integer>,
          JpaSpecificationExecutor<AdminRequest> {

  Page<AdminRequest> findAllByOrderByCreatedAtAsc(Pageable pageable);
  Page<AdminRequest> findAllByUserOrderByCreatedAtAsc(User user, Pageable pageable);
  Page<AdminRequest> findAllByStatusOrderByCreatedAtAsc(Status status, Pageable pageable);
  Optional<AdminRequest> findByStatusAndUserOrderByCreatedAtAsc(Status status, User user);
}
