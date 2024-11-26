import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  PaperProps,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 12,
  },
  header: {
    height: 48,
  },
  headerIcon: {
    marginRight: 4,
    color: theme.palette.error.main,
  },
  headerText: {
    fontFamily: 'Google Sans',
    fontSize: 20,
    fontWeight: 500,
  },
}));

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  options?: { value: string | number; label: string }[];
}

interface Props<T> {
  item?: T;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (item: T) => void;
  buildRequest: (state: any) => T;
  initialState: any;
  fields: FieldConfig[];
  PaperComponent?: React.ComponentType<PaperProps>;
  error?: string | null;
  isValid?: boolean;
}

const AddOrEditModal = <T extends unknown>({ item, isOpen, setOpen, onSave, buildRequest, initialState, fields, PaperComponent, error, isValid }: Props<T>) => {
  const classes = useStyles();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (item) {
      setState(item);
    } else {
      setState(initialState);
    }
  }, [item, initialState]);

  const handleCancel = () => setOpen(false);
  const handleOk = () => {
    const request = buildRequest(state);
    onSave(request);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            value={state[field.name] || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          />
        );
      case 'number':
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type="number"
            value={state[field.name] || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          />
        );
      case 'select':
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            select
            value={state[field.name] || ''}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="standard"
          >
            {field.options?.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case 'checkbox':
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                checked={state[field.name] || false}
                onChange={e => setState(prevState => ({ ...prevState, [field.name]: e.target.checked }))}
                name={field.name}
              />
            }
            label={field.label}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth={true}
      onClose={handleCancel}
      open={isOpen}
      scroll="body"
      aria-labelledby="add-or-edit-dialog-title"
      PaperComponent={PaperComponent}
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="add-or-edit-dialog-title" className={classes.header}>
        <Typography className={classes.headerText}>
          {item ? 'Edit Item' : 'Add Item'}
        </Typography>
        <IconButton className={classes.headerIcon} onClick={handleCancel}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText>
          {item ? 'Edit the details of the item.' : 'Enter the details of the new item.'}
        </DialogContentText>
        {error && <Typography color="error">{error}</Typography>}
        <form>
          {fields.map(field => renderField(field))}
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" disabled={!isValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditModal;
