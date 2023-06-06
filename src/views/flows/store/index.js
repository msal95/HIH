import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedItem: {},
};

const dataSlice = createSlice({
  name: "flowsData",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    onSelectNode: (state, action) => {
      state.selectedItem = action.payload;
    },
    discardSelectedItem: (state, action) => {
      state.selectedItem = {};
    },
    deleteData: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editData: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...newData };
      }
    },
  },
});

export const {
  addData,
  deleteData,
  editData,
  onSelectNode,
  discardSelectedItem,
} = dataSlice.actions;

export default dataSlice.reducer;
