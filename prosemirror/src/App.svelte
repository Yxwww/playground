<script>
  import { onMount } from 'svelte';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { Schema, DOMParser } from 'prosemirror-model';
  import { schema } from 'prosemirror-schema-basic';
  import { addListNodes } from 'prosemirror-schema-list';
  import { exampleSetup } from 'prosemirror-example-setup';
  import { MenuItem } from 'prosemirror-menu';
  import { buildMenuItems } from 'prosemirror-example-setup';

  let editor, content;
  let view;

  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks,
  });
  // The supported types of dinosaurs.
  const dinos = ['brontosaurus', 'stegosaurus', 'triceratops', 'tyrannosaurus', 'pterodactyl'];

  const dinoNodeSpec = {
    // Dinosaurs have one attribute, their type, which must be one of
    // the types defined above.
    // Brontosaurs are still the default dino.
    attrs: { type: { default: 'brontosaurus' } },
    inline: true,
    group: 'inline',
    draggable: true,

    // These nodes are rendered as images with a `dino-type` attribute.
    // There are pictures for all dino types under /img/dino/.
    toDOM: (node) => [
      'img',
      {
        'dino-type': node.attrs.type,
        src: '/img/dino/' + node.attrs.type + '.png',
        title: node.attrs.type,
        class: 'dinosaur',
      },
    ],
    // When parsing, such an image, if its type matches one of the known
    // types, is converted to a dino node.
    parseDOM: [
      {
        tag: 'img[dino-type]',
        getAttrs: (dom) => {
          let type = dom.getAttribute('dino-type');
          return dinos.indexOf(type) > -1 ? { type } : false;
        },
      },
    ],
  };
  onMount(() => {
    console.log('mounted');

    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.

    const dinoSchema = new Schema({
      nodes: schema.spec.nodes.addBefore('image', 'dino', dinoNodeSpec),
      marks: schema.spec.marks,
    });

    let content = document.querySelector('#content');
    let startDoc = DOMParser.fromSchema(dinoSchema).parse(content);

    let dinoType = dinoSchema.nodes.dino;

    function insertDino(type) {
      return function (state, dispatch) {
        let { $from } = state.selection,
          index = $from.index();
        if (!$from.parent.canReplaceWith(index, index, dinoType)) return false;
        if (dispatch) dispatch(state.tr.replaceSelectionWith(dinoType.create({ type })));
        return true;
      };
    }

    // Ask example-setup to build its basic menu
    let menu = buildMenuItems(dinoSchema);
    // Add a dino-inserting item for each type of dino
    dinos.forEach((name) =>
      menu.insertMenu.content.push(
        new MenuItem({
          title: 'Insert ' + name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          enable(state) {
            return insertDino(name)(state);
          },
          run: insertDino(name),
        }),
      ),
    );

    view = new EditorView(editor, {
      state: EditorState.create({
        doc: startDoc,
        // Pass exampleSetup our schema and the menu we created
        plugins: exampleSetup({ schema: dinoSchema, menuContent: menu.fullMenu }),
      }),
    });

    /* view = new EditorView(editor, { */
    /*   state: EditorState.create({ */
    /*     doc: DOMParser.fromSchema(mySchema).parse(content), */
    /*     plugins: exampleSetup({ schema: mySchema }), */
    /*   }), */
    /* }) */
  });
</script>

<main>
  <div class="editor" bind:this={editor} />
  <div style="display: none" id="content" bind:this={content}>
    <h1>hello world</h1>
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
