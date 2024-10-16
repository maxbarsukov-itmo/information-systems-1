package ru.ifmo.is.lab1.common.framework;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.ifmo.is.lab1.common.errors.ResourceNotFoundException;
import ru.ifmo.is.lab1.common.framework.dto.AuditableDto;
import ru.ifmo.is.lab1.common.search.SearchDto;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.users.User;
import ru.ifmo.is.lab1.users.UserService;

import java.time.ZonedDateTime;

@AllArgsConstructor
public abstract class CrudService<
  T extends Auditable,
  TRepository extends JpaRepository<T, Integer> & JpaSpecificationExecutor<T>,
  TMapper extends CrudMapper<T, TDto, TCreateDto, TUpdateDto>,
  TPolicy extends CrudPolicy<T>,
  TDto extends AuditableDto,
  TCreateDto,
  TUpdateDto
  > {

  private TRepository repository;
  private TMapper mapper;
  private TPolicy policy;
  private SearchMapper<T> searchMapper;
  private UserService userService;

  public Page<TDto> getAll(Pageable pageable) {
    policy.showAll(currentUser());

    var objs = repository.findAll(pageable);
    return objs.map(mapper::map);
  }

  public Page<TDto> findBySearchCriteria(SearchDto searchData, Pageable pageable) {
    policy.search(currentUser());

    var objs = repository.findAll(searchMapper.map(searchData), pageable);
    return objs.map(mapper::map);
  }

  public TDto create(TCreateDto objData) {
    policy.create(currentUser());

    var obj = mapper.map(objData);
    obj.setCreatedBy(currentUser());
    obj.setCreatedAt(ZonedDateTime.now());
    repository.save(obj);
    return mapper.map(obj);
  }

  public TDto getById(int id) {
    var obj = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.show(currentUser(), obj);

    return mapper.map(obj);
  }

  public TDto update(TUpdateDto objData, int id) {
    var obj = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found: " + id));
    policy.update(currentUser(), obj);

    mapper.update(objData, obj);
    obj.setUpdatedBy(currentUser());
    obj.setUpdatedAt(ZonedDateTime.now());
    repository.save(obj);
    return mapper.map(obj);
  }

  public boolean delete(int id) {
    return repository.findById(id)
      .map(obj -> {
        policy.delete(currentUser(), obj);
        repository.delete(obj);
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
