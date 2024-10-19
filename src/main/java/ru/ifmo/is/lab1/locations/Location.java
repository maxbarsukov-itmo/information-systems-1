package ru.ifmo.is.lab1.locations;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.ifmo.is.lab1.common.framework.CrudEntity;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "locations")
public class Location extends CrudEntity {

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
}
