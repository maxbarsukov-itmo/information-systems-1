package ru.ifmo.is.lab1.locations;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.policies.Policy;
import ru.ifmo.is.lab1.users.User;

@Component
public class LocationPolicy extends Policy<Location> {

  @Override
  public boolean canShowAll(User user) {
    return true;
  }

  @Override
  public boolean canSearch(User user) {
    return true;
  }

  @Override
  public boolean canShow(User user, Location object) {
    return true;
  }

  @Override
  public boolean canCreate(User user) {
    return true;
  }

  @Override
  public boolean canDelete(User currentUser, Location location) {
    return canManage(currentUser, location);
  }

  @Override
  public boolean canUpdate(User currentUser, Location location) {
    return canManage(currentUser, location);
  }

  private boolean canManage(User user, Location location) {
    return user.isAdmin() || user.equals(location.getCreatedBy());
  }

  @Override
  public String getPolicySubject() {
    return "locations";
  }
}
