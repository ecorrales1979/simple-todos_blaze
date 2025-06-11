import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '../imports/api/tasks/TaskCollection';

const insertTask = async (task: string) =>
  TaskCollection.insertAsync({ text: task });

Meteor.startup(async () => {
  const tasksCount = await TaskCollection.find().countAsync();
  if (tasksCount === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(insertTask);
  }
});
