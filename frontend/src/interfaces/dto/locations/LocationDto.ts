import { AuditableDto } from '../AuditableDto';

export interface LocationDto extends AuditableDto {
    id: number;
    x: number;
    y: number;
    z: number;
}
