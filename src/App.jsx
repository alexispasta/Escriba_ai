import Header from './components/Header/Header'
import Editor from './components/Editor/Editor'

import './App.css'

function App() {
  return (
    <div className="app">

      <Header />

      <main className="workspace">
        <Editor />
      </main>

    </div>
  )
}

export default App