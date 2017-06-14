import { Observable } from 'rxjs';

import Component from '../component';
import searchCompTpl from './search.hbs';

export default class SearchComponent extends Component {
  constructor({ currentRecipesService }) {
    super();
    this.currentRecipesService = currentRecipesService;

    this.name = 'search';
    this.tpl = searchCompTpl;
    this.context = {
      placeholder: 'Search for recipes...',
    };
    this.recipes = [];
    this.$inputObs = null;
  }

  bindEvents() {
    // Watch the input and apply execute the latest search (wait time for human typing)
    const $input = this.el.querySelector('input');
    this.$inputObs = Observable.fromEvent($input, 'keyup')
      .pluck('target', 'value')
      .filter(text => text.length > 2)
      .distinctUntilChanged()
      .debounceTime(300)
      .subscribe(query => this.currentRecipesService.searchQuery = query);
  }

  removeEvents() {
    if (this.$inputObs) {
      this.$inputObs.unsubscribe();
    }
  }
}
