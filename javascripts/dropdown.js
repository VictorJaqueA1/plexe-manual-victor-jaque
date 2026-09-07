/* Menu desplegable de la pestana "Ejemplos".

   Se abre con un clic, no al posar el cursor. Como "Ejemplos" es un
   enlace, el clic cancela la navegacion: su unica funcion pasa a ser
   abrir y cerrar el menu.

   El estado vive en la clase .mp-drop--abierto sobre el <li>; el CSS
   de docs/stylesheets/extra.css decide que mostrar segun esa clase. */

document.addEventListener("DOMContentLoaded", function () {
  var drop = document.querySelector(".mp-drop");
  if (!drop) return;

  var boton = drop.querySelector(".md-tabs__link");
  if (!boton) return;

  function abrir()  { drop.classList.add("mp-drop--abierto");    boton.setAttribute("aria-expanded", "true");  }
  function cerrar() { drop.classList.remove("mp-drop--abierto"); boton.setAttribute("aria-expanded", "false"); }

  boton.setAttribute("aria-haspopup", "true");
  boton.setAttribute("aria-expanded", "false");

  /* Clic sobre la pestana: abre o cierra, y no navega. */
  boton.addEventListener("click", function (evento) {
    evento.preventDefault();
    if (drop.classList.contains("mp-drop--abierto")) { cerrar(); } else { abrir(); }
  });

  /* Un clic en cualquier otro punto de la pagina cierra el menu. */
  document.addEventListener("click", function (evento) {
    if (!drop.contains(evento.target)) cerrar();
  });

  /* La tecla Escape tambien lo cierra. */
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") cerrar();
  });

  /* Al elegir un caso el menu se cierra solo. */
  Array.prototype.forEach.call(
    drop.querySelectorAll(".mp-drop__menu a"),
    function (enlace) { enlace.addEventListener("click", cerrar); }
  );
});
