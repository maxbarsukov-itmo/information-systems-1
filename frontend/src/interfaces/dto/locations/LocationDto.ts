import { AuditableDto } from '../AuditableDto';

export interface LocationDto extends AuditableDto {
    x: number;
    y: number;
    z: number;
}
