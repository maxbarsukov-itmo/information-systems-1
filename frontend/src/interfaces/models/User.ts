import { ZonedDateTime } from 'luxon';

import { Role } from './Role';

type User = {
  id: number;
  username: string;
  role: Role;
  createdAt: ZonedDateTime;
};

export default User;
