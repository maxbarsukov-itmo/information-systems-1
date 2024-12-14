import React, { useState } from 'react';
import DragAndDropInterface from 'components/blocks/DragAndDropInterface';
import BatchOperationsTable from 'components/blocks/tables/BatchOperationsTable';
import { Paper, Typography } from '@material-ui/core';

const BatchOperationPanel = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = () => {
    setFileUploaded(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Batch Operation Panel
      </Typography>
      <DragAndDropInterface onFileUpload={handleFileUpload} />

      <Paper style={{ marginTop: '16px', padding: '16px' }}>
        <BatchOperationsTable />
      </Paper>

    </div>
  );
};

export default BatchOperationPanel;
