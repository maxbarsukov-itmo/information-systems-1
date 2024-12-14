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
      .object(id + ".json")
      .bucket(provider.bucket())
      .build());
    return obj.readAllBytes();
  }

  public void begin(int id, InputStream stream, Long size) throws Exception {
    MinioClient client = provider.getClient();
    client.putObject(
      PutObjectArgs.builder()
        .bucket(provider.bucket())
        .object(id + "-draft.json")
        .contentType("application/json")
        .stream(stream, size, -1)
        .build()
    );
  }

  public void commit(int id) throws Exception {
    MinioClient client = provider.getClient();
    client.copyObject(
      CopyObjectArgs.builder()
        .source(CopySource.builder()
          .bucket(provider.bucket())
          .object(id + "-draft.json")
          .build())
        .bucket(provider.bucket())
        .object(id + ".json")
        .build()
    );
    client.removeObject(
      RemoveObjectArgs.builder()
        .bucket(provider.bucket())
        .object(id + "-draft.json")
        .build()
    );
  }

  public void rollback(int id) throws Exception {
    MinioClient client = provider.getClient();
    client.removeObject(
      RemoveObjectArgs.builder()
        .bucket(provider.bucket())
        .object(id + "-draft.json")
        .build()
    );
  }

  @PostConstruct
  public void initialize() {
    minioInitializer.createBucket();
  }
}
