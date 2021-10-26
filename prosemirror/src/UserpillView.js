export class UserpillView {
  constructor(node, view, getPos) {
    console.log('[UserpillView] constructor', node, view, getPos);
    // We'll need these later
    this.node = node;
    this.outerView = view;
    this.getPos = getPos;

    // The node's representation in the editor (empty, for now)
    this.dom = document.createElement('span');
    this.dom.classList.add('pill');
    console.log('dom', this.dom, node.attrs.content);
    this.dom.innerText = node.attrs.content;
  }
}
