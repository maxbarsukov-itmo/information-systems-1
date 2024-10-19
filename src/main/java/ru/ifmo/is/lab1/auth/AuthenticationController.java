package ru.ifmo.is.lab1.auth;

import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.ifmo.is.lab1.auth.dto.AuthenticationDto;
import ru.ifmo.is.lab1.auth.dto.SignInDto;
import ru.ifmo.is.lab1.auth.dto.SignUpDto;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {
  private final AuthenticationService authenticationService;

  @Operation(summary = "Регистрация пользователя")
  @PostMapping("/sign-up")
  public AuthenticationDto signUp(@RequestBody @Valid SignUpDto request) {
    return authenticationService.signUp(request);
  }

  @Operation(summary = "Авторизация пользователя")
  @PostMapping("/sign-in")
  public AuthenticationDto signIn(@RequestBody @Valid SignInDto request) {
    return authenticationService.signIn(request);
  }
}
