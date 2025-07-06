import React, { useState } from "react";

function App() {
  const [persona, setPersona] = useState({ nombre: "", apellido: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

  return (
    <form>
      <input name="nombre" value={persona.nombre} onChange={handleChange} />
      <input name="apellido" value={persona.apellido} onChange={handleChange} />
      <button>Guardar</button>
    </form>
  );
}

export default App;
