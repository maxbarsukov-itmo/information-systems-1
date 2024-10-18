package ru.ifmo.is.lab1.adminrequests;

import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnTransformer;
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
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "admin_requests")
public class AdminRequest implements BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_requests_id_seq")
  @SequenceGenerator(name = "admin_requests_id_seq", sequenceName = "admin_requests_id_seq", allocationSize = 1)
  @Column(name="id", nullable=false, unique=true)
  private int id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write="?::status")
  @Column(name="status", nullable=false)
  private Status status;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "approved_by", nullable = false)
  private User approvedBy;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name="approval_date", nullable=false)
  @Convert(converter = ZonedDateTimeConverter.class)
  private ZonedDateTime approvalDate;

  @CreationTimestamp
  @Column(name="created_at", nullable=false)
  @Convert(converter = ZonedDateTimeConverter.class)
  private ZonedDateTime createdAt;
}
