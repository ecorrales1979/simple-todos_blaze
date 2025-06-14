import { Template } from 'meteor/templating';

import { TaskCollection } from '../../api/tasks/TaskCollection';
// import './App.styles.css';
import { TaskFormElements } from '../../api/tasks/types';
import './App.view.html';

Template.mainContainer.helpers({
  tasks() {
    return TaskCollection.find();
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
