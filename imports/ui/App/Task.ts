import { TaskCollection } from '../../api/tasks/TaskCollection';
import { Task } from '../../api/tasks/types';

Template.task.events({
  'click .toggle-checked': function () {
    const task = this as Task;

    if (!task._id) {
      console.error(
        'Task ID is undefined. Cannot proceed with the update operation'
      );
      return;
    }

    TaskCollection.update(task._id, {
      $set: { isChecked: !task.isChecked },
    });
  },
});
