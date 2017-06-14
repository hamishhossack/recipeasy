import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import {
  expect
} from 'chai';
import app from '../../index';

describe('## Misc', () => {
  describe('# GET /api/health-check', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        });
    });
  });
});
