<script>
  import { onMount } from 'svelte';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { Schema, DOMParser } from 'prosemirror-model';
  import { schema } from 'prosemirror-schema-basic';
  import { exampleSetup } from 'prosemirror-example-setup';
  import { buildMenuItems } from 'prosemirror-example-setup';
  import { UserpillView } from './UserpillView';

  let editor, content, selection;
  let view;

  //
  const nodeSpec = {
    attrs: { content: '' },
    inline: true,
    group: 'inline',
    draggable: true,
    toDOM: (node) => [
      'span',
      {
        class: 'userpill',
        content: node.attrs.content,
      },
      0,
    ],
    parseDOM: [
      {
        tag: 'span.userpill',
        getAttrs(dom) {
          const content = dom.getAttribute('content');
          return {
            content,
          };
        },
      },
    ],
  };

  onMount(() => {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.

    const editorSchema = new Schema({
      nodes: schema.spec.nodes.addBefore('image', 'userpill', nodeSpec),
      marks: schema.spec.marks,
    });

    let startDoc = DOMParser.fromSchema(editorSchema).parse(content);

    // Ask example-setup to build its basic menu
    let menu = buildMenuItems(editorSchema);

    view = new EditorView(editor, {
      state: EditorState.create({
        doc: startDoc,
        // Pass exampleSetup our schema and the menu we created
        plugins: exampleSetup({ schema: editorSchema }),
      }),
      nodeViews: {
        userpill(node, view, getPos) {
          console.log('create user pill?');
          return new UserpillView(node, view, getPos);
        },
      },
    });
  });
</script>

<main>
  <div>
    <div class="editor" bind:this={editor} />
    <pre>{JSON.stringify(selection, null, 2)}</pre>
  </div>
  <div style="display: none" bind:this={content}>
    <p>
      <span class="userpill" content="user1@gmail.com" />
    </p>
  </div>
</main>

<style>
  .editor {
    height: 300px;
    width: 400px;
  }
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
