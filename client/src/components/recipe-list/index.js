import Siema from 'siema';
import Component from '../component';
import currentListCompTpl from './recipe-list.hbs';

export default class RecipeListComponent extends Component {
  constructor({ currentRecipesService }) {
    super();
    this.currentRecipesService = currentRecipesService;

    this.siema = null;
    this.name = 'recipe-list';
    this.tpl = currentListCompTpl;
    this.context = {
      query: '',
      recipes: this.currentRecipesService.recipes
    };
  }

  compInit() {
    this.currentRecipesService.$recipes.subscribe((recipes) => {
      this.context.recipes = recipes;
      this.render(); // TODO (hamish): Shadow dom should improve this
    });
  }

  bindEvents() {
    // initialise carousel
    const $gallery = this.el.querySelector('.gallery');
    if ($gallery) {
      this.initGallery($gallery);
    }
  }

  /**
   * Build a gallery from the element
   * @param gallery
   */
  initGallery(gallery) {
    this.siema = new Siema({
      selector: gallery,
      duration: 200,
      easing: 'ease-out',
      perPage: 5,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: false,
    });
  }
}
