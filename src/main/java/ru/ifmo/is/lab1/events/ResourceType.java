package ru.ifmo.is.lab1.events;

import java.util.HashMap;
import java.util.Map;

public enum ResourceType {
  ADMIN_REQUESTS("admin-requests"),
  COORDINATES("coordinates"),
  DRAGON_CAVES("dragon-caves"),
  DRAGON_HEADS("dragon-heads"),
  DRAGONS("dragons"),
  LOCATIONS("locations"),
  PEOPLE("people");

  private static final Map<String, ResourceType> resources = new HashMap<>();

  static {
    for (ResourceType e: values()) {
      resources.put(e.resource, e);
    }
  }

  public final String resource;

  ResourceType(String resource) {
    this.resource = resource;
  }

  public static ResourceType valueOfResource(String label) {
    return resources.get(label);
  }
}
