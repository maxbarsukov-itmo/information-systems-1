package ru.ifmo.is.lab1.dragons;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.framework.CrudController;
import ru.ifmo.is.lab1.dragons.dto.*;

@RestController
@RequestMapping(value = "/api/dragons", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Dragon")
public class DragonController
  extends CrudController<
    Dragon,
    DragonDto,
    DragonCreateDto,
    DragonUpdateDto,
    DragonService
  > {

  public DragonController(
    DragonService service
  ) {
    super(service);
  }
}
