import {
  expect
} from 'chai';

import helper from './recipe.helper';

describe('# Helper', () => {
  it('should return a partial name match with attribute name', (done) => {
    const search = { query: 'chicken', attribute: 'name' };
    expect(helper.getFilterOptions(search)).to.have.property('name');
    done();
  });

  it('should return a lte with attribute maxCookTime', (done) => {
    const search = { query: 'chicken', attribute: 'maxCookTime' };
    expect(helper.getFilterOptions(search)).to.have.property('cookTime');
    done();
  });

  it('should return a array match with attribute ingredients', (done) => {
    const search = { query: 'chicken', attribute: 'ingredients' };
    expect(helper.getFilterOptions(search)).to.have.property('ingredients');
    done();
  });

  it('should return false if it has a bad filter', (done) => {
    const search = { query: 'chicken', attribute: 'thisShouldFail' };
    expect(helper.getFilterOptions(search)).to.equal(false);
    done();
  });
});
