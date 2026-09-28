import './Toolbar.css'

function Toolbar({ editor }) {
  if (!editor) {
    return null
  }

  return (
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
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={
          editor.isActive('heading', { level: 1 }) ? 'active' : ''
        }
      >
        H1
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={
          editor.isActive('heading', { level: 2 }) ? 'active' : ''
        }
      >
        H2
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        • Lista
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
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
  )
}

export default Toolbar