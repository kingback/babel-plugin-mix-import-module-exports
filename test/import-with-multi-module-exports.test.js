const babel = require('babel-core');
const plugin = require('../index');

var example = `
import { A } from 'a';
import B from 'b';
// ...
if (B) {
  module.exports = B;
} else {
  module['exports'] = A;
}
`;

it('import-with-multi-module-exports', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});