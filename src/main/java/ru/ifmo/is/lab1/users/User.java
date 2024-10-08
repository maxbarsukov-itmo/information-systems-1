package ru.ifmo.is.lab1.users;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.ifmo.is.lab1.common.utils.datetime.ZonedDateTimeConverter;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_id_seq")
  @SequenceGenerator(name = "users_id_seq", sequenceName = "users_id_seq", allocationSize = 1)
  @Column(name="id", nullable=false, unique=true)
  private int id;

  @NotBlank
  @Column(name="username", nullable=false, unique=true)
  private String username;

  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write="?::user_role")
  @Column(name="role", nullable=false)
  private Role role;

  @JsonIgnore
  @ToString.Exclude
  @Column(name="password_hash", nullable=false, unique=true)
  private String password;

  @CreationTimestamp
  @Column(name="created_at", nullable=false)
  @Convert(converter = ZonedDateTimeConverter.class)
  private ZonedDateTime createdAt;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
