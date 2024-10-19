package ru.ifmo.is.lab1.dragoncaves;

import lombok.*;
import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.ifmo.is.lab1.common.framework.CrudEntity;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dragon_caves")
public class DragonCave extends CrudEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dragon_caves_id_seq")
  @SequenceGenerator(name = "dragon_caves_id_seq", sequenceName = "dragon_caves_id_seq", allocationSize = 1)
  private int id;

  @Column(name = "depth")
  private Float depth;
}
