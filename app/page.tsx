import React from "react";
function App() {
  const [persona, setPersona] = useState({});
  return (
    <form>
      <input name="nombre" />
      <input name="apellido" />
      <button>Guardar</button>
    </form>
  );
}
export default App;
