package ru.ifmo.is.lab1.common.ws;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.ifmo.is.lab1.common.entity.BaseEntity;
import ru.ifmo.is.lab1.common.entity.EntityTypeExtractor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);
  private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
  private final ObjectMapper objectMapper;
  private final EntityTypeExtractor entityTypeExtractor;

  @Override
  public void afterConnectionEstablished(@NonNull WebSocketSession session) {
    sessions.add(session);
  }

  @Override
  public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
    sessions.remove(session);
  }

  public void notifyClients(EventType eventType, BaseEntity entity) {
    try {
      Map<String, Object> payload = new HashMap<>();
      var entityType = entityTypeExtractor.getEntityIdentification(entity);

      payload.put("eventType", eventType.name());
      payload.put("entityType", entityType.getLeft());
      payload.put("entityId", entityType.getRight());

      var message = objectMapper.writeValueAsString(payload);
      sendMessageToAll(message);
    } catch (Exception ex) {
      logger.warn(ex.getLocalizedMessage());
    }
  }

  private void sendMessageToAll(String message) {
    for (var session : sessions) {
      try {
        if (session.isOpen()) {
          session.sendMessage(new TextMessage(message));
        }
      } catch (Exception ex) {
        logger.warn(ex.getLocalizedMessage());
      }
    }
  }
}
