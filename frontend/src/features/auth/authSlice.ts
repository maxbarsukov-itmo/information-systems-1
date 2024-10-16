import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/User';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Определите асинхронный thunk для входа пользователя
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { username: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/api/login', credentials);
    // Предполагается, что сервер возвращает объект { user, token }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при входе');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // Вход пользователя
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
