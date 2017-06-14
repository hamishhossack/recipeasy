import Component from './components/component';
import CurrentRecipesService from './services/recipes-search-list';
import SearchComponent from './components/search';
import RecipeListComponent from './components/recipe-list';
import appTpl from './app.hbs';

export default class App extends Component {
  constructor() {
    super();
    this.name = 'main';
    this.tpl = appTpl;

    this.currentRecipesService = new CurrentRecipesService();
  }

  compInit() {
    this.buildComponents();
  }

  buildComponents() {
    const searchComponent = new SearchComponent({
      currentRecipesService: this.currentRecipesService
    });
    const recipeListComponent = new RecipeListComponent({
      currentRecipesService: this.currentRecipesService
    });

    searchComponent.init();
    recipeListComponent.init();
  }
}
