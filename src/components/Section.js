export default class Section {
  constructor(container, { renderer }) {
    this._renderer = renderer;

    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card);
  }
}
