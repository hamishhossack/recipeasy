import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import {
  expect
} from 'chai';
import app from '../../../index';

describe('## Recipe APIs', () => {
  let recipe = {};

  before((done) => {
    request(app)
      .get('/api/recipes')
      .then((res) => {
        recipe = res.body[0];
        done();
      });
  });

  describe('# GET /api/recipes', () => {
    it('should get recipe list', (done) => {
      request(app)
        .get('/api/recipes')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        });
    });
  });

  describe('# GET /api/recipes/:recipeId', () => {
    it('should get recipe details', (done) => {
      request(app)
        .get(`/api/recipes/${recipe._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(recipe.name);
          done();
        });
    });

    it('should report error with message - Not found, when recipe does not exists', (done) => {
      request(app)
        .get('/api/recipes/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/recipes/:recipeId/favourite', () => {
    it('should favourite a recipe', (done) => {
      request(app)
        .put(`/api/recipes/${recipe._id}/favourite`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(recipe.name);
          expect(res.body.favourite).to.equal(true);
          done();
        });
    });

    it('should not favourie a recipe in favourites', (done) => {
      request(app)
        .put(`/api/recipes/${recipe._id}/favourite`) // eslint-disable-line
        .expect(httpStatus.BAD_REQUEST)
        .then(() => done());
    });
  });

  describe('# DELETE /api/recipes/:recipeId/favourite', () => {
    it('should remove favourite recipe', (done) => {
      request(app)
        .delete(`/api/recipes/${recipe._id}/favourite`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(recipe.name);
          expect(res.body.favourite).to.equal(false);
          done();
        });
    });

    it('should not remove favourie a recipe not in favourites', (done) => {
      request(app)
        .delete(`/api/recipes/${recipe._id}/favourite`) // eslint-disable-line
        .expect(httpStatus.BAD_REQUEST)
        .then(() => done());
    });
  });

  describe('# GET /api/recipes/filter', () => {
    it('should get recipe list by query (default to name attribute)', (done) => {
      const search = { query: 'chicken', attribute: 'name' };
      request(app)
        .get('/api/recipes/filter')
        .query(search)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        });
    });

    it('should get recipe list by query and attribute', (done) => {
      const search = { query: 'chicken', attribute: 'name' };
      request(app)
        .get('/api/recipes/filter')
        .query(search)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('Array');
          done();
        });
    });

    it('should report error with message - Not found, when no query is present', (done) => {
      request(app)
        .get('/api/recipes/filter')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"query" is required');
          done();
        });
    });
  });
});
