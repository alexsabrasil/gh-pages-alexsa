const helper = require('../helper.js');
const ghPages = require('../../lib/index.js');
const path = require('path');

const fixtures = path.join(__dirname, 'fixtures');
const fixtureName = 'nojekyll';

beforeEach(() => {
  ghPages.clean();
});

describe('the --nojekyll option', () => {
  it('adds a .nojekyll file', (done) => {
    const local = path.join(fixtures, fixtureName, 'local');
    const expected = path.join(fixtures, fixtureName, 'expected');
    const branch = 'gh-pages';

    helper.setupRemote(fixtureName, {branch}).then((url) => {
      const options = {
        repo: url,
        user: {
          name: 'User Name',
          email: 'user@email.com',
        },
        nojekyll: true,
      };
      ghPages.publish(local, options, (err) => {
        if (err) {
          return done(err);
        }
        helper
          .assertContentsMatch(expected, url, branch)
          .then(() => done())
          .catch(done);
      });
    });
  });
});
