import { JsonNullable } from '../../models/JsonNullable';

export interface CoordinateUpdateDto {
    x: JsonNullable<number>;
    y: JsonNullable<number>;
}
