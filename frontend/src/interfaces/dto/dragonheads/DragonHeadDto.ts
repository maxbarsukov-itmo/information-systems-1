import { AuditableDto } from '../AuditableDto';

export interface DragonHeadDto extends AuditableDto {
    size: number;
    toothCount?: number;
}
