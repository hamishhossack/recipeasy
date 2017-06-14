import Handlebars from 'handlebars';

export default class Component {

  constructor() {
    this.name = null;
    this.tpl = null;
    this.context = null;
  }

  /**
   * Get the dom element
   * @returns {Element}
   */
  get el() {
    const $comp = document.querySelector(this.name);
    if (!$comp) {
      throw Error(`No component found for component name "<${this.name}>"`);
    }
    return $comp;
  }

  /**
   * Get the compiled template
   * @returns {string}
   */
  get compile() {
    if (!this.tpl) {
      throw Error('No template defined');
    }
    return Handlebars.compile(this.tpl(this.context))();
  }

  /**
   * Initialize the component
   * ::WARN:: Importance order for component runtime
   */
  init() {
    console.debug(`Component Initializing: ${this.name}`);
    // 1. Render
    this.render();
    // 2. Init component
    this.compInit();
  }

  /**
   * Render the html inside the component element
   */
  render() {
    // clean element
    this.destroy();
    // render the compiled template
    this.el.innerHTML = this.compile;
    // bind events again
    this.bindEvents();
  }

  /**
   * Dummy init for the extended comp to render
   */
  compInit() {
  }

  /**
   * Destroy the component
   */
  destroy() {
    console.debug(`Component Destroying: ${this.name}`);
    this.removeEvents();
    this.el.innerHTML = '';
  }

  /**
   * Bind events to the component (or children)
   */
  bindEvents() {
  }

  /**
   * Remove the bound events to the component (or children)
   */
  removeEvents() {
  }
}