'use client'
import { useEffect, useState } from "react";

interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
  fechaNacimiento: string;
}

const initialPersona: Persona = {
  id: 0,
  nombre: "",
  apellido: "",
  edad: 0,
  genero: "Otro",
  fechaNacimiento: ""
};

export default function Home() {
  const [persona, setPersona] = useState<Persona>(initialPersona);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("personas");
    if (datosGuardados) {
      setPersonas(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("personas", JSON.stringify(personas));
  }, [personas]);

  const validarFormulario = (): boolean => {
    const nuevosErrores: string[] = [];

    if (persona.nombre.trim().length < 3) {
      nuevosErrores.push("El nombre debe tener al menos 3 caracteres.");
    }
    if (persona.apellido.trim().length < 3) {
      nuevosErrores.push("El apellido debe tener al menos 3 caracteres.");
    }
    if (persona.edad <= 0) {
      nuevosErrores.push("La edad debe ser mayor que 0.");
    }
    if (!persona.fechaNacimiento) {
      nuevosErrores.push("La fecha de nacimiento es obligatoria.");
    }

    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: name === "edad" ? parseInt(value) : value });
  };

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (editando) {
      const personasActualizadas = personas.map(p => p.id === persona.id ? persona : p);
      setPersonas(personasActualizadas);
      setEditando(false);
    } else {
      const nuevaPersona = { ...persona, id: Date.now() };
      setPersonas([...personas, nuevaPersona]);
    }

    setPersona(initialPersona);
  };

  const handleEditar = (personaSeleccionada: Persona) => {
    setPersona(personaSeleccionada);
    setEditando(true);
  };

  const handleEliminar = (id: number) => {
    const confirmacion = confirm("¿Estás seguro de eliminar esta persona?");
    if (confirmacion) {
      const personasFiltradas = personas.filter(p => p.id !== id);
      setPersonas(personasFiltradas);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{editando ? "Editar Persona" : "Registrar Persona"}</h1>
      <form onSubmit={handleRegistrar} className="space-y-4">
        <input name="nombre" type="text" placeholder="Nombre" value={persona.nombre} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="apellido" type="text" placeholder="Apellido" value={persona.apellido} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="edad" type="number" placeholder="Edad" value={persona.edad} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="genero" value={persona.genero} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        
        <input name="fechaNacimiento" type="date" value={persona.fechaNacimiento} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editando ? "Actualizar" : "Registrar"}
        </button>
      </form>

      {errores.length > 0 && (
        <div className="bg-red-100 p-2 mt-4 rounded text-red-700">
          {errores.map((err, i) => (
            <p key={i}>⚠️ {err}</p>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2">Lista de Personas</h2>
      {personas.length === 0 ? (
        <p>No hay personas registradas.</p>
      ) : (
        <ul className="space-y-2">
          {personas.map(p => (
            <li key={p.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <strong>{p.nombre} {p.apellido}</strong> | Edad: {p.edad} | Género: {p.genero}
                <br />
                Nacido el: {p.fechaNacimiento}
                <br /></div>
              <div className="space-x-2">
                <button onClick={() => handleEditar(p)} className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                <button onClick={() => handleEliminar(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
