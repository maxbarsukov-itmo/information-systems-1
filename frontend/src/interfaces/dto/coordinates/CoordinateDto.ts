import { AuditableDto } from '../AuditableDto';

export interface CoordinateDto extends AuditableDto {
    id: number;
    x: number;
    y: number;
}
