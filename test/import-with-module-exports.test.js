const babel = require('babel-core');
const plugin = require('../index');

var example = `
import * as A from 'a';
// ...
module.exports = A;
`;

it('import-with-module-exports', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});