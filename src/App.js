import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("Cargando...");
  const [error, setError] = useState(null);

  // Detecta entorno (dev o prod)
  const ENV = process.env.REACT_APP_ENV || "dev";

  const API_URL =
    ENV === "prod"
      ? "https://7oerw46uwk.execute-api.us-east-1.amazonaws.com/prod"
      : "https://7oerw46uwk.execute-api.us-east-1.amazonaws.com/dev";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la respuesta");
        }
        return res.text();
      })
      .then((data) => {
        setMensaje(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("No se pudo conectar con la API");
      });
  }, [API_URL]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Mi App 🚀</h1>

      <p>
        <strong>Entorno:</strong> {ENV}
      </p>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{mensaje}</p>
      )}
    </div>
  );
}

export default App;