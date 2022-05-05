class IndexedMap {
  constructor() {
    this._map = {};
    this._indexed = {};
    this._size = 0;
    this._counter = 0;
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

  updateIndex() {
    this._counter = 0;
    const newIndexed = {};
    for (let index in this._indexed) {
      newIndexed[this._counter++] = this._indexed[index];
    }
    this._indexed = newIndexed;
    return this._indexed;
  }

  set(key, value) {
    if (key && value) {
      if (!this._map[key]) {
        this._indexed[this._counter++] = key;
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
          this.updateIndex();
          break;
        }
      }
    }
    return this.print();
  }

  forEach(fn) {
    for (let index in this._indexed) {
      fn(this._map[this._indexed[index]], this._indexed[index], index);
    }
    return this.print();
  }

  union(...maps) {
    for (let map of maps) {
      map.forEach((value, key) => {
        this.set(key, value);
      });
    }
    return this.print();
  }

  unique() {
    const newUniqueObject = {};
    const newUniqueCollection = [];
    for (let value in this._map) {
      if (!newUniqueObject[this._map[value]]) {
        newUniqueObject[this._map[value]] = 1;
        newUniqueCollection.push(this._map[value]);
      }
    }
    return newUniqueCollection;
  }

  uniqueKeys() {
    const newUniqueKeys = [];
    for (let key in this._map) {
      newUniqueKeys.push(key);
    }
    return newUniqueKeys;
  }

  removeAt(index, count = 1) {
    if (index) {
      for (let i = 1; i <= count; ++i) {
        if (this._indexed[index + i]) {
          delete this._map[this._indexed[index + i]];
          delete this._indexed[index + i];
        } else {
          break;
        }
      }
      this.updateIndex();
    }
    return this.print();
  }

  get size() {
    return this._size;
  }
}

const obj = new IndexedMap();
