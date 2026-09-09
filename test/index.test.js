'use strict';

const App = require('../index');

describe('app export', () => {
  it('exports a Zapier app with matching platform version', () => {
    expect(App.version).toBe('1.0.0');
    expect(App.platformVersion).toBe(require('zapier-platform-core').version);
    expect(App.authentication.type).toBe('custom');
    expect(App.triggers.new_post).toBeDefined();
    expect(App.creates.create_post).toBeDefined();
    expect(App.creates.update_post_status).toBeDefined();
    expect(App.searches.find_post).toBeDefined();
  });
});
