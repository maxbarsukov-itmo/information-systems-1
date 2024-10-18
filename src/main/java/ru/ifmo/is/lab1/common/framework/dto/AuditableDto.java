package ru.ifmo.is.lab1.common.framework.dto;

import ru.ifmo.is.lab1.users.User;

import java.time.ZonedDateTime;

public interface AuditableDto {
  User getCreatedBy();
  void setCreatedBy(User user);

  ZonedDateTime getCreatedAt();
  void setCreatedAt(ZonedDateTime timestamp);

  User getUpdatedBy();
  void setUpdatedBy(User user);

  ZonedDateTime getUpdatedAt();
  void setUpdatedAt(ZonedDateTime timestamp);
}
