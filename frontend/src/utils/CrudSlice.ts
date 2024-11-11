import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Paged from 'interfaces/models/Paged';
import Loading from './Loading';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { Draft } from 'immer';

interface CrudState<T> {
    paged: Paged<T>;
    loading: Loading;
    error: string | null;
    search?: SearchDto;
    currentItem?: T | null;
}

interface Identifiable {
    id: number;
}

const createCrudSlice = <T extends Identifiable, CreateDto, UpdateDto>(
    name: string,
    service: {
        getAll: (page: number, size: number, sort: string) => Promise<AxiosResponse<Paged<T>>>;
        getById: (id: number) => Promise<AxiosResponse<T>>;
        create: (data: CreateDto) => Promise<AxiosResponse<T>>;
        update: (id: number, data: UpdateDto) => Promise<AxiosResponse<T>>;
        delete: (id: number) => Promise<AxiosResponse<void>>;
    }
) => {
    const initialState: CrudState<T> = {
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
        currentItem: null,
    };

    const fetchItems = createAsyncThunk(
        `${name}/fetchItems`,
        async ({ page, size, sort }: { page: number; size: number; sort: string }) => {
            const response = await service.getAll(page, size, sort);
            return response.data;
        }
    );

    const getItem = createAsyncThunk(
        `${name}/getItem`,
        async (id: number) => {
            const response = await service.getById(id);
            return response.data;
        }
    );

    const createItem = createAsyncThunk(
        `${name}/createItem`,
        async (data: CreateDto) => {
            const response = await service.create(data);
            return response.data;
        }
    );

    const updateItem = createAsyncThunk(
        `${name}/updateItem`,
        async ({ id, data }: { id: number; data: UpdateDto }) => {
            const response = await service.update(id, data);
            return response.data;
        }
    );

    const deleteItem = createAsyncThunk(
        `${name}/deleteItem`,
        async (id: number) => {
            await service.delete(id);
            return id;
        }
    );

    const slice = createSlice({
        name,
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchItems.pending, (state) => {
                    state.loading.fetch = true;
                })
                .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Paged<T>>) => {
                    state.loading.fetch = false;
                    state.paged = {
                        ...action.payload,
                        content: action.payload.content as unknown as Draft<T>[],
                    };
                })
                .addCase(fetchItems.rejected, (state, action) => {
                    state.loading.fetch = false;
                    state.error = action.error.message || 'Failed to fetch items';
                })
                .addCase(getItem.pending, (state) => {
                    state.loading.get = true;
                })
                .addCase(getItem.fulfilled, (state, action: PayloadAction<T>) => {
                    state.loading.get = false;
                    state.currentItem = action.payload as Draft<T>;
                })
                .addCase(getItem.rejected, (state, action) => {
                    state.loading.get = false;
                    state.error = action.error.message || 'Failed to fetch item';
                })
                .addCase(createItem.pending, (state) => {
                    state.loading.create = true;
                })
                .addCase(createItem.fulfilled, (state, action: PayloadAction<T>) => {
                    state.loading.create = false;
                    state.currentItem = action.payload as Draft<T>;
                })
                .addCase(createItem.rejected, (state, action) => {
                    state.loading.create = false;
                    state.error = action.error.message || 'Failed to create item';
                })
                .addCase(updateItem.pending, (state) => {
                    state.loading.update = true;
                })
                .addCase(updateItem.fulfilled, (state, action: PayloadAction<T>) => {
                    state.loading.update = false;
                    state.currentItem = action.payload as Draft<T>;
                })
                .addCase(updateItem.rejected, (state, action) => {
                    state.loading.update = false;
                    state.error = action.error.message || 'Failed to update item';
                })
                .addCase(deleteItem.pending, (state) => {
                    state.loading.delete = true;
                })
                .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
                    state.loading.delete = false;
                    state.currentItem = null;
                    state.paged.content = state.paged.content.filter(item => item.id !== action.payload);
                })
                .addCase(deleteItem.rejected, (state, action) => {
                    state.loading.delete = false;
                    state.error = action.error.message || 'Failed to delete item';
                });
        },
    });

    return {
        slice,
        actions: {
            fetchItems,
            getItem,
            createItem,
            updateItem,
            deleteItem,
        },
    };
};

export default createCrudSlice;