import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

const scriptContent = fs.readFileSync('script.js', 'utf8');

function setupDOM() {
  const elements = {};
  const listeners = {};
  let theme = 'light';

  const docElement = {
    setAttribute: (name, value) => {
      if (name === 'data-theme') theme = value;
    },
    getAttribute: (name) => {
      if (name === 'data-theme') return theme;
      return null;
    }
  };

  global.document = {
    documentElement: docElement,
    querySelectorAll: () => [],
    getElementById: (id) => {
      if (id === 'theme-toggle') {
        return {
          addEventListener: (event, cb) => {
            listeners[event] = cb;
          }
        };
      }
      return null;
    }
  };

  global.window = {
    addEventListener: () => {},
    matchMedia: () => ({
      matches: false,
      addEventListener: () => {}
    })
  };

  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
  };

  global.localStorage = {
    _data: {},
    setItem: function(key, value) {
      this._data[key] = value;
    },
    getItem: function(key) {
      return this._data[key] || null;
    }
  };

  return { listeners, getTheme: () => theme };
}

test('Theme toggle updates localStorage', () => {
  const { listeners, getTheme } = setupDOM();

  // Execute the script
  (new Function(scriptContent))();

  const toggleBtnListener = listeners['click'];
  assert.strictEqual(typeof toggleBtnListener, 'function', 'Toggle button listener should be registered');

  // Initial theme is light
  assert.strictEqual(getTheme(), 'light');

  // Click toggle
  toggleBtnListener();
  assert.strictEqual(getTheme(), 'dark');
  assert.strictEqual(global.localStorage.getItem('teiten-theme'), 'dark');

  // Click again
  toggleBtnListener();
  assert.strictEqual(getTheme(), 'light');
  assert.strictEqual(global.localStorage.getItem('teiten-theme'), 'light');
});

test('Theme toggle handles localStorage error', () => {
  const { listeners, getTheme } = setupDOM();

  // Mock localStorage.setItem to throw error
  global.localStorage.setItem = () => {
    throw new Error('localStorage is full');
  };

  // Execute the script
  (new Function(scriptContent))();

  const toggleBtnListener = listeners['click'];

  // Initial theme is light
  assert.strictEqual(getTheme(), 'light');

  // Click toggle - should not throw and should still update DOM theme
  assert.doesNotThrow(() => {
    toggleBtnListener();
  });

  assert.strictEqual(getTheme(), 'dark', 'DOM theme should still be updated even if localStorage fails');
});
