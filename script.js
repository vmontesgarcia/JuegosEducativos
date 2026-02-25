// -------- CAMBIAR ENTRE JUEGOS --------
function mostrarJuego(nombre) {
  document.getElementById("sumas").classList.add("oculto");
  document.getElementById("memoria").classList.add("oculto");
  document.getElementById(nombre).classList.remove("oculto");
}

// -------- JUEGO DE SUMAS --------
let num1, num2;
let puntos = 0;

function nuevaPregunta() {
  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
  document.getElementById("pregunta").textContent = `${num1} + ${num2} = ?`;
  document.getElementById("respuesta").value = "";
}

function verificarRespuesta() {
  const respuesta = parseInt(document.getElementById("respuesta").value);

  if (respuesta === num1 + num2) {
    document.getElementById("resultado").textContent = "✅ ¡Correcto!";
    puntos++;
  } else {
    document.getElementById("resultado").textContent = "❌ Intenta otra vez";
  }

  document.getElementById("puntos").textContent = puntos;
  nuevaPregunta();
}

nuevaPregunta();

// -------- JUEGO DE MEMORIA --------
const tablero = document.getElementById("tablero");
const emojis = [
  "🐶", "🐱", "🐭", "🐹",
  "🐰", "🦊", "🐻", "🐼",
  "🐨", "🐯", "🦁", "🐸"
];
let cartas = [...emojis, ...emojis];
let primeraCarta = null;
let bloqueo = false;

cartas.sort(() => Math.random() - 0.5);

cartas.forEach((emoji) => {
  const carta = document.createElement("div");
  carta.classList.add("carta");
  carta.dataset.valor = emoji;
  carta.textContent = "?";

  carta.addEventListener("click", () => {
    if (bloqueo || carta.textContent !== "?") return;

    carta.textContent = emoji;

    if (!primeraCarta) {
      primeraCarta = carta;
    } else {
      if (primeraCarta.dataset.valor === carta.dataset.valor) {
  primeraCarta = null;

  const cartasRestantes = document.querySelectorAll(".carta");
  const todasDescubiertas = [...cartasRestantes].every(
    c => c.textContent !== "?"
  );

  if (todasDescubiertas) {
    setTimeout(() => {
      alert("🎉 ¡Ganaste!");
      location.reload();
    }, 500);
  }
} else {
        bloqueo = true;
        setTimeout(() => {
          carta.textContent = "?";
          primeraCarta.textContent = "?";
          primeraCarta = null;
          bloqueo = false;
        }, 1000);
      }
    }
  });

  tablero.appendChild(carta);
});
