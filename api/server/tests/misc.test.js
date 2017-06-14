import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import {
  expect
} from 'chai';
import app from '../../index';

describe('## Misc', () => {
  describe('# GET /api/healthz', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/healthz')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        });
    });
  });
});
