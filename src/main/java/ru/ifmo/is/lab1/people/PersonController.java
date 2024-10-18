package ru.ifmo.is.lab1.people;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.framework.CrudController;
import ru.ifmo.is.lab1.people.dto.*;

@RestController
@RequestMapping(value = "/api/people", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Person")
public class PersonController
  extends CrudController<
    Person,
    PersonDto,
    PersonCreateDto,
    PersonUpdateDto,
    PersonService
  > {

  public PersonController(
    PersonService service
  ) {
    super(service);
  }
}
