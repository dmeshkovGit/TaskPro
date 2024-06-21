import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/apiInstance';
import toast from 'react-hot-toast';

export const needHelp = createAsyncThunk(
  'user/needHelp',
  async (message, thunkAPI) => {
    try {
      await instance.post('/users/help', message);
      toast.success('Message sent');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserTheme = createAsyncThunk(
  'user/updateUserTheme',
  async (theme, thunkAPI) => {
    try {
      const response = await instance.patch(`/theme`, { theme });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (userData, thunkAPI) => {
    try {
      const response = await instance.put('/users/update', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'user/refreshUser',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const setAvatarUrl = createAsyncThunk(
  'user/setAvatarUrl',
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await instance.put('/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.avatarURL;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
