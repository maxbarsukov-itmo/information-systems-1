package ru.ifmo.is.lab1.locations;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.policies.DefaultPolicy;

@Component
public class LocationPolicy extends DefaultPolicy<Location> {

  @Override
  public String getPolicySubject() {
    return "locations";
  }
}
