import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  newTaskTitle: '',
  newTaskDescription: '',
  error: '',
  editingIndex: -1,
  isLight: false,
  updatedTitle: '',
  updatedDescription: '',
  filter: 'All',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setNewTaskTitle: (state, action) => {
      state.newTaskTitle = action.payload;
    },
    setNewTaskDescription: (state, action) => {
      state.newTaskDescription = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEditingIndex: (state, action) => {
      state.editingIndex = action.payload;
    },
    setIsLight: (state, action) => {
      state.isLight = action.payload;
    },
    setUpdatedTitle: (state, action) => {
      state.updatedTitle = action.payload;
    },
    setUpdatedDescription: (state, action) => {
      state.updatedDescription = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTheme: (state, action) => {
        state.isLight = action.payload;
      },

  },
});

export const {
  setTasks,
  setNewTaskTitle,
  setNewTaskDescription,
  setError,
  setEditingIndex,
  setIsLight,
  setUpdatedTitle,
  setUpdatedDescription,
  setFilter,
  setTheme,
} = taskSlice.actions;

export default taskSlice.reducer;
