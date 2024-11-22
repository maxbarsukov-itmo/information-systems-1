import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AdminRequestService from 'services/api/AdminRequestService';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';
import { extractApiError } from 'interfaces/crud/CrudSlice';

const initialState = {
  data: null as Paged<AdminRequestDto> | null,
  pendingData: null as Paged<AdminRequestDto> | null,
  singleData: null as AdminRequestDto | null,
  loading: false,
  error: null as string | null,
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