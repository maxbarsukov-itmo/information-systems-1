import { DragonDto } from '../dragons/DragonDto';

export interface DragonResultDto {
    errorMessage?: string;
    dragon?: DragonDto;
}
