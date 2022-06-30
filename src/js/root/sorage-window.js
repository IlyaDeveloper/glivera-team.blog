export class StorageWindow {
  constructor() {
    this.lStore = window.localStorage;
    this.cStore = document.cookie;
  }

  getCookieItem(key) {
    let cookie = {};

    this.cStore.split(';').forEach(function (el) {
      let [key, val] = el.split('=');
      cookie[key.trim()] = val;
    })
    return cookie[key];
  }

  setCookieItem(key, value) {
    document.cookie = `${key} = ${value}`;
  }

  getStorageItem(name) {
    // let ss =  window.localStorage.getItem(name);
    return this.lStore.getItem(name);
  }

  setStorageItem(name, param) {
    this.lStore.setItem(name, param);
  }
}

