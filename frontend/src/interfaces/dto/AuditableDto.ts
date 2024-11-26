import User from '../models/User';
import { ZonedDateTime } from 'luxon';

export interface AuditableDto {
    id: number;
    createdBy?: User;
    createdAt?: ZonedDateTime;
    updatedBy?: User;
    updatedAt?: ZonedDateTime;
}
