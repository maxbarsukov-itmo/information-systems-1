package ru.ifmo.is.lab1.common.errors;

public class UserWithThisUsernameAlreadyExists extends RuntimeException {
  public UserWithThisUsernameAlreadyExists() {
    super();
  }

  public UserWithThisUsernameAlreadyExists(String message) {
    super(message);
  }
}
