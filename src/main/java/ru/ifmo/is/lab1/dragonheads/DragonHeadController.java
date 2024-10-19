package ru.ifmo.is.lab1.dragonheads;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.framework.CrudController;
import ru.ifmo.is.lab1.dragonheads.dto.*;

@RestController
@RequestMapping(value = "/api/dragon-heads", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Dragon Head")
public class DragonHeadController
  extends CrudController<
    DragonHead,
    DragonHeadDto,
    DragonHeadCreateDto,
    DragonHeadUpdateDto,
    DragonHeadService
  > {

  public DragonHeadController(
    DragonHeadService service
  ) {
    super(service);
  }
}
