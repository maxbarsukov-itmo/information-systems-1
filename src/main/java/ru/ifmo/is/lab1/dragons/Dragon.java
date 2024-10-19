package ru.ifmo.is.lab1.dragons;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.ifmo.is.lab1.common.framework.CrudEntity;
import ru.ifmo.is.lab1.coordinates.Coordinate;
import ru.ifmo.is.lab1.dragoncaves.DragonCave;
import ru.ifmo.is.lab1.dragonheads.DragonHead;
import ru.ifmo.is.lab1.people.Person;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dragons")
public class Dragon extends CrudEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dragons_id_seq")
  @SequenceGenerator(name = "dragons_id_seq", sequenceName = "dragons_id_seq", allocationSize = 1)
  private int id;

  @NotNull
  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @NotNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "coordinates_id", nullable = false)
  private Coordinate coordinates;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "cave_id")
  private DragonCave cave;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "killer_id")
  private Person killer;

  @NotNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "head_id", nullable = false)
  private DragonHead head;

  @NotNull
  @Enumerated(EnumType.STRING)
  @JdbcType(PostgreSQLEnumJdbcType.class)
  @ColumnTransformer(write="?::dragon_type")
  @Column(name = "type")
  private DragonType type;

  @Positive
  private Integer age;

  @Positive
  private Integer wingspan;

  private Boolean speaking;
}
