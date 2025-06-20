import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '../imports/api/tasks/TaskCollection';

const insertTask = async (task: string, user: Meteor.User) =>
  TaskCollection.insertAsync({
    text: task,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME) as Meteor.User;

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
    ].forEach((taskText) => insertTask(taskText, user));
  }
});
