import { ZonedDateTime } from 'luxon';

import User from '../../models/User';
import { Status } from '../../models/Status';

export interface AdminRequestDto {
    id: number;
    user: User;
    status: Status;
    approvedBy?: User; // Optional field
    approvalDate?: Date; // Optional field
    createdAt: ZonedDateTime;
}
