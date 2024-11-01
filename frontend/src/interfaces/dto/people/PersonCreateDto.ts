import { Color } from '../../models/Color'; 

export interface PersonCreateDto {
    name: string; 
    eyeColor: Color;
    hairColor?: Color;
    locationId: number;
    birthday: string;
    height: number;
    passportId?: string;
}
