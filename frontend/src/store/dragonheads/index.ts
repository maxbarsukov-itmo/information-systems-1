import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import DragonHeadService from 'services/api/DragonHeadService';

import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { DragonHeadCreateDto } from 'interfaces/dto/dragonheads/DragonHeadCreateDto';
import { DragonHeadUpdateDto } from 'interfaces/dto/dragonheads/DragonHeadUpdateDto';
import { SearchDto } from 'interfaces/dto/search/SearchDto';

export interface DragonHeadState {
    items: DragonHeadDto[];
    loading: boolean;
    error: string | null;
    page: number;
    size: number;
    sort: string;
    search?: SearchDto;
    totalItems: number;
}

const initialState: DragonHeadState = {
    items: [],
    loading: false,
    error: null,
    page: 0,
    size: 20,
    search: null,
    sort: 'id,asc',
    totalItems: 0,
};

export const fetchDragonHeads = createAsyncThunk(
    'dragonHead/fetchDragonHeads',
    async ({ page, size, sort }: { page: number; size: number; sort: string }) => {
        const response = await DragonHeadService.getAll(page, size, sort);
        return response.data;
    }
);

export const searchDragonHeads = createAsyncThunk(
  'dragonHead/searchDragonHeads',
  async ({ search, page, size, sort }: { search: SearchDto; page: number; size: number; sort: string }) => {
      const response = await DragonHeadService.search(search, page, size, sort);
      return response.data;
  }
);

export const createDragonHead = createAsyncThunk(
    'dragonHead/createDragonHead',
    async (dragonHead: DragonHeadCreateDto) => {
        const response = await DragonHeadService.create(dragonHead);
        return response.data;
    }
);

export const updateDragonHead = createAsyncThunk(
    'dragonHead/updateDragonHead',
    async ({ id, dragonHead }: { id: number; dragonHead: DragonHeadUpdateDto }) => {
        const response = await DragonHeadService.update(id, dragonHead);
        return response.data;
    }
);

export const deleteDragonHead = createAsyncThunk(
    'dragonHead/deleteDragonHead',
    async (id: number) => {
        await DragonHeadService.delete(id);
        return id;
    }
);

const dragonHeadSlice = createSlice({
  name: 'dragonHead',
  initialState,
  reducers: {
      setPage: (state, action: PayloadAction<number>) => {
          state.page = action.payload;
      },
      setSize: (state, action: PayloadAction<number>) => {
          state.size = action.payload;
      },
      setSort: (state, action: PayloadAction<string>) => {
          state.sort = action.payload;
      },
      setSearch: (state, action: PayloadAction<SearchDto>) => {
        state.search = action.payload;
    },
      handleEventUpdate: (state, action: PayloadAction<DragonHeadDto>) => {
          const index = state.items.findIndex(item => item.id === action.payload.id);
          if (index >= 0) {
              state.items[index] = action.payload;
          }
      },
      handleEventDelete: (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(item => item.id !== action.payload);
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(fetchDragonHeads.pending, (state) => {
              state.loading = true;
          })
          .addCase(fetchDragonHeads.fulfilled, (state, action) => {
              state.loading = false;
              state.items = action.payload.content;
              state.totalItems = action.payload.numberOfElements;
          })
          .addCase(fetchDragonHeads.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch dragon heads';
          })
          .addCase(createDragonHead.fulfilled, (state, action) => {
              state.items.unshift(action.payload);
          })
          .addCase(updateDragonHead.fulfilled, (state, action) => {
              const index = state.items.findIndex(item => item.id === action.payload.id);
              if (index >= 0) {
                  state.items[index] = action.payload;
              }
          })
          .addCase(deleteDragonHead.fulfilled, (state, action) => {
              state.items = state.items.filter(item => item.id !== action.payload);
          });
  },
});

export const { setPage, setSize, setSort, setSearch, handleEventUpdate, handleEventDelete } = dragonHeadSlice.actions;
export default dragonHeadSlice.reducer;
