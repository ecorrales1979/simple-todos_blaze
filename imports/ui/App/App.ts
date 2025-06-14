import { Template } from 'meteor/templating';

import { TaskCollection } from '../../api/tasks/TaskCollection';
import { TaskFormElements } from '../../api/tasks/types';
import './App.view.html';
import './Task';

Template.mainContainer.helpers({
  tasks() {
    return TaskCollection.find({}, { sort: { createdAt: -1 } });
  },
});

Template.form.events({
  'submit .task-form': (event: Event) => {
    event.preventDefault();

    const target = event.target as TaskFormElements;
    const text = target.text.value;

    if (!text) return;

    TaskCollection.insert({
      text,
      createdAt: new Date(),
    });

    target.text.value = '';
  },
});
