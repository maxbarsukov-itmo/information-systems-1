import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { RootState } from 'store';
import { fetchAdminRequests, createAdminRequest } from 'store/admin';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';
import { Status } from 'interfaces/models/Status';
import { Paper, Typography, Button, CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';

const UserInterface = () => {
  const dispatch = useDispatch();
  const adminRequests: Paged<AdminRequestDto> | null = useSelector(state => state.adminRequests.data);
  const loading = useSelector((state: RootState) => state.adminRequests.loading);
  
  useEffect(() => {
    dispatch(fetchAdminRequests({ page: 0, size: 10, sort: [] }));
  }, [dispatch]);

  const handleSendRequest = () => {
    dispatch(createAdminRequest());
  };

  const hasPendingRequest = adminRequests?.content?.some((request: AdminRequestDto) => request.status === Status.PENDING) ?? false;
  const canSendRequest = !hasPendingRequest;

  return (
    <Paper style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        User Interface
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Admin Requests
      </Typography>
      {loading.fetch ? (
        <CircularProgress />
      ) : (
        <List>
          {adminRequests?.content?.map((request: AdminRequestDto) => (
            <ListItem key={request.id}>
              <ListItemText primary={`${request.status}: ${new Date(request.createdAt).toLocaleString()}`} />
            </ListItem>
          ))}
        </List>
      )}
      {canSendRequest && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendRequest}
          disabled={loading.create}
          style={{ marginTop: '16px' }}
        >
          {loading.create ? <CircularProgress size={24} /> : 'Send Admin Request'}
        </Button>
      )}
    </Paper>
  );
};

export default UserInterface;