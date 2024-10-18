package ru.ifmo.is.lab1.people;

import org.springframework.stereotype.Component;
import ru.ifmo.is.lab1.common.policies.DefaultPolicy;

@Component
public class PersonPolicy extends DefaultPolicy<Person> {

  @Override
  public String getPolicySubject() {
    return "people";
  }
}
