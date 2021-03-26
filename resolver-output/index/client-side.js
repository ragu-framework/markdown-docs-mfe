
      var component = require('/home/runner/work/markdown-docs-mfe/markdown-docs-mfe/index');
      var resolver = require('/home/runner/work/markdown-docs-mfe/markdown-docs-mfe/node_modules/ragu-simple-adapter/resolvers/hydrate-resolver');

      module.exports.default = (resolver.default || resolver)(component.default || component);
    