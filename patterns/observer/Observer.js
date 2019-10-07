class Observer {
  constructor() {}
  subscribe(subject) {
    subject.add(this);
  }
  abort(subject) {
    subject.remove(this);
  }
  update() {}
}

module.exports = Observer;
