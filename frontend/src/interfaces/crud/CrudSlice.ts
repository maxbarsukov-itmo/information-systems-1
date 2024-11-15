import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk, PayloadAction, Draft, SerializedError } from '@reduxjs/toolkit';
import { ELEMENTS_ON_PAGE } from 'config/constants';
import Loading from './Loading';
import Error from './Error';
import CrudRequest from './CrudRequest';
import CrudService from './CrudService';
import Paged from 'interfaces/models/Paged';
import ApiError from 'interfaces/errors/ApiError';

const extractApiError = (error: unknown) => {
  return {
    code: (<AxiosError>error)?.response?.status.toString(),
    ...(<AxiosError>error)?.response?.data,
  } as ApiError;
};

const rtkErrorToApiError = (error: SerializedError): Draft<ApiError> => {
  return {
    code: error.code,
    status: error.name,
    message: error.message,
  } as Draft<ApiError>;
};

export interface CrudState<T> {
  items?: Paged<T>;
  loading: Loading;
  error: Error;
}

interface Identifiable {
  id: number;
}

const createCrudSlice = <T extends Identifiable, CreateDto, UpdateDto>(
  name: string,
  service: CrudService<T, CreateDto, UpdateDto>
) => {
  const initialState: CrudState<T> = {
    items: null,
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
    },
  };

  const fetchItems = createAsyncThunk(
    `${name}/fetchItems`,
    async ({ page, size, sort }: Omit<CrudRequest, 'search'>, { rejectWithValue }) => {
      try {
        const response = await service.getAll(page, size, sort);
        return response.data;
      } catch (error: unknown) {
        return rejectWithValue(extractApiError(error));
      }
    }
  );

  const getItem = createAsyncThunk(
    `${name}/getItem`,
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await service.get(id);
        return response.data;
      } catch (error: unknown) {
        return rejectWithValue(extractApiError(error));
      }
    }
  );

  const searchItems = createAsyncThunk(
    `${name}/searchItems`,
    async ({ search, page, size, sort }: CrudRequest, { rejectWithValue }) => {
      try {
        const response = await service.search(search, page, size, sort);
        return response.data;
      } catch (error: unknown) {
        return rejectWithValue(extractApiError(error));
      }
    }
  );

  const createItem = createAsyncThunk(
    `${name}/createItem`,
    async (createDto: CreateDto, { rejectWithValue }) => {
      try {
        const response = await service.create(createDto);
        return response.data;
      } catch (error: unknown) {
        return rejectWithValue(extractApiError(error));
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/updateItem`,
    async ({ id, updateDto }: { id: number; updateDto: UpdateDto }, { rejectWithValue }) => {
      try {
        const response = await service.update(id, updateDto);
        return response.data;
      } catch (error: unknown) {
        return rejectWithValue(extractApiError(error));
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/deleteItem`,
    async (id: number, { rejectWithValue }) => {
      try {
        await service.delete(id);
        return id;
      } catch (error: unknown) {
        return rejectWithValue(extractApiError(error));
      }
    }
  );

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // fetch
        .addCase(fetchItems.pending, (state) => {
          state.loading.fetch = true;
          state.error.fetch = null;
        })
        .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Paged<T>>) => {
          state.loading.fetch = false;
          state.error.fetch = null;
          state.items = action.payload as Draft<Paged<T>>;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.loading.fetch = false;
          state.error.fetch = action?.payload as Draft<ApiError> || rtkErrorToApiError(action.error);
        })

        // get
        .addCase(getItem.pending, (state) => {
          state.loading.get = true;
          state.error.get = null;
        })
        .addCase(getItem.fulfilled, (state, action: PayloadAction<T>) => {
          state.loading.get = false;
          state.error.get = null;
          state.items = {
            content: [action.payload],
            totalElements: 1,
            totalPages: 1,
            size: 1,
            number: 0,
            numberOfElements: 0,
          } as Draft<Paged<T>>;
        })
        .addCase(getItem.rejected, (state, action) => {
          state.loading.get = false;
          state.error.get = action?.payload as Draft<ApiError> || rtkErrorToApiError(action.error);
        })

        // search
        .addCase(searchItems.pending, (state) => {
          state.loading.search = true;
          state.error.search = null;
        })
        .addCase(searchItems.fulfilled, (state, action: PayloadAction<Paged<T>>) => {
          state.loading.search = false;
          state.error.search = null;
          state.items = action.payload as Draft<Paged<T>>;
        })
        .addCase(searchItems.rejected, (state, action) => {
          state.loading.search = false;
          state.error.search = action?.payload as Draft<ApiError> || rtkErrorToApiError(action.error);
        })

        // create
        .addCase(createItem.pending, (state) => {
          state.loading.create = true;
          state.error.create = null;
        })
        .addCase(createItem.fulfilled, (state, action: PayloadAction<T>) => {
          state.loading.create = false;
          state.error.create = null;
          state.items.totalElements++;
          if (state.items.numberOfElements < ELEMENTS_ON_PAGE) {
            state.items.numberOfElements = state.items.content.push(action.payload as Draft<T>);
          }
        })
        .addCase(createItem.rejected, (state, action) => {
          state.loading.create = false;
          state.error.create = action?.payload as Draft<ApiError> || rtkErrorToApiError(action.error);
        })

        // update
        .addCase(updateItem.pending, (state) => {
          state.loading.update = true;
          state.error.update = null;
        })
        .addCase(updateItem.fulfilled, (state, action: PayloadAction<T>) => {
          state.loading.update = false;
          state.error.update = null;
          const index = state.items.content.findIndex(item => item.id === action.payload.id);
          if (index >= 0) {
            state.items.content[index] = action.payload as Draft<T>;
          }
        })
        .addCase(updateItem.rejected, (state, action) => {
          state.loading.update = false;
          state.error.update = action?.payload as Draft<ApiError> || rtkErrorToApiError(action.error);
        })

        // delete
        .addCase(deleteItem.pending, (state) => {
          state.loading.delete = true;
          state.error.delete = null;
        })
        .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
          state.loading.delete = false;
          state.error.delete = null;
          state.items.content = state.items.content.filter(item => item.id !== action.payload);
          state.items.totalElements--;
          if (state.items.numberOfElements === 1) {
            state.items.empty = true;
            state.items.totalPages--;
          }
        })
        .addCase(deleteItem.rejected, (state, action) => {
          state.loading.delete = false;
          state.error.delete = action?.payload as Draft<ApiError> || rtkErrorToApiError(action.error);
        });
    },
  });

  return {
    slice,
    actions: {
      fetchItems,
      searchItems,
      getItem,
      createItem,
      updateItem,
      deleteItem,
    },
  };
};

export default createCrudSlice;
