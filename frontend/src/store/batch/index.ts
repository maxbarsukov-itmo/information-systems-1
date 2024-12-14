import { createSlice, createAsyncThunk, PayloadAction, Draft } from '@reduxjs/toolkit';
import BatchOperationService from 'services/api/BatchOperationService';
import { BatchOperationDto } from 'interfaces/dto/batchoperations/BatchOperationDto';
import Paged from 'interfaces/models/Paged';
import { extractApiError, rtkErrorToApiError } from 'interfaces/crud/CrudSlice';
import Error from 'interfaces/crud/Error';
import ApiError from 'interfaces/errors/ApiError';

const initialState = {
  data: null as Paged<BatchOperationDto> | null,
  singleData: null as BatchOperationDto | null,
  loading: {
    fetch: false,
    get: false,
  },
  error: {
    fetch: null,
    get: null,
  } as Error,
};

export const fetchBatchOperations = createAsyncThunk(
  'batchOperations/fetchAll',
  async ({ page, size, sort }: { page: number; size: number; sort: string[] }, { rejectWithValue }) => {
    try {
      const response = await BatchOperationService.getAll(page, size, sort);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

export const fetchBatchOperation = createAsyncThunk(
  'batchOperations/fetchSingle',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await BatchOperationService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);

export const uploadBatchOperation = createAsyncThunk(
  'batchOperations/upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await BatchOperationService.upload(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  }
);


const batchOperationsSlice = createSlice({
  name: 'batchOperations',
  initialState,
  reducers: {
    addBatchOperation(state, action: PayloadAction<BatchOperationDto>) {
      const index = state.data.content.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.data.content[index] = action.payload;
      } else {
        state.data.numberOfElements = state.data.content.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchBatchOperations.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchBatchOperations.fulfilled, (state, action: PayloadAction<Paged<BatchOperationDto>>) => {
        state.loading.fetch = false;
        state.error.fetch = null;
        state.data = action.payload;
      })
      .addCase(fetchBatchOperations.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload as ApiError || rtkErrorToApiError(action.error);
      })

      // fetchSingle
      .addCase(fetchBatchOperation.pending, (state) => {
        state.loading.get = true;
        state.error.get = null;
      })
      .addCase(fetchBatchOperation.fulfilled, (state, action: PayloadAction<BatchOperationDto>) => {
        state.loading.get = false;
        state.error.get = null;
        state.singleData = action.payload;
      })
      .addCase(fetchBatchOperation.rejected, (state, action) => {
        state.loading.get = false;
        state.error.get = action.payload as ApiError || rtkErrorToApiError(action.error);
      });
  },
});

export const { addBatchOperation } = batchOperationsSlice.actions;
export default batchOperationsSlice.reducer;
