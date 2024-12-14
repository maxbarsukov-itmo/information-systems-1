package ru.ifmo.is.lab1.storage;

import lombok.RequiredArgsConstructor;
import io.minio.*;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.config.MinioClientProvider;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class StorageService {

  private static final Logger logger = LoggerFactory.getLogger(StorageService.class);
  private final MinioClientProvider provider;

  public byte[] getFile(int id) throws Exception {
    MinioClient client = provider.getClient();
    InputStream obj = client.getObject(GetObjectArgs.builder()
      .object(id + ".json")
      .bucket(provider.bucket())
      .build());
    return obj.readAllBytes();
  }

  public void uploadUncommitedFile(int id, InputStream stream, Long size) throws Exception {
    MinioClient client = provider.getClient();
    client.putObject(
      PutObjectArgs.builder()
        .bucket(provider.bucket())
        .object(id + "_uncommited.json")
        .contentType("application/json")
        .stream(stream, size, -1)
        .build()
    );
  }

  public void commitFile(int id) throws Exception {
    provider.getClient().copyObject(
      CopyObjectArgs.builder()
        .source(CopySource.builder()
          .bucket(provider.bucket())
          .object(id + "_uncommited.json")
          .build())
        .bucket(provider.bucket())
        .object(id + ".json")
        .build()
    );
    provider.getClient().removeObject(
      RemoveObjectArgs.builder()
        .bucket(provider.bucket())
        .object(id + "_uncommited.json")
        .build()
    );
  }

  public void rollbackFile(int id) throws Exception {
    provider.getClient().removeObject(
      RemoveObjectArgs.builder()
        .bucket(provider.bucket())
        .object(id + "_uncommited.json")
        .build()
    );
  }

  @PostConstruct
  public void createBucket() {
    try {
      if (provider.getClient().bucketExists(BucketExistsArgs.builder().bucket(provider.bucket()).build())) {
        logger.info("Bucket {} already exists, skipping creation", provider.bucket());
        return;
      }
      logger.warn("Bucket {} doesn't exist, creating it", provider.bucket());

      provider.getClient().makeBucket(MakeBucketArgs.builder().bucket(provider.bucket()).build());

      String policy = generateBucketPolicy(provider.bucket());

      provider.getClient().setBucketPolicy(
        SetBucketPolicyArgs.builder()
          .bucket(provider.bucket())
          .config(policy)
          .build()
      );
      logger.info("Bucket {} is now public", provider.bucket());
    } catch (Exception e) {
      logger.error("Failed to set bucket policy for {}", provider.bucket(), e);
    }

    logger.info("Bucket {} created", provider.bucket());
  }

  private String generateBucketPolicy(String bucketName) {
    return "{\n" +
      "    \"Version\": \"2012-10-17\",\n" +
      "    \"Statement\": [\n" +
      "        {\n" +
      "            \"Effect\": \"Allow\",\n" +
      "            \"Principal\": \"*\",\n" +
      "            \"Action\": [\n" +
      "                \"s3:GetObject\",\n" +
      "                \"s3:PutObject\"\n" +
      "            ],\n" +
      "            \"Resource\": \"arn:aws:s3:::" + bucketName + "/*\"\n" +
      "        }\n" +
      "    ]\n" +
      "}";
  }
}
