import { JsonNullable } from '../../models/JsonNullable';

export interface DragonHeadUpdateDto {
    size: JsonNullable<number>;
    toothCount?: JsonNullable<number>;
}
