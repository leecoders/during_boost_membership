class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers.forEach((ob, idx) => {
      if (ob === observer) {
        this.observers.splice(idx, 1);
      }
    });
  }
  notify() {
    this.observers.forEach(ob => {
      ob.update();
    });
  }
}

module.exports = Subject;
