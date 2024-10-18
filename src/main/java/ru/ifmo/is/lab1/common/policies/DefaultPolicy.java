package ru.ifmo.is.lab1.common.policies;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.entity.Auditable;
import ru.ifmo.is.lab1.users.User;

@Component
public abstract class DefaultPolicy<T extends Auditable> extends Policy<T> {

  @Override
  public boolean canShowAll(User user) {
    return true;
  }

  @Override
  public boolean canSearch(User user) {
    return true;
  }

  @Override
  public boolean canShow(User user, T object) {
    return true;
  }

  @Override
  public boolean canCreate(User user) {
    return true;
  }

  @Override
  public boolean canDelete(User user, T object) {
    return canManage(user, object);
  }

  @Override
  public boolean canUpdate(User user, T object) {
    return canManage(user, object);
  }

  private boolean canManage(User user, T object) {
    return user.isAdmin() || user.equals(object.getCreatedBy());
  }
}
