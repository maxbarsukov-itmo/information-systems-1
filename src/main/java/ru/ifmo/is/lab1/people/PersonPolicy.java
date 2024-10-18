package ru.ifmo.is.lab1.people;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.framework.CrudPolicy;

@Component
public class PersonPolicy extends CrudPolicy<Person> {

  @Override
  public String getPolicySubject() {
    return "people";
  }
}
