import User from "../../models/User";

export interface BatchOperationDto {
    id: number;
    status: BatchOperationStatus;
    addedCount: number | null;
    updatedCount: number | null;
    deletedCount: number | null;
    errorMessage: string | null;
    createdBy: User;
    createdAt: string;
}

export enum BatchOperationStatus {
    IN_QUEUE,
    IN_PROGRESS,
    SUCCESS,
    FAILED,
}