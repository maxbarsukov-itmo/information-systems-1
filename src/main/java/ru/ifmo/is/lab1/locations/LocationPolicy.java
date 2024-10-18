package ru.ifmo.is.lab1.locations;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.framework.CrudPolicy;

@Component
public class LocationPolicy extends CrudPolicy<Location> {

  @Override
  public String getPolicySubject() {
    return "locations";
  }
}
