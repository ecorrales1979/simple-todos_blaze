import { Template } from 'meteor/templating';

import { TaskCollection } from '../../api/tasks/TaskCollection';
import './App.view.html';

Template.mainContainer.helpers({
  tasks() {
    return TaskCollection.find();
  },
});
