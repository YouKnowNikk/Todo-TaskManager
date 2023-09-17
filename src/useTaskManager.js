// useTaskManager.js

import { useSelector, useDispatch } from 'react-redux';
import {
  setTasks,
  setNewTaskTitle,
  setNewTaskDescription,
  setError,
  setEditingIndex,
  setUpdatedTitle,
  setUpdatedDescription,
  setFilter,
} from './taskSlice';

export function useTaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const newTaskTitle = useSelector((state) => state.tasks.newTaskTitle);
  const newTaskDescription = useSelector((state) => state.tasks.newTaskDescription);
  const error = useSelector((state) => state.tasks.error);
  const editingIndex = useSelector((state) => state.tasks.editingIndex);
  const updatedTitle = useSelector((state) => state.tasks.updatedTitle);
  const updatedDescription = useSelector((state) => state.tasks.updatedDescription);
  const filter = useSelector((state) => state.tasks.filter);

  const addTask = () => {
    if (newTaskTitle && newTaskDescription) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription,
        isComplete: false,
      };
      dispatch(setTasks([...tasks, newTask]));
      dispatch(setNewTaskTitle(''));
      dispatch(setNewTaskDescription(''));
    } else {
      dispatch(setError('All Fields are required'));
    }
  };

  const handleEditClick = (index) => {
    dispatch(setEditingIndex(index));
    dispatch(setUpdatedTitle(tasks[index].title));
    dispatch(setUpdatedDescription(tasks[index].description));
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    );
    dispatch(setTasks(updatedTasks));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    dispatch(setTasks(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Complete') {
      return task.isComplete;
    } else if (filter === 'Pending') {
      return !task.isComplete;
    }
    return true;
  });

  const handleUpdateClick = () => {
    dispatch(setEditingIndex(-1));
  };

  return {
    tasks,
    newTaskTitle,
    newTaskDescription,
    error,
    editingIndex,
    updatedTitle,
    updatedDescription,
    filter,
    addTask,
    handleEditClick,
    completeTask,
    removeTask,
    filteredTasks,
    handleUpdateClick,
    setFilter,
  };
}
