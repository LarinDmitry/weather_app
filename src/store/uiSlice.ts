import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'services/reduxStore';

interface UiState {
  isRedux: boolean;
}

const initialState: UiState = {
  isRedux: true,
};

const uiSlice = createSlice({
  name: 'uiConfig',
  initialState,
  reducers: {
    setRedux: (state, action: PayloadAction<boolean>) => {
      state.isRedux = action.payload;
    },
  },
});

export const selectUi = (state: RootState) => state.uiConfig;

export const {
  actions: {setRedux},
} = uiSlice;

export default uiSlice.reducer;
