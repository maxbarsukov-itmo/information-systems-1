package ru.ifmo.is.lab1.locations;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.ifmo.is.lab1.common.entity.BaseEntity;
import ru.ifmo.is.lab1.common.utils.datetime.ZonedDateTimeConverter;
import ru.ifmo.is.lab1.users.User;

import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "locations")
public class Location implements BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "locations_id_seq")
  @SequenceGenerator(name = "locations_id_seq", sequenceName = "locations_id_seq", allocationSize = 1)
  private int id;

  @Column(name = "x")
  private double x;

  @Column(name = "y")
  private long y;

  @NotNull
  @Column(name = "z", nullable = false)
  private long z;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "created_by", nullable = false)
  private User createdBy;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name="created_at", nullable=false)
  @Convert(converter = ZonedDateTimeConverter.class)
  private ZonedDateTime createdAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "updated_by")
  private User updatedBy;

  @Column(name="updated_at")
  @Convert(converter = ZonedDateTimeConverter.class)
  private ZonedDateTime updatedAt;
}
