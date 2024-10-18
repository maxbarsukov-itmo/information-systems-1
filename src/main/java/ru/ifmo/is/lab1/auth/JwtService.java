package ru.ifmo.is.lab1.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;

import ru.ifmo.is.lab1.users.User;

@Service
public class JwtService {
  @Value("${app.jwt.secret}")
  private String jwtSigningKey;

  /**
   * Извлечение имени пользователя из токена
   *
   * @param token токен
   * @return имя пользователя
   */
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Генерация токена
   *
   * @param userDetails данные пользователя
   * @return токен
   */
  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    if (userDetails instanceof User customUserDetails) {
      claims.put("id", customUserDetails.getId());
      claims.put("role", customUserDetails.getRole());
    }
    return generateToken(claims, userDetails);
  }

  /**
   * Проверка токена на валидность
   *
   * @param token       токен
   * @param userDetails данные пользователя
   * @return true, если токен валиден
   */
  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String userName = extractUsername(token);
    return !isTokenExpired(token) && (userName.equals(userDetails.getUsername()));
  }

  /**
   * Извлечение данных из токена
   *
   * @param token           токен
   * @param claimsResolvers функция извлечения данных
   * @param <T>             тип данных
   * @return данные
   */
  private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
    final Claims claims = extractAllClaims(token);
    return claimsResolvers.apply(claims);
  }

  /**
   * Генерация токена
   *
   * @param extraClaims дополнительные данные
   * @param userDetails данные пользователя
   * @return токен
   */
  private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return Jwts.builder()
      .claims(extraClaims)
      .subject(userDetails.getUsername())
      .issuedAt(new Date(System.currentTimeMillis()))
      .expiration(new Date(System.currentTimeMillis() + 1_000 * 60 * 24 * 100))
      .signWith(getSigningKey(), Jwts.SIG.HS256)
      .compact();
  }

  /**
   * Проверка токена на просроченность
   *
   * @param token токен
   * @return true, если токен просрочен
   */
  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  /**
   * Извлечение даты истечения токена
   *
   * @param token токен
   * @return дата истечения
   */
  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  /**
   * Извлечение всех данных из токена
   *
   * @param token токен
   * @return данные
   */
  private Claims extractAllClaims(String token) {
    return Jwts.parser()
      .verifyWith(getSigningKey())
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }

  /**
   * Получение ключа для подписи токена
   *
   * @return ключ
   */
  private SecretKey getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}