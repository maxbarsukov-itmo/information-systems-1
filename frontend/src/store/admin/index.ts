import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdminRequestService from 'services/api/AdminRequestService';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';

interface AdminRequestState {
  requests: Paged<AdminRequestDto>;
  loading: boolean;
  error: string | null;
}

const initialState: AdminRequestState = {
  requests: {
    totalElements: 0,
    totalPages: 0,
    size: 0,
    content: [],
    number: 0,
    numberOfElements: 0,
  },
  loading: false,
  error: null,
};

export const fetchAdminRequests = createAsyncThunk(
  'adminRequests/fetchAdminRequests',
  async ({ page, size, sort }: { page: number; size: number; sort: string }) => {
    const response = await AdminRequestService.getAll(page, size, sort);
    return response.data;
  }
);

export const fetchPendingAdminRequests = createAsyncThunk(
  'adminRequests/fetchPendingAdminRequests',
  async ({ page, size, sort }: { page: number; size: number; sort: string }) => {
    const response = await AdminRequestService.getPending(page, size, sort);
    return response.data;
  }
);

export const createAdminRequest = createAsyncThunk(
  'adminRequests/createAdminRequest',
  async () => {
    const response = await AdminRequestService.create();
    return response.data;
  }
);

export const processAdminRequest = createAsyncThunk(
  'adminRequests/processAdminRequest',
  async ({ id, approved }: { id: number; approved: boolean }) => {
    const response = await AdminRequestService.process(id, approved);
    return response.data;
  }
);

const adminRequestSlice = createSlice({
  name: 'adminRequests',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdminRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAdminRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin requests';
      })
      .addCase(fetchPendingAdminRequests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingAdminRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchPendingAdminRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pending admin requests';
      })
      .addCase(createAdminRequest.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.content.push(action.payload);
      })
      .addCase(createAdminRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create admin request';
      })
      .addCase(processAdminRequest.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processAdminRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.content.findIndex(request => request.id === action.payload.id);
        if (index !== -1) {
          state.requests.content[index] = action.payload;
        }
      })
      .addCase(processAdminRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to process admin request';
      });
  },
});

export default adminRequestSlice.reducer;