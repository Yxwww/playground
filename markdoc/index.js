const Markdoc = require('@markdoc/markdoc')
const source = '# Markdoc'

const ast = Markdoc.parse(source)
console.log('ast', ast)
const content = Markdoc.transform(ast /* config */)

const html = Markdoc.renderers.html(content)
