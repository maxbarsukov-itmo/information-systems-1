package ru.ifmo.is.lab1.locations;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.is.lab1.common.framework.CrudController;
import ru.ifmo.is.lab1.locations.dto.*;

@RestController
@RequestMapping(value = "/api/locations", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Location")
public class LocationController
  extends CrudController<
    Location,
    LocationDto,
    LocationCreateDto,
    LocationUpdateDto,
    LocationService
  > {

  public LocationController(
    LocationService service
  ) {
    super(service);
  }
}
