const babel = require('babel-core');
const plugin = require('../index');

var example = `
const A = require('a');
// ...
module.exports = A;
`;

it('no-import-just-module-exports', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});