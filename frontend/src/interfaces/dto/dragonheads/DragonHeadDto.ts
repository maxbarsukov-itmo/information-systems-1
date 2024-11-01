import { AuditableDto } from '../AuditableDto';

export interface DragonHeadDto extends AuditableDto {
    id: number;
    size: number;
    toothCount?: number;
}
