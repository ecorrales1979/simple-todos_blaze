import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import './main.html';

interface MyTemplateInstance extends Blaze.TemplateInstance {
  counter: ReactiveVar<number>;
}

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return (Template.instance() as MyTemplateInstance).counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
