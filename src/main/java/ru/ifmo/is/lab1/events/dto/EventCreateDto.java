package ru.ifmo.is.lab1.events.dto;

import lombok.Data;
import ru.ifmo.is.lab1.events.EventType;
import ru.ifmo.is.lab1.events.ResourceType;

@Data
public class EventCreateDto {
  private int resourceId;
  private ResourceType resourceType;
  private EventType type;
}
