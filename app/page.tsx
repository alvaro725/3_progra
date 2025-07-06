import React, { useState } from "react";

interface Persona {
  nombre: string;
  apellido: string;
}

function App() {
  const [persona, setPersona] = useState<Persona>({ nombre: "", apellido: "" });
  const [personas, setPersonas] = useState<Persona[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPersonas([...personas, persona]);
    setPersona({ nombre: "", apellido: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={persona.nombre} onChange={handleChange} />
        <input name="apellido" value={persona.apellido} onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {personas.map((p, i) => (
          <li key={i}>{p.nombre} {p.apellido}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;