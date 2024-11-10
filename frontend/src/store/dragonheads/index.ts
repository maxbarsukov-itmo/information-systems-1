import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import DragonHeadService from 'services/api/DragonHeadService';

import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { DragonHeadCreateDto } from 'interfaces/dto/dragonheads/DragonHeadCreateDto';
import { DragonHeadUpdateDto } from 'interfaces/dto/dragonheads/DragonHeadUpdateDto';
import { SearchDto } from 'interfaces/dto/search/SearchDto';

import Loading from 'utils/Loading';
import Paged from 'interfaces/models/Paged';

export interface DragonHeadState {
    paged: Paged<DragonHeadDto>;
    loading: Loading;
    error: string | null;
    search?: SearchDto;
}

const initialState: DragonHeadState = {
    paged: {
        sort: 'id, desc',
        content: [],
        number: 0,
        size: 20,
        totalElements: 0,
        totalPages: 0,
        numberOfElements: 0,
        first: false,
        last: false,
        empty: true,
    },
    loading: {
        fetch: false,
        get: false,
        create: false,
        update: false,
        delete: false,
        search: false,
    },
    error: null,
    search: null,
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
          state.paged.number = action.payload;
      },
      setSize: (state, action: PayloadAction<number>) => {
          state.paged.size = action.payload;
      },
      setSort: (state, action: PayloadAction<string>) => {
          state.paged.sort = action.payload;
      },
      setSearch: (state, action: PayloadAction<SearchDto>) => {
        state.search = action.payload;
    },
      handleEventUpdate: (state, action: PayloadAction<DragonHeadDto>) => {
          const index = state.paged.content.findIndex(item => item.id === action.payload.id);
          if (index >= 0) {
              state.paged.content[index] = action.payload;
          }
      },
      handleEventDelete: (state, action: PayloadAction<number>) => {
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(fetchDragonHeads.pending, (state) => {
              state.loading.fetch = true;
          })
          .addCase(fetchDragonHeads.fulfilled, (state, action) => {
              state.loading.fetch = false;
              state.paged = action.payload;
          })
          .addCase(fetchDragonHeads.rejected, (state, action) => {
              state.loading.fetch = false;
              state.error = action.error.message || 'Failed to fetch dragon heads';
          })
          .addCase(createDragonHead.pending, (state) => {
              state.loading.create = true;
          })
          .addCase(createDragonHead.fulfilled, (state, action) => {
              state.loading.create = false;
          })
          .addCase(createDragonHead.rejected, (state, action) => {
              state.loading.create = false;
              state.error = action.error.message || 'Failed to create dragon head'; 
          })
          .addCase(updateDragonHead.pending, (state) => { 
              state.loading.update = true;
          })
          .addCase(updateDragonHead.fulfilled, (state, action) => {
              state.loading.update = false;
          })
          .addCase(fetchDragonHeads.rejected, (state, action) => {
              state.loading.fetch = false;
              state.error = action.error.message || 'Failed to fetch dragon heads';
          })
          .addCase(updateDragonHead.fulfilled, (state, action) => {
              const index = state.paged.content.findIndex(item => item.id === action.payload.id);
              if (index >= 0) {
                  state.paged.content[index] = action.payload;
              }
          })
          .addCase(deleteDragonHead.fulfilled, (state, action) => {
              state.paged.content = state.paged.content.filter(item => item.id !== action.payload);
          });
  },
});

export const { setPage, setSize, setSort, setSearch, handleEventUpdate, handleEventDelete } = dragonHeadSlice.actions;
export default dragonHeadSlice.reducer;
