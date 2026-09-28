import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        ESCRIBA AI
      </div>

      <div className="header-actions">
        <button>Nuevo</button>
        <button>Guardar</button>
      </div>
    </header>
  )
}

export default Header