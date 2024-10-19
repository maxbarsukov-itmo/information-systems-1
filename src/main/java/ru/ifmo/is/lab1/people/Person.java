package ru.ifmo.is.lab1.people;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.ColumnTransformer;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.ifmo.is.lab1.common.framework.CrudEntity;
import ru.ifmo.is.lab1.locations.Location;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "people")
public class Person extends CrudEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "people_id_seq")
  @SequenceGenerator(name = "people_id_seq", sequenceName = "people_id_seq", allocationSize = 1)
  private int id;

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @NotNull
  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write="?::color")
  @Column(name = "eye_color", nullable = false)
  private Color eyeColor;

  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write="?::color")
  @Column(name = "hair_color")
  private Color hairColor;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "location_id", nullable = false)
  private Location location;

  @NotNull
  @Past
  @Column(name = "birthday", nullable = false, columnDefinition = "DATE")
  private LocalDate birthday;

  @NotNull
  @Min(0)
  @Column(name = "height", nullable = false)
  private double height;

  @Column(name = "passport_id", unique = true)
  private String passportId;
}
