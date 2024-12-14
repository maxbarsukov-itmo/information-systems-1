import React from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';
import { renderHeader } from './utils/renderHeader';
import { getNumberFilterOperations, getDateTimeFilterOperations } from 'utils/search';
import { renderUser, renderDateTime, renderMultilineText, renderStatus } from './utils/renderer';
import { BatchOperationDto } from 'interfaces/dto/batchoperations/BatchOperationDto';
import { fetchBatchOperations } from 'store/batch';
import { Event } from 'interfaces/events/Event';
import BatchOperationTableTemplate from './BatchOperationTableTemplate';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        description: 'id',
        flex: 1,
        resizable: true,
        minWidth: 120,
        renderHeader,
        filterOperators: getNumberFilterOperations(),
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'status',
        flex: 1,
        resizable: true,
        minWidth: 170,
        renderHeader,
        renderCell: renderStatus,
        filterOperators: getNumberFilterOperations(),
    },
    {
        field: 'addedCount',
        headerName: 'Added Count',
        description: 'addedCount',
        flex: 1,
        resizable: true,
        minWidth: 170,
        renderHeader,
        filterOperators: getNumberFilterOperations(),
    },
    {
        field: 'updatedCount',
        headerName: 'Updated Count',
        description: 'updatedCount',
        flex: 1,
        resizable: true,
        minWidth: 170,
        renderHeader,
        filterOperators: getNumberFilterOperations(),
    },
    {
        field: 'deletedCount',
        headerName: 'Deleted Count',
        description: 'deletedCount',
        flex: 1,
        resizable: true,
        minWidth: 170,
        renderHeader,
        filterOperators: getNumberFilterOperations(),
    },
    {
        field: 'errorMessage',
        headerName: 'Error Message',
        description: 'errorMessage',
        flex: 1,
        resizable: true,
        minWidth: 200,
        type: 'string',
        filterable: false,
        sortable: false,
        renderCell: renderMultilineText,
    },
    {
        field: 'createdBy',
        headerName: 'Created By',
        description: 'createdBy',
        flex: 1,
        resizable: true,
        minWidth: 200,
        type: 'string',
        filterable: false,
        sortable: false,
        renderCell: renderUser,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        description: 'createdAt',
        flex: 1,
        resizable: true,
        minWidth: 220,
        type: 'dateTime',
        renderHeader,
        filterOperators: getDateTimeFilterOperations(),
        renderCell: renderDateTime,
    },
];

const BatchOperationsTable = () => {
    return (
        <BatchOperationTableTemplate<BatchOperationDto>
            resource={'batchoperations'}
            columns={columns}
            fetchAction={fetchBatchOperations}
        />
    );
};

export default BatchOperationsTable;
