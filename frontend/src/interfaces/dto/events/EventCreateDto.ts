import { EventType } from '../../models/EventType';
import { ResourceType } from '../../models/ResourceType';

export interface EventCreateDto {
    resourceId: number;
    resourceType: ResourceType;
    type: EventType;
}
