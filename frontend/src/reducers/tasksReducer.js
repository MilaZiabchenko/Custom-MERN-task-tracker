export const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case 'loaded_tasks': {
      return action.payload;
    }

    case 'updated_task': {
      const updatedTasks = tasks.map(task =>
        task._id === action.payload._id
          ? {
              ...task,
              name: action.payload.name,
              time: action.payload.time,
              priority: action.payload.priority
            }
          : task
      );

      const editedTaskIndex = tasks.findIndex(
        task => task._id === action.payload._id
      );

      return editedTaskIndex === 0
        ? updatedTasks
        : [
            updatedTasks.at(editedTaskIndex),
            ...updatedTasks.slice(0, editedTaskIndex),
            ...updatedTasks.slice(editedTaskIndex + 1)
          ];
    }

    case 'toggled_completed': {
      return tasks.map(task =>
        task._id === action.payload._id
          ? { ...task, completed: action.payload.completed }
          : task
      );
    }

    case 'added_task': {
      return [action.payload, ...tasks];
    }

    case 'deleted_task': {
      return tasks.filter(task => task._id !== action._id);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
