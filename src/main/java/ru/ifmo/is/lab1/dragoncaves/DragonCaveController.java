package ru.ifmo.is.lab1.dragoncaves;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.framework.CrudController;
import ru.ifmo.is.lab1.dragoncaves.dto.*;

@RestController
@RequestMapping(value = "/api/dragon-caves", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Dragon Cave")
public class DragonCaveController
  extends CrudController<
    DragonCave,
    DragonCaveDto,
    DragonCaveCreateDto,
    DragonCaveUpdateDto,
    DragonCaveService
  > {

  public DragonCaveController(
    DragonCaveService service
  ) {
    super(service);
  }
}
