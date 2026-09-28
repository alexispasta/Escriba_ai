import { useState } from 'react'

import './AIPanel.css'

function AIPanel({
  action,
  selectedText,
  result,
  loading,
  error,
  onClose,
  onApply,
  onGenerate,
}) {
  const [instruction, setInstruction] = useState('')

  if (!action) {
    return null
  }

  const actionNames = {
    improve: '✨ Mejorar texto',
    correct: '✓ Corregir texto',
    summarize: '📝 Resumir texto',
    translate: '🌎 Traducir texto',
    title: '🏷️ Generar título',
    table: '📊 Crear tabla',
    image: '🖼️ Generar imagen',
  }

  const actionName = actionNames[action] || 'Asistente IA'

  const handleGenerate = () => {
    onGenerate(instruction)
  }

  return (
    <div className="ai-overlay">
      <section className="ai-panel">

        <div className="ai-panel-header">
          <div>
            <h2>{actionName}</h2>
            <span>ESCRIBA AI</span>
          </div>

          <button
            className="ai-close-button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="ai-panel-content">

          <div className="ai-section">
            <label>Texto seleccionado</label>

            <div className="ai-selected-text">
              {selectedText}
            </div>
          </div>

          {action === 'improve' && (
            <div className="ai-section">
              <label>
                Instrucción adicional
                <span className="optional"> (opcional)</span>
              </label>

              <textarea
                value={instruction}
                onChange={(event) =>
                  setInstruction(event.target.value)
                }
                placeholder="Ejemplo: hazlo más formal..."
                rows="3"
              />
            </div>
          )}

          {loading && (
            <div className="ai-loading">
              <div className="ai-spinner"></div>

              <p>
                ESCRIBA AI está procesando el texto...
              </p>
            </div>
          )}

          {error && (
            <div className="ai-error">
              <strong>No se pudo procesar la solicitud.</strong>

              <p>{error}</p>
            </div>
          )}

          {result && !loading && (
            <div className="ai-section">
              <label>Resultado</label>

              <div className="ai-result">
                {result}
              </div>
            </div>
          )}

        </div>

        <div className="ai-panel-footer">

          <button
            className="ai-secondary-button"
            onClick={onClose}
          >
            Cancelar
          </button>

          {!result && !loading && (
            <button
              className="ai-primary-button"
              onClick={handleGenerate}
            >
              ✨ Generar
            </button>
          )}

          {result && !loading && (
            <button
              className="ai-primary-button"
              onClick={onApply}
            >
              ✓ Aplicar
            </button>
          )}

        </div>

      </section>
    </div>
  )
}

export default AIPanel