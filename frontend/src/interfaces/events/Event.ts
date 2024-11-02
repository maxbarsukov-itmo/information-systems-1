import { EventType } from '../models/EventType';
import { ResourceType } from '../models/ResourceType';

export interface Event<T> {
    eventType: EventType;
    resourceType: ResourceType;
    resourceId: number;
    requestUuid: string;
    entity: T;
}
