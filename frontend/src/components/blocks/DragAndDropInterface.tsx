import React, { useState } from 'react';
import { useDispatch } from 'hooks';
import { Paper, Button, Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { uploadBatchOperation } from 'store/batch';

const DragAndDropInterface = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.type !== 'application/json') {
      setError('Only JSON files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    setFile(file);
    setError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      
      dispatch(uploadBatchOperation(formdata));
      onFileUpload();
    }
  };

  return (
    <Paper {...getRootProps()} style={{ padding: '16px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <Typography variant="h6">Drag & Drop your JSON file here</Typography>
      {file && <Typography variant="body1">{file.name}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
        style={{ marginTop: '16px' }}
      >
        Upload
      </Button>
    </Paper>
  );
};

export default DragAndDropInterface;