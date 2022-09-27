export default class Section {
<<<<<<< Updated upstream
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
=======
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
>>>>>>> Stashed changes
