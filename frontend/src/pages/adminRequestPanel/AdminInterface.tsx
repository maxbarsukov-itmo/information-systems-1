import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchAdminRequests, fetchPendingAdminRequests, processAdminRequest } from 'store/admin';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import { Paper, Tabs, Tab, CircularProgress, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { Status } from 'interfaces/models/Status';

const AdminInterface = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const allRequests = useSelector((state: RootState) => state.adminRequests.data);
  const pendingRequests = useSelector((state: RootState) => state.adminRequests.pendingData);
  const loading = useSelector((state: RootState) => state.adminRequests.loading);

  useEffect(() => {
    if (tabIndex === 0) {
      dispatch(fetchPendingAdminRequests({ page, size, sort: [] }));
    } else {
      dispatch(fetchAdminRequests({ page, size, sort: [] }));
    }
  }, [dispatch, tabIndex, page, size]);

  const handleTabChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setTabIndex(newValue);
    setPage(0);
  };

  const handleProcessRequest = (id: number, approved: boolean) => {
    dispatch(processAdminRequest({ id, approved }));
  };

  const renderRequests = (requests: AdminRequestDto[]) => (
    <List>
      {requests.map((request: AdminRequestDto) => (
        <ListItem key={request.id}>
          <ListItemText primary={`${request.status}: ${new Date(request.createdAt).toLocaleString()}`} />
          {request.status === Status.PENDING && (
            <div>
              <Button variant="contained" color="primary" onClick={() => handleProcessRequest(request.id, true)}>
                Approve
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleProcessRequest(request.id, false)}>
                Reject
              </Button>
            </div>
          )}
        </ListItem>
      ))}
    </List>
  );

  return (
    <Paper style={{ padding: '16px' }}>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Pending Requests" />
        <Tab label="All Requests" />
      </Tabs>
      {loading.fetch ? (
        <CircularProgress />
      ) : (
        <>
          {tabIndex === 0 && renderRequests(pendingRequests?.content || [])}
          {tabIndex === 1 && renderRequests(allRequests?.content || [])}
        </>
      )}
      {
      // TODO: add pagination
      }
    </Paper>
  );
};

export default AdminInterface;
