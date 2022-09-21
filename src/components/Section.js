export default class Section {
    constructor({ renderer }, selector) {
      this._renderer = renderer;
      this._container = document.querySelector(selector);
    }
  
    renderCard(items) {
      items.reverse().forEach((item) => {
        this.addItem(item);
      });
    }
  
    addItem(item) {
      const element = this._renderer(item);
      this._container.prepend(element);
    }
  
    _clear() {
      this._container.innerHTML = '';
    }
  }