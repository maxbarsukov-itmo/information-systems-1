import { DragonType } from '../../models/DragonType';

export interface DragonCreateDto {
    name: string;
    coordinatesId: number;
    caveId?: number;
    killerId?: number;
    headId: number;
    type: DragonType;
    age?: number;
    wingspan?: number;
    speaking?: boolean;
}
