import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { RootState } from 'store';
import { fetchAdminRequests, createAdminRequest } from 'store/admin';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';
import { Status } from 'interfaces/models/Status';

const UserInterface = () => {
  const dispatch = useDispatch();
  const adminRequests: Paged<AdminRequestDto> = useSelector(state => state.adminRequests.data);
  const loading = useSelector((state: RootState) => state.adminRequests.loading);
  
  useEffect(() => {
    dispatch(fetchAdminRequests({ page: 0, size: 10, sort: [] }));
  }, [dispatch]);

  const handleSendRequest = () => {
    dispatch(createAdminRequest());
  };

  const hasPendingRequest = adminRequests.content?.some((request: AdminRequestDto) => request.status == Status.PENDING) ?? false;
  const canSendRequest = !hasPendingRequest;

  return (
    <div>
      <h1>User Interface</h1>
      <div>
        <h2>Your Admin Requests</h2>
        {loading.fetch ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {adminRequests.content.map((request: AdminRequestDto) => (
              <li key={request.id}>
                {request.status}: {request.createdAt}
              </li>
            ))}
          </ul>
        )}
      </div>
      {canSendRequest && (
        <button onClick={handleSendRequest} disabled={loading.fetch}>
          {loading.fetch ? 'Sending...' : 'Send Admin Request'}
        </button>
      )}
    </div>
  );
};

export default UserInterface;