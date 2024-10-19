package ru.ifmo.is.lab1.dragons;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.framework.CrudPolicy;

@Component
public class DragonPolicy extends CrudPolicy<Dragon> {

  @Override
  public String getPolicySubject() {
    return "dragons";
  }
}
