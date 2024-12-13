package ru.ifmo.is.lab1.common.errors;

import lombok.Getter;

@Getter
public class DetailedApiError extends RuntimeException {
  private ApiError apiError;

  public DetailedApiError() {
    super();
  }

  public DetailedApiError(ApiError apiError) {
    super(apiError.getMessage());
    this.apiError = apiError;
  }
}