<script>
  import { onMount } from 'svelte'
  import { EditorState } from 'prosemirror-state'
  import { EditorView } from 'prosemirror-view'
  import { Schema, DOMParser } from 'prosemirror-model'
  import { schema } from 'prosemirror-schema-basic'
  import { addListNodes } from 'prosemirror-schema-list'
  import { exampleSetup } from 'prosemirror-example-setup'
  let editor, content
  let view

  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks,
  })

  onMount(() => {
    console.log('mounted')

    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.

    view = new EditorView(editor, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(content),
        plugins: exampleSetup({ schema: mySchema }),
      }),
    })
  })
</script>

<main>
  <div class="editor" bind:this={editor} />
  <div style="display: none" id="content" bind:this={content} />
</main>

<style>
  .editor {
    height: 300px;
    width: 400px;
  }
</style>
