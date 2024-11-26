import { Color } from '../../models/Color';
import { LocationDto } from '../locations/LocationDto';
import { AuditableDto } from '../AuditableDto';

export interface PersonDto extends AuditableDto {
    name: string;
    eyeColor: Color;
    hairColor?: Color;
    location: LocationDto;
    birthday: string;
    height: number;
    passportId?: string;
}
