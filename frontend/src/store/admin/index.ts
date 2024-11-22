import { createSlice, createAsyncThunk, PayloadAction, Draft } from '@reduxjs/toolkit';
import AdminRequestService from 'services/api/AdminRequestService';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';
import { extractApiError, rtkErrorToApiError } from 'interfaces/crud/CrudSlice';
import Error from 'interfaces/crud/Error';
import ApiError from 'interfaces/errors/ApiError';

const initialState = {
  data: null as Paged<AdminRequestDto> | null,
  pendingData: null as Paged<AdminRequestDto> | null,
  singleData: null as AdminRequestDto | null,
  loading: {
    fetch: false,
    get: false,
    create: false,
    update: false,
    delete: false,
    search: false,
  },
  error: {
    fetch: null,
    get: null,
    create: null,
    update: null,
    delete: null,
    search: null,
  } as Error,
};

export const fetchAdminRequests = createAsyncThunk(
  'adminRequests/fetchAll',
  async ({ page, size, sort }: { page: number; size: number; sort: string[] }, { rejectWithValue }) => {
    try {
      const response = await AdminRequestService.getAll(page, size, sort);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

export const fetchPendingAdminRequests = createAsyncThunk(
  'adminRequests/fetchPending',
  async ({ page, size, sort }: { page: number; size: number; sort: string[] }, { rejectWithValue }) => {
    try {
      const response = await AdminRequestService.getPending(page, size, sort);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

export const fetchAdminRequest = createAsyncThunk(
  'adminRequests/fetchSingle',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await AdminRequestService.get(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

export const createAdminRequest = createAsyncThunk(
  'adminRequests/create',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AdminRequestService.create();
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

export const processAdminRequest = createAsyncThunk(
  'adminRequests/process',
  async ({ id, approved }: { id: number; approved: boolean }, { rejectWithValue }) => {
    try {
      const response = await AdminRequestService.process(id, approved);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

const adminRequestsSlice = createSlice({
  name: 'adminRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchAdminRequests.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchAdminRequests.fulfilled, (state, action: PayloadAction<Paged<AdminRequestDto>>) => {
        state.loading.fetch = false;
        state.error.fetch = null;
        state.data = action.payload;
      })
      .addCase(fetchAdminRequests.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload as ApiError || rtkErrorToApiError(action.error);
      })

      // fetchPending
      .addCase(fetchPendingAdminRequests.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchPendingAdminRequests.fulfilled, (state, action: PayloadAction<Paged<AdminRequestDto>>) => {
        state.loading.fetch = false;
        state.error.fetch = null;
        state.pendingData = action.payload;
      })
      .addCase(fetchPendingAdminRequests.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload as ApiError || rtkErrorToApiError(action.error);
      })

      // fetchSingle
      .addCase(fetchAdminRequest.pending, (state) => {
        state.loading.get = true;
        state.error.get = null;
      })
      .addCase(fetchAdminRequest.fulfilled, (state, action: PayloadAction<AdminRequestDto>) => {
        state.loading.get = false;
        state.error.get = null;
        state.singleData = action.payload;
      })
      .addCase(fetchAdminRequest.rejected, (state, action) => {
        state.loading.get = false;
        state.error.get = action.payload as ApiError || rtkErrorToApiError(action.error);
      })

      // create
      .addCase(createAdminRequest.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createAdminRequest.fulfilled, (state, action: PayloadAction<AdminRequestDto>) => {
        state.loading.create = false;
        state.error.create = null;
        state.singleData = action.payload;
      })
      .addCase(createAdminRequest.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload as ApiError || rtkErrorToApiError(action.error);
      })

      // process
      .addCase(processAdminRequest.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(processAdminRequest.fulfilled, (state, action: PayloadAction<AdminRequestDto>) => {
        state.loading.update = false;
        state.error.update = null;
        state.singleData = action.payload;
      })
      .addCase(processAdminRequest.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload as ApiError || rtkErrorToApiError(action.error);
      });
  },
});

export default adminRequestsSlice.reducer;