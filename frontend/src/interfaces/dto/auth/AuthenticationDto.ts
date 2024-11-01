import User from '../../models/User';

export interface AuthenticationDto {
    token: string;
    user: User;
}
