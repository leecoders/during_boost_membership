const Subject = require("./Subject.js");
const Observer = require("./Observer.js");

class Comp extends Subject {
  constructor() {
    super();
  }
}

class Subscriber1 extends Observer {
  constructor() {
    super();
  }
  update() {
    console.log("Subject가 바뀌었네? 나는 1번이야");
  }
}

class Subscriber2 extends Observer {
  constructor() {
    super();
  }
  update() {
    console.log("Subject가 바뀌었네? 나는 2번이야");
  }
}

const comp = new Comp();
const sub1 = new Subscriber1();
const sub2 = new Subscriber2();
sub1.subscribe(comp);
sub2.subscribe(comp);

comp.notify();
