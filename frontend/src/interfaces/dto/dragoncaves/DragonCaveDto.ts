import { AuditableDto } from '../AuditableDto';

export interface DragonCaveDto extends AuditableDto {
    id: number;
    depth?: number;
}
