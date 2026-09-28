import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Toolbar from '../Toolbar/Toolbar'
import ContextMenu from '../ContextMenu/ContextMenu'
import AIPanel from '../AI/AIPanel'

import { improveText } from '../../services/aiService'

import './Editor.css'

function Editor() {
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedText, setSelectedText] = useState('')
  const [savedSelection, setSavedSelection] = useState(null)

  const [aiAction, setAiAction] = useState(null)
  const [aiResult, setAiResult] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],

    content: `
      <h1>Mi documento</h1>

      <p>
        Comienza a escribir aquí...
      </p>
    `,
  })

  useEffect(() => {
    const closeMenu = () => {
      setContextMenu(null)
    }

    document.addEventListener('click', closeMenu)

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  if (!editor) {
    return null
  }

  const handleContextMenu = (event) => {
    event.preventDefault()

    const { from, to } = editor.state.selection

    const text = editor.state.doc.textBetween(
      from,
      to,
      ' '
    )

    setSelectedText(text)

    setSavedSelection({
      from,
      to,
    })

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const restoreSelection = () => {
    if (!savedSelection) {
      return
    }

    editor
      .chain()
      .focus()
      .setTextSelection(savedSelection)
      .run()
  }

  const copyText = async () => {
    if (!selectedText) {
      return
    }

    try {
      await navigator.clipboard.writeText(selectedText)
    } catch (error) {
      console.error(
        'No se pudo copiar el texto:',
        error
      )
    }

    restoreSelection()
  }

  const cutText = async () => {
    if (!selectedText || !savedSelection) {
      return
    }

    try {
      await navigator.clipboard.writeText(selectedText)

      restoreSelection()

      editor
        .chain()
        .focus()
        .deleteSelection()
        .run()
    } catch (error) {
      console.error(
        'No se pudo cortar el texto:',
        error
      )
    }
  }

  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText()

      if (!text) {
        return
      }

      restoreSelection()

      editor
        .chain()
        .focus()
        .insertContent(text)
        .run()
    } catch (error) {
      console.error(
        'No se pudo pegar el texto:',
        error
      )
    }
  }

  const openAI = (action) => {
    setContextMenu(null)

    setAiAction(action)
    setAiResult('')
    setAiError('')
    setAiLoading(false)
  }

  const closeAI = () => {
    setAiAction(null)
    setAiResult('')
    setAiError('')
    setAiLoading(false)
  }

  const generateAIResult = async (instruction = '') => {
    setAiLoading(true)
    setAiResult('')
    setAiError('')

    try {
      let result

      if (aiAction === 'improve') {
        result = await improveText(
          selectedText,
          instruction
        )
      } else {
        throw new Error(
          'Esta función estará disponible próximamente.'
        )
      }

      setAiResult(result)
    } catch (error) {
      console.error(error)

      setAiError(
        error.message ||
        'Ocurrió un error al comunicarse con la IA.'
      )
    } finally {
      setAiLoading(false)
    }
  }

  const applyAIResult = () => {
    if (!aiResult || !savedSelection) {
      return
    }

    restoreSelection()

    editor
      .chain()
      .focus()
      .deleteSelection()
      .insertContent(aiResult)
      .run()

    closeAI()
  }

  return (
    <div
      className="editor-container"
      onContextMenu={handleContextMenu}
    >
      <Toolbar editor={editor} />

      <div className="paper">
        <EditorContent editor={editor} />
      </div>

      <ContextMenu
        position={contextMenu}
        selectedText={selectedText}

        onClose={() => setContextMenu(null)}

        onCopy={copyText}
        onCut={cutText}
        onPaste={pasteText}

        onImprove={() => openAI('improve')}

        onCorrect={() => openAI('correct')}

        onSummarize={() => openAI('summarize')}

        onTranslate={() => openAI('translate')}

        onGenerateTitle={() =>
          openAI('title')
        }

        onCreateTable={() =>
          openAI('table')
        }

        onGenerateImage={() =>
          openAI('image')
        }
      />

      <AIPanel
        action={aiAction}
        selectedText={selectedText}
        result={aiResult}
        loading={aiLoading}
        error={aiError}

        onClose={closeAI}

        onGenerate={generateAIResult}

        onApply={applyAIResult}
      />
    </div>
  )
}

export default Editor