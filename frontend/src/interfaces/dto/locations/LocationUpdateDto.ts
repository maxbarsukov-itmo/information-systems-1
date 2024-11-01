import { JsonNullable } from '../../models/JsonNullable';

export interface LocationUpdateDto {
    x?: JsonNullable<number>;
    y?: JsonNullable<number>;
    z?: JsonNullable<number>;
}
