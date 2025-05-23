// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 23.9.0
// This file is automatically generated by `tests/node_compat/runner/setup.ts`. Do not modify this file manually.

'use strict';

const common = require('../common');
const { Readable } = require('stream');
const assert = require('assert');

// basic
{
  // Find it on Readable.prototype
  assert(Object.hasOwn(Readable.prototype, 'readableEnded'));
}

// event
{
  const readable = new Readable();

  readable._read = () => {
    // The state ended should start in false.
    assert.strictEqual(readable.readableEnded, false);
    readable.push('asd');
    assert.strictEqual(readable.readableEnded, false);
    readable.push(null);
    assert.strictEqual(readable.readableEnded, false);
  };

  readable.on('end', common.mustCall(() => {
    assert.strictEqual(readable.readableEnded, true);
  }));

  readable.on('data', common.mustCall(() => {
    assert.strictEqual(readable.readableEnded, false);
  }));
}

// Verifies no `error` triggered on multiple .push(null) invocations
{
  const readable = new Readable();

  readable.on('readable', () => { readable.read(); });
  readable.on('error', common.mustNotCall());
  readable.on('end', common.mustCall());

  readable.push('a');
  readable.push(null);
  readable.push(null);
}
