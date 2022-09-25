export default class Section {
    constructor({ renderer }, selector) {
      this._renderer = renderer;
      this._container = document.querySelector(selector);
    }
    
    // items - массив элементов класса Card
    renderCard(items) {
      // массив элементов класса Card, разворачивается задом наперёд, и для каждого из этих элементов
      // вызывает метод addItem
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