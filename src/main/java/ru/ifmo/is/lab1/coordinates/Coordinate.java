package ru.ifmo.is.lab1.coordinates;

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
@Table(name = "coordinates")
public class Coordinate extends CrudEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coordinates_id_seq")
  @SequenceGenerator(name = "coordinates_id_seq", sequenceName = "coordinates_id_seq", allocationSize = 1)
  private int id;

  @NotNull
  @Max(301)
  @Column(name = "x", nullable = false)
  private Integer x;

  @NotNull
  @Column(name = "y", nullable = false)
  private Float y;
}
