package ru.ifmo.is.lab1.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import ru.ifmo.is.lab1.auth.JwtAuthenticationFilter;
import ru.ifmo.is.lab1.common.utils.crypto.Sha512PasswordEncoder;
import ru.ifmo.is.lab1.users.UserService;

import java.util.List;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final UserService userService;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
      // Отключаем CORS
      .cors(cors -> cors.configurationSource(request -> {
        var corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOriginPatterns(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);
        return corsConfiguration;
      }))

      .authorizeHttpRequests(request -> request
        // Доступ к методам /api/auth/** открыт для всех
        .requestMatchers("/api/auth/**").permitAll()

        // Доступ к администраторским действиям только для админов
        .requestMatchers("/api/admin/**").hasRole("ADMIN")

        // Доступ к Swagger UI (для документации)
        .requestMatchers("/swagger-ui/**", "/swagger-resources/*", "/v3/api-docs/**").permitAll()

        // Доступ к данным локаций
        .requestMatchers(HttpMethod.GET, "/api/locations/**").authenticated() // все авторизованные пользователи могут читать данные
        .requestMatchers(HttpMethod.POST, "/api/locations/**").authenticated() // только авторизованные могут создавать
        .requestMatchers(HttpMethod.PUT, "/api/locations/**").authenticated() // обновление доступно только авторам или администраторам (будет проверяться в контроллере)
        .requestMatchers(HttpMethod.PATCH, "/api/locations/**").authenticated() // обновление доступно только авторам или администраторам (будет проверяться в контроллере)
        .requestMatchers(HttpMethod.DELETE, "/api/locations/**").authenticated() // удаление доступно только авторам или администраторам

        // Доступ к данным персонажей
        .requestMatchers(HttpMethod.GET, "/api/people/**").authenticated() // все авторизованные пользователи могут читать данные
        .requestMatchers(HttpMethod.POST, "/api/people/**").authenticated() // только авторизованные могут создавать
        .requestMatchers(HttpMethod.PUT, "/api/people/**").authenticated() // обновление доступно только авторам или администраторам (будет проверяться в контроллере)
        .requestMatchers(HttpMethod.PATCH, "/api/people/**").authenticated() // обновление доступно только авторам или администраторам (будет проверяться в контроллере)
        .requestMatchers(HttpMethod.DELETE, "/api/people/**").authenticated() // удаление доступно только авторам или администраторам

        // Любой другой запрос должен быть аутентифицирован
        .anyRequest().authenticated())
      .sessionManagement(manager -> manager.sessionCreationPolicy(STATELESS))
      .authenticationProvider(authenticationProvider())
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new Sha512PasswordEncoder();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userService.userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}
