const OLLAMA_URL = 'http://localhost:11434/api/generate'

const MODEL = 'qwen3:8b'

const prompts = {
  improve: `
Mejora el siguiente texto.

Mantén exactamente la idea original.
Mejora la claridad, fluidez, gramática y redacción.
No agregues información que no esté presente.
No expliques los cambios.
Devuelve únicamente el texto mejorado.
`,

  correct: `
Corrige el siguiente texto.

Corrige ortografía, gramática, puntuación y errores de redacción.
Mantén el significado original.
No agregues información.
Devuelve únicamente el texto corregido.
`,

  summarize: `
Resume el siguiente texto.

Conserva las ideas principales y elimina información innecesaria.
Devuelve únicamente el resumen.
`,

  title: `
Genera un título adecuado para el siguiente texto.

El título debe ser claro, breve y representar correctamente el contenido.
Devuelve únicamente el título.
`,
}

async function runAI(action, text, instruction = '') {
  if (!text || !text.trim()) {
    throw new Error('No hay texto seleccionado.')
  }

  if (!prompts[action]) {
    throw new Error(
      'Esta función de IA todavía no está implementada.'
    )
  }

  let prompt = `${prompts[action]}

Texto:
"""
${text}
"""
`

  if (instruction.trim()) {
    prompt += `

Instrucción adicional del usuario:
"""
${instruction}
"""
`
  }

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
      think: false,
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Ollama respondió con el estado ${response.status}.`
    )
  }

  const data = await response.json()

  if (!data.response) {
    throw new Error(
      'Ollama no devolvió ningún resultado.'
    )
  }

  return data.response.trim()
}

export async function improveText(text, instruction = '') {
  return runAI('improve', text, instruction)
}

export async function correctText(text) {
  return runAI('correct', text)
}

export async function summarizeText(text) {
  return runAI('summarize', text)
}

export async function generateTitle(text) {
  return runAI('title', text)
}