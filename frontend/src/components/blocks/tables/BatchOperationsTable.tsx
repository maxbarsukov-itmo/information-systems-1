import React from 'react';
import { GridApi, GridCellValue, GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { renderHeader } from './utils/renderHeader';
import BatchOperationService from 'services/api/BatchOperationService';
import { getNumberFilterOperations, getDateTimeFilterOperations } from 'utils/search';
import { renderUser, renderDateTime, renderMultilineText, renderStatus } from './utils/renderer';
import { BatchOperationDto } from 'interfaces/dto/batchoperations/BatchOperationDto';
import { fetchBatchOperations } from 'store/batch';
import { Event } from 'interfaces/events/Event';
import BatchOperationTableTemplate from './BatchOperationTableTemplate';
import Button from '@material-ui/core/Button';

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
        field: 'file',
        headerName: 'File',
        renderHeader,
        description: 'file',
        flex: 1,
        resizable: true,
        minWidth: 170,
        renderCell: (params) => {
            const onClick = async (e) => {
              e.stopPropagation(); // don't select this row after clicking
      
              const api: GridApi = params.api;
              const thisRow: Record<string, GridCellValue> = {};
      
              api
                .getAllColumns()
                .filter((c) => c.field !== '__check__' && !!c)
                .forEach(
                  (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                );

              const response = await BatchOperationService.downloadFile(Number(thisRow.id));
              
              // Get blob
              const blob = new Blob([response?.data as BlobPart], { type: 'application/json' });
              
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute(
                'download',
                `${thisRow.id}.json`
              );
          
              document.body.appendChild(link);
              link.click();          
              link.parentNode.removeChild(link);
            };
      
            return <Button variant="outlined" onClick={onClick}>Download</Button>;
          },
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
