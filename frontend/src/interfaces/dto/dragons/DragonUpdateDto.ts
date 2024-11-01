import { DragonType } from '../../models/DragonType';
import { JsonNullable } from '../../models/JsonNullable';

export interface DragonUpdateDto {
    name?: JsonNullable<string>;
    coordinatesId?: JsonNullable<number>;
    caveId?: JsonNullable<number>;
    killerId?: JsonNullable<number>;
    headId?: JsonNullable<number>;
    type?: JsonNullable<DragonType>;
    age?: JsonNullable<number>;
    wingspan?: JsonNullable<number>;
    speaking?: JsonNullable<boolean>;
}
