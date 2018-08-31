var moduleExportsIdentifier = '__MIX_IMPORT_MODULE_EXPORTS__';

module.exports = function (babel) {
  var { types } = babel;
  var hasImportDeclaration, moduleExportsPaths;
  
  return {
    visitor: {
      Program: {
        enter() {
          hasImportDeclaration = false;
          moduleExportsPaths = [];
        },
        exit(path) {
          if (hasImportDeclaration && moduleExportsPaths.length) {
            path.node.body.unshift(types.variableDeclaration('var', [types.variableDeclarator(types.Identifier(moduleExportsIdentifier))]));
            path.node.body.push(types.exportDefaultDeclaration(types.Identifier(moduleExportsIdentifier)));
            moduleExportsPaths.forEach(function(p) {
              p.replaceWith(types.Identifier(moduleExportsIdentifier));
            });
          }
        }
      },
      AssignmentExpression(path) {
        var left = path.node.left;
        var leftPath = path.get('left');

        if (
          moduleExportsPaths.indexOf(leftPath) < 0 &&
          left.type === 'MemberExpression' &&
          left.object.name === 'module' &&
          (left.property.name || left.property.value) === 'exports' // module.exports || module['exports']
        ) {
          moduleExportsPaths.push(leftPath);
        }
      },
      ImportDeclaration() {
      	hasImportDeclaration = true;
      }
    }
  };
};