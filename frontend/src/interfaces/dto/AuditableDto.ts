import User from '../models/User';
import { ZonedDateTime } from 'luxon';

export interface AuditableDto {
    createdBy?: User;
    createdAt?: ZonedDateTime;
    updatedBy?: User;
    updatedAt?: ZonedDateTime;
}
