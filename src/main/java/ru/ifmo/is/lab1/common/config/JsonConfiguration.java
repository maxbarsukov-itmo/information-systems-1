package ru.ifmo.is.lab1.common.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.jakarta.Hibernate5JakartaModule;
import org.openapitools.jackson.nullable.JsonNullableModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import ru.ifmo.is.lab1.common.utils.datetime.ZonedDateTimeDeserializer;
import ru.ifmo.is.lab1.common.utils.datetime.ZonedDateTimeSerializer;

@Configuration
public class JsonConfiguration {
  @Bean
  public Module hibernateModule() {
    return new Hibernate5JakartaModule();
  }

  @Bean
  public Jackson2ObjectMapperBuilder objectMapperBuilder() {
    var builder = new Jackson2ObjectMapperBuilder();
    builder.serializers(new ZonedDateTimeSerializer());
    builder.deserializers(new ZonedDateTimeDeserializer());
    builder.modulesToInstall(new JsonNullableModule());
    return builder;
  }
}
