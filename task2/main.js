// const map = { key: "value" };
// const indexedMap = { 1: "key" };

class IndexedMap {
  constructor() {
    this._map = {};
    this._indexed = {};
    this._size = 0;
    this._counter = 0;
  }

  set(key, value) {
    if (key && value) {
      if (!this._map[key]) {
        this._indexed[++this._counter] = key;
        this._size++;
      }
      this._map[key] = value;
    }
    return this.print();
  }

  has(key) {
    if (this._map[key]) {
      return true;
    }
    return false;
  }

  hasIndex(index) {
    if (this._indexed[index]) {
      return true;
    }
    return false;
  }

  get(key) {
    if (this.has(key)) {
      return this._map[key];
    }
    return null;
  }

  getByIndex(index) {
    if (this.hasIndex(index)) {
      return this._map[this._indexed[index]];
    }
    return null;
  }

  remove(key) {
    if (key && this.has(key)) {
      delete this._map[key];
      for (let idx in this._indexed) {
        if (this._indexed[idx] === key) {
          delete this._indexed[idx];
          --this._size;
          break;
        }
      }
    }
    return this.print();
  }

  print() {
    const indexedArray = [];
    for (let index in this._indexed) {
      const element = {
        index: index,
        key: this._indexed[index],
        value: this._map[this._indexed[index]],
      };
      indexedArray.push(element);
    }
    return indexedArray;
  }

  get size() {
    return this._size;
  }
}

const obj = new IndexedMap();
