import { Template } from 'meteor/templating';

import { Blaze } from 'meteor/blaze';
import { ReactiveDict } from 'meteor/reactive-dict';
import { TaskCollection } from '../../api/tasks/TaskCollection';
import { TaskFormElements } from '../../api/tasks/types';
import '../components/Task';
import './App.view.html';

type MainContainerInstance = Blaze.TemplateInstance & {
  state: ReactiveDict;
};

const HIDE_COMPLETED_STRING = 'hideCompleted';

Template.mainContainer.onCreated(function () {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  tasks() {
    const instance = Template.instance() as MainContainerInstance;
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const hideCompletedFilter = { isChecked: { $ne: true } };

    return TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  },
  hideCompleted() {
    const template = Template.instance() as MainContainerInstance;
    return template.state.get(HIDE_COMPLETED_STRING);
  },
});

Template.mainContainer.events({
  'click #hide-completed-button': function (
    event: Event,
    instance: MainContainerInstance
  ) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
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
