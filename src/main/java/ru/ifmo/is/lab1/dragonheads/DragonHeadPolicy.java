package ru.ifmo.is.lab1.dragonheads;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.framework.CrudPolicy;

@Component
public class DragonHeadPolicy extends CrudPolicy<DragonHead> {

  @Override
  public String getPolicySubject() {
    return "dragon heads";
  }
}
