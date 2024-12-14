package ru.ifmo.is.lab1.common.config;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Data
@RequiredArgsConstructor
@Configuration
public class MinioConfig {
  private MinioProperties properties;

  @Bean
  public MinioClient client() {
    return MinioClient.builder()
      .endpoint(properties.getHost() + ":" + properties.getPortApi())
      .credentials(properties.getUsername(), properties.getPassword())
      .build();
  }
}
