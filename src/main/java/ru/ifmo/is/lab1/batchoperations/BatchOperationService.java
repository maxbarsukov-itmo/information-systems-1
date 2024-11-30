package ru.ifmo.is.lab1.batchoperations;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.batchoperations.dto.BatchOperationDto;
import ru.ifmo.is.lab1.common.caching.RequestCache;
import ru.ifmo.is.lab1.common.errors.ResourceNotFoundException;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.users.User;
import ru.ifmo.is.lab1.users.UserService;

@Service
@RequiredArgsConstructor
public class BatchOperationService {

  private final BatchOperationRepository repository;
  private final BatchOperationMapper mapper;
  private final BatchOperationPolicy policy;
  private final UserService userService;
  private final EventService<BatchOperation> eventService;

  public Page<BatchOperationDto> getAll(Pageable pageable) {
    var user = currentUser();
    policy.showAll(user);

    if (user.isAdmin()) {
      return repository.findAllByOrderByCreatedAtDesc(pageable).map(mapper::map);
    }

    return repository.findAllByCreatedByOrderByCreatedAtDesc(user, pageable).map(mapper::map);
  }

  public BatchOperationDto getById(int id) {
    var batchOperation = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.show(currentUser(), batchOperation);

    return mapper.map(batchOperation);
  }

  @RequestCache
  private User currentUser() {
    return userService.getCurrentUser();
  }
}
