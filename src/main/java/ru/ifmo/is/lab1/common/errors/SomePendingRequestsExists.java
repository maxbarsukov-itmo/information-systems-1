package ru.ifmo.is.lab1.common.errors;

public class SomePendingRequestsExists extends RuntimeException {
  public SomePendingRequestsExists() {
    super();
  }

  public SomePendingRequestsExists(String message) {
    super(message);
  }
}
