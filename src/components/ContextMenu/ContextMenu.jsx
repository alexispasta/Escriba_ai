import './ContextMenu.css'

function ContextMenu({
  position,
  selectedText,
  onClose,
  onImprove,
  onCorrect,
  onSummarize,
  onTranslate,
  onGenerateTitle,
  onCreateTable,
  onGenerateImage,
  onCopy,
  onCut,
  onPaste,
}) {
  if (!position) {
    return null
  }

  const hasSelection = selectedText.trim().length > 0

  const handleAction = (action) => {
    action()
    onClose()
  }

  return (
    <div
      className="context-menu"
      style={{
        top: position.y,
        left: position.x,
      }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <button
        className="context-menu-item"
        onClick={() => handleAction(onCut)}
        disabled={!hasSelection}
      >
        ✂️ Cortar
      </button>

      <button
        className="context-menu-item"
        onClick={() => handleAction(onCopy)}
        disabled={!hasSelection}
      >
        📋 Copiar
      </button>

      <button
        className="context-menu-item"
        onClick={() => handleAction(onPaste)}
      >
        📌 Pegar
      </button>

      <div className="context-menu-separator" />

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onImprove)}
        disabled={!hasSelection}
      >
        ✨ Mejorar
      </button>

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onCorrect)}
        disabled={!hasSelection}
      >
        ✓ Corregir
      </button>

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onSummarize)}
        disabled={!hasSelection}
      >
        📝 Resumir
      </button>

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onTranslate)}
        disabled={!hasSelection}
      >
        🌎 Traducir
      </button>

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onGenerateTitle)}
        disabled={!hasSelection}
      >
        🏷️ Generar título
      </button>

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onCreateTable)}
        disabled={!hasSelection}
      >
        📊 Crear tabla
      </button>

      <button
        className="context-menu-item ai-item"
        onClick={() => handleAction(onGenerateImage)}
        disabled={!hasSelection}
      >
        🖼️ Generar imagen
      </button>
    </div>
  )
}

export default ContextMenu