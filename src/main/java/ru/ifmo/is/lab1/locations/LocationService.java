package ru.ifmo.is.lab1.locations;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.errors.ResourceNotFoundException;
import ru.ifmo.is.lab1.common.search.SearchDto;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.locations.dto.*;
import ru.ifmo.is.lab1.users.User;
import ru.ifmo.is.lab1.users.UserService;

import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final LocationRepository repository;
  private final LocationMapper mapper;
  private final SearchMapper<Location> searchMapper;
  private final LocationPolicy policy;
  private final UserService userService;

  public Page<LocationDto> getAll(Pageable pageable) {
    policy.showAll(currentUser());

    var locations = repository.findAll(pageable);
    return locations.map(mapper::map);
  }

  public Page<LocationDto> findBySearchCriteria(SearchDto searchData, Pageable pageable) {
    policy.search(currentUser());

    var locations = repository.findAll(searchMapper.map(searchData), pageable);
    return locations.map(mapper::map);
  }

  public LocationDto create(LocationCreateDto locationData) {
    policy.create(currentUser());

    var location = mapper.map(locationData);
    location.setCreatedBy(currentUser());
    location.setCreatedAt(ZonedDateTime.now());
    repository.save(location);
    return mapper.map(location);
  }

  public LocationDto getById(int id) {
    var location = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.show(currentUser(), location);

    return mapper.map(location);
  }

  public LocationDto update(LocationUpdateDto locationData, int id) {
    var location = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.update(currentUser(), location);

    mapper.update(locationData, location);
    repository.save(location);
    return mapper.map(location);
  }

  public boolean delete(int id) {
    return repository.findById(id)
      .map(location -> {
        policy.delete(currentUser(), location);
        repository.delete(location);
        return true;
      }).orElse(false);
  }

  private User currentUser() {
    try {
      return userService.getCurrentUser();
    } catch (UsernameNotFoundException _ex) {
      return null;
    }
  }
}
