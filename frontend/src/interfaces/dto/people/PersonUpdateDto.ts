import { Color } from '../../models/Color'; 
import { JsonNullable } from '../../models/JsonNullable';

export interface PersonUpdateDto {
    name?: JsonNullable<string>;
    eyeColor?: JsonNullable<Color>;
    hairColor?: JsonNullable<Color>;
    locationId?: JsonNullable<number>;
    birthday?: JsonNullable<string>;
    height?: JsonNullable<number>;
    passportId?: JsonNullable<string>;
}
