package ru.ifmo.is.lab1.storage;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import io.minio.*;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.config.MinioClientProvider;
import ru.ifmo.is.lab1.common.config.MinioInitializer;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class StorageService {

  private final MinioClientProvider provider;
  private final MinioInitializer minioInitializer;

  public byte[] getFile(int id) throws Exception {
    MinioClient client = provider.getClient();
    InputStream obj = client.getObject(GetObjectArgs.builder()
      .object(getFileName(id))
      .bucket(provider.bucket())
      .build());
    return obj.readAllBytes();
  }

  public void create(int id, InputStream stream, Long size) throws Exception {
    MinioClient client = provider.getClient();
    client.putObject(
      PutObjectArgs.builder()
        .bucket(provider.bucket())
        .object(getFileName(id))
        .contentType("application/json")
        .stream(stream, size, -1)
        .build()
    );
  }

  public void delete(int id) throws Exception {
    MinioClient client = provider.getClient();
    client.removeObject(
      RemoveObjectArgs.builder()
        .bucket(provider.bucket())
        .object(getFileName(id))
        .build()
    );
  }

  private String getFileName(int id) {
    return id + ".json";
  }

  @PostConstruct
  public void initialize() {
    minioInitializer.createBucket();
  }
}
