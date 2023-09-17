import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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
} from './taskSlice'; 
import './TaskManager.css';
import { useTheme } from './useTheme';
function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const newTaskTitle = useSelector((state) => state.tasks.newTaskTitle);
  const newTaskDescription = useSelector((state) => state.tasks.newTaskDescription);
  const error = useSelector((state) => state.tasks.error);
  const editingIndex = useSelector((state) => state.tasks.editingIndex);
  const isLight = useSelector((state) => state.tasks.isLight);
  const updatedTitle = useSelector((state) => state.tasks.updatedTitle);
  const updatedDescription = useSelector((state) => state.tasks.updatedDescription);
  const filter = useSelector((state) => state.tasks.filter);
  const { isLight: themeIsLight, toggleTheme } = useTheme();
  const handleTheme = () => {
    const newTheme = !isLight;
    dispatch(setIsLight(newTheme));
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme.toString());
  };
  
  

  const AddTask = () => {
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

  const removeHandle = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    dispatch(setTasks(updatedTasks));
  };

 

  return (
    <div className={`TaskManager ${themeIsLight ? 'Light' : 'Dark'}`}>
      <div className='Header'>
        <h2 className='heading'>TODO APP</h2>
        <button className='themeButton' onClick={toggleTheme}>
          {isLight ? 'Light' : 'Dark'} Theme
        </button>
      </div>
      <div className='taskInput'>
        <input
          type='text'
          placeholder='Enter your title'
          value={newTaskTitle}
          onChange={(e) => dispatch(setNewTaskTitle(e.target.value))}
        />
        <input
          type='text'
          placeholder='Enter Description'
          value={newTaskDescription}
          onChange={(e) => dispatch(setNewTaskDescription(e.target.value))}
        />
        <button className='addButton' onClick={AddTask}>
          Add
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className='filterButtons'>
        <button
          className={filter === 'All' ? 'activeFilter' : ''}
          onClick={() => dispatch(setFilter('All'))}
        >
          All
        </button>
        <button
          className={filter === 'Pending' ? 'activeFilter' : ''}
          onClick={() => dispatch(setFilter('Pending'))}
        >
          Pending
        </button>
        <button
          className={filter === 'Complete' ? 'activeFilter' : ''}
          onClick={() => dispatch(setFilter('Complete'))}
        >
          Completed
        </button>
      </div>
      <div className='taskList'>
        {filteredTasks.map((task, index) => (
          <div key={index} className={`taskItem ${task.isComplete ? 'completed' : ''}`}>
            {editingIndex === index ? (
              <div>
                <input
                  type='text'
                  value={updatedTitle}
                  onChange={(e) => dispatch(setUpdatedTitle(e.target.value))}
                  placeholder='Edit Title'
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => dispatch(setUpdatedDescription(e.target.value))}
                  placeholder='Edit Description'
                  style={{marginLeft:'5px',marginRight:'2px'}}
                />
                <button className='updateButton' onClick={handleUpdateClick}>
                  Update
                </button>
              </div>
            ) : (
              <div s>
                <h3 className={task.isComplete ? 'completed-text' : ''}>{task.title}</h3>
                <p className={task.isComplete ? 'completed-text' : ''}>{task.description}</p>
              </div>
            )}
            <div className='specifyingButton'>
            <button className='editButton' onClick={() => handleEditClick(index)}>
              Edit
            </button>
            <button className='removeButton' onClick={() => removeHandle(task.id)}>
              Remove
            </button>
            <button className='completeButton' onClick={() => completeTask(task.id)}>
              {task.isComplete ? 'Incomplete' : 'Complete'}
            </button>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
