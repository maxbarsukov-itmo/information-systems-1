import React from 'react';
import { TablePaginationProps } from '@material-ui/core';
import { GridPagination, useGridSlotComponentProps } from '@mui/x-data-grid-pro';
import { Pagination } from '@material-ui/lab';

const PaginationComponent = ({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
  const { state } = useGridSlotComponentProps();

  return (
    <Pagination
      className={className}
      color="primary"
      count={state.pagination.pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
};

const CustomPagination = (props: any) => {
  return <GridPagination ActionsComponent={PaginationComponent} {...props} />;
};

export default React.memo(CustomPagination);
