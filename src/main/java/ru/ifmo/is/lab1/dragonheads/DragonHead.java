package ru.ifmo.is.lab1.dragonheads;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.ifmo.is.lab1.common.framework.Auditable;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "dragon_heads")
public class DragonHead extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dragon_heads_id_seq")
  @SequenceGenerator(name = "dragon_heads_id_seq", sequenceName = "dragon_heads_id_seq", allocationSize = 1)
  private int id;

  @NotNull
  @Column(name = "size", nullable = false)
  private long size;

  @Column(name = "tooth_count")
  private Float toothCount;
}
