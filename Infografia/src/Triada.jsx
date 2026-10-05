import { useState } from "react";
import "./Triada.css";

const PILARES = [
  {
    id: "c", nombre: "Confidencialidad", sigla: "C", color: "#5b3fd1", x: 50, y: 12,
    idea: "Solo accede a la información quien está autorizado a hacerlo.",
    detalle: "Protege la información de miradas indebidas. Se pierde cuando alguien sin permiso la ve, la copia o la difunde, aunque no la modifique.",
    ejemplo: "La ficha de un cliente solo la puede ver el área de atención, no cualquier funcionario.",
    amenazas: ["Phishing y robo de credenciales", "Filtración de datos por un empleado", "Equipos perdidos o robados sin cifrado"],
    controles: ["Contraseñas robustas y doble factor", "Cifrado de discos y comunicaciones", "Permisos por rol (mínimo privilegio)"],
    pregunta: "¿Quién puede ver esto y por qué?",
  },
  {
    id: "i", nombre: "Integridad", sigla: "I", color: "#0e8f7a", x: 12, y: 84,
    idea: "La información es exacta, completa y no se altera sin autorización.",
    detalle: "Garantiza que los datos son confiables. Se pierde cuando se modifican, borran o corrompen, ya sea por error humano o por un ataque.",
    ejemplo: "Un saldo bancario no puede cambiar sin dejar un registro de quién lo hizo y cuándo.",
    amenazas: ["Modificación no autorizada de datos", "Errores de digitación o de procesos", "Malware que corrompe archivos"],
    controles: ["Respaldos verificados", "Firmas digitales y hashes", "Bitácoras y control de versiones"],
    pregunta: "¿Puedo confiar en que este dato es el correcto?",
  },
  {
    id: "d", nombre: "Disponibilidad", sigla: "D", color: "#c27c00", x: 88, y: 84,
    idea: "La información y los sistemas funcionan cuando se necesitan.",
    detalle: "Asegura el acceso oportuno. Se pierde cuando un sistema cae, un servicio se satura o los datos quedan inaccesibles, aunque estén intactos.",
    ejemplo: "El sistema de atención debe responder durante todo el horario laboral.",
    amenazas: ["Ataques de denegación de servicio (DDoS)", "Ransomware que bloquea los datos", "Fallas de hardware o cortes de energía"],
    controles: ["Redundancia y servidores de respaldo", "Plan de continuidad del negocio", "UPS y mantenimiento preventivo"],
    pregunta: "¿Podré acceder cuando lo necesite?",
  },
];

const INCIDENTES = [
  ["Un correo falso roba la clave de una jefatura", ["c"]],
  ["Alguien cambia las notas en una base de datos", ["i"]],
  ["Un ransomware cifra todos los archivos de la empresa", ["d", "c"]],
  ["Un ataque DDoS deja la web fuera de servicio", ["d"]],
  ["Se pierde un notebook sin cifrar con datos de clientes", ["c", "d"]],
  ["Un error de digitación altera el monto de una factura", ["i"]],
];

const porId = (id) => PILARES.find((p) => p.id === id);

export default function Triada() {
  const [activo, setActivo] = useState("c");
  const p = porId(activo);

  return (
    <main className="triada" style={{ "--acento": p.color }}>
      <header className="hero">
        <h1>La tríada CID de la seguridad de la información</h1>
        <p>
          Todo programa de seguridad parte de tres preguntas: quién puede ver la información, si es confiable y si está
          disponible cuando se necesita. Toca un vértice para explorar cada pilar.
        </p>
      </header>

      <section className="explorador">
        <div className="figura">
          <svg viewBox="0 0 100 100" role="img" aria-label="Triángulo con Confidencialidad, Integridad y Disponibilidad">
            <polygon points="50,12 12,84 88,84" className="tri" />
            <text x="50" y="62" textAnchor="middle" className="centro">Información</text>
            <text x="50" y="68" textAnchor="middle" className="centro-sub">protegida</text>
            {PILARES.map((n) => (
              <g key={n.id} className={"nodo" + (n.id === activo ? " nodo--activo" : "")} tabIndex={0} role="button"
                aria-pressed={n.id === activo} aria-label={n.nombre} onClick={() => setActivo(n.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActivo(n.id)}>
                <circle cx={n.x} cy={n.y} r="9" fill={n.color} />
                <text x={n.x} y={n.y + 3.2} textAnchor="middle" className="sigla">{n.sigla}</text>
              </g>
            ))}
          </svg>
          <div className="leyenda">
            {PILARES.map((n) => (
              <button key={n.id} className={n.id === activo ? "activo" : ""} style={{ "--c": n.color }} onClick={() => setActivo(n.id)}>
                {n.nombre}
              </button>
            ))}
          </div>
        </div>
        <article className="resumen" aria-live="polite">
          <h2>{p.nombre}</h2>
          <p className="idea">{p.idea}</p>
          <p className="pregunta">{p.pregunta}</p>
        </article>
      </section>

      <section className="pilares">
        <h2 className="seccion">Cada pilar en detalle</h2>
        {PILARES.map((n) => (
          <article key={n.id} className="pilar" style={{ "--c": n.color }}>
            <div className="pilar__cab">
              <span className="pilar__sigla">{n.sigla}</span>
              <div>
                <h3>{n.nombre}</h3>
                <p>{n.detalle}</p>
              </div>
            </div>
            <p className="pilar__ej"><strong>Ejemplo:</strong> {n.ejemplo}</p>
            <div className="pilar__listas">
              <div>
                <h4>Amenazas frecuentes</h4>
                <ul>{n.amenazas.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
              <div>
                <h4>Controles que ayudan</h4>
                <ul>{n.controles.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="incidentes">
        <h2 className="seccion">¿Qué pilar afecta cada incidente?</h2>
        <p className="sub">Un mismo incidente puede dañar más de un pilar.</p>
        <ul>
          {INCIDENTES.map(([texto, ids]) => (
            <li key={texto}>
              <span>{texto}</span>
              <span className="chips">
                {ids.map((id) => (
                  <b key={id} style={{ background: porId(id).color }} title={porId(id).nombre}>{porId(id).sigla}</b>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cierre">
        <h2 className="seccion">El equilibrio entre los tres</h2>
        <p>
          Reforzar un pilar puede debilitar otro. Cifrar y exigir más validaciones mejora la confidencialidad, pero
          puede dificultar el acceso de quien sí está autorizado. Por eso la gestión de riesgos busca el equilibrio
          adecuado según el valor de cada activo, y no el máximo de protección en todo.
        </p>
      </section>
    </main>
  );
}