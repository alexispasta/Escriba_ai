import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './App.css'

function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h1>Mi documento</h1>
      <p>Comienza a escribir aquí...</p>
    `,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">ESCRIBA AI</div>
        <div className="header-actions">
          <button>Nuevo</button>
          <button>Guardar</button>
        </div>
      </header>

      <main className="workspace">
        <div className="editor-container">

          <div className="toolbar">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'active' : ''}
            >
              B
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'active' : ''}
            >
              I
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
            >
              H1
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
            >
              H2
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              • Lista
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1. Lista
            </button>

            <button
              onClick={() => editor.chain().focus().undo().run()}
            >
              ↶
            </button>

            <button
              onClick={() => editor.chain().focus().redo().run()}
            >
              ↷
            </button>
          </div>

          <div className="paper">
            <EditorContent editor={editor} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App