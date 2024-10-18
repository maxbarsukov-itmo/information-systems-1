package ru.ifmo.is.lab1.dragoncaves;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.framework.CrudPolicy;

@Component
public class DragonCavePolicy extends CrudPolicy<DragonCave> {

  @Override
  public String getPolicySubject() {
    return "dragon caves";
  }
}
