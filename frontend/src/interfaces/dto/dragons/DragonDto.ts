import { AuditableDto } from '../AuditableDto';
import { CoordinateDto } from '../coordinates/CoordinateDto';
import { DragonCaveDto } from '../dragoncaves/DragonCaveDto';
import { DragonHeadDto } from '../dragonheads/DragonHeadDto';
import { DragonType } from '../../models/DragonType';
import { PersonDto } from '../people/PersonDto';

export interface DragonDto extends AuditableDto {
    name: string;
    coordinates: CoordinateDto;
    cave?: DragonCaveDto;
    killer?: PersonDto;
    head: DragonHeadDto;
    type: DragonType;
    age?: number;
    wingspan?: number;
    speaking?: boolean;
}
