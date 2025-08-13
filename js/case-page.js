// Lógica específica para páginas de casos de estudio con ejercicios
(function() {
  // Datos embebidos del caso para evitar dependencias de archivos JSON externos
  const CASE_DATA = {
    titulo: 'Caso de Estudio 01 - FNCG',
    descripcion: 'Ejercicios del Caso 01 basados en el documento PDF proporcionado.',
    fuente: '../assets/docs/Caso01/C1-FNCG.pdf',
    ejercicios: [
      {
        id: 'ej1',
        titulo: 'Ejercicio 1',
        objetivo: 'Descripción breve del objetivo del ejercicio 1.',
        enunciado: 'Coloca aquí el enunciado del ejercicio 1.',
        pistas: ['Pista 1', 'Pista 2'],
        solucion: 'Espacio reservado para la solución o conclusiones del ejercicio 1.',
        recursos: []
      },
      {
        id: 'ej2',
        titulo: 'Ejercicio 2',
        objetivo: 'Descripción breve del objetivo del ejercicio 2.',
        enunciado: 'Coloca aquí el enunciado del ejercicio 2.',
        pistas: ['Pista 1'],
        solucion: 'Espacio reservado para la solución o conclusiones del ejercicio 2.',
        recursos: []
      },
      {
        id: 'ej3',
        titulo: 'Ejercicio 3',
        objetivo: 'Descripción breve del objetivo del ejercicio 3.',
        enunciado: 'Coloca aquí el enunciado del ejercicio 3.',
        pistas: [],
        solucion: 'Espacio reservado para la solución o conclusiones del ejercicio 3.',
        recursos: []
      }
    ]
  };

  document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('case-title');
    const descEl = document.getElementById('case-description');
    const sourceEl = document.getElementById('case-source');
    const tocList = document.getElementById('case-toc-list');
    const exercisesContainer = document.getElementById('case-exercises');

    // Aplicar metadatos del caso
    if (CASE_DATA.titulo && titleEl) titleEl.textContent = CASE_DATA.titulo;
    if (CASE_DATA.descripcion && descEl) descEl.textContent = CASE_DATA.descripcion;
    if (CASE_DATA.fuente && sourceEl) sourceEl.href = CASE_DATA.fuente;

    // Renderizar TOC y contenido
    if (Array.isArray(CASE_DATA.ejercicios)) {
      tocList.innerHTML = CASE_DATA.ejercicios.map((e, idx) => `
        <li><a href="#${e.id || `ej${idx+1}`}">${e.titulo || `Ejercicio ${idx+1}`}</a></li>
      `).join('');

      const ids = CASE_DATA.ejercicios.map((e, idx) => e.id || `ej${idx+1}`);
      exercisesContainer.innerHTML = CASE_DATA.ejercicios.map((e, idx) => renderExerciseSection(e, idx, ids)).join('');
    }

    // Smooth scroll para enlaces del TOC
    tocList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        const targetId = a.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  });

  function renderExerciseSection(e, idx, ids) {
    const id = e.id || `ej${idx+1}`;
    const titulo = e.titulo || `Ejercicio ${idx+1}`;
    const objetivo = e.objetivo || '';
    const enunciado = e.enunciado || '';
    const pistas = Array.isArray(e.pistas) ? e.pistas : [];
    const solucion = e.solucion || '';
    const recursos = Array.isArray(e.recursos) ? e.recursos : [];

    return `
      <section id="${id}" class="exercise-section">
        <header class="exercise-header">
          <h2 class="exercise-title">${titulo}</h2>
          ${objetivo ? `<p class="exercise-objective"><strong>Objetivo:</strong> ${objetivo}</p>` : ''}
        </header>
        ${enunciado ? `<div class="exercise-statement"><h3>Enunciado</h3><p>${enunciado}</p></div>` : ''}
        ${pistas.length ? `<div class="exercise-hints"><h3>Pistas</h3><ul>${pistas.map(p=>`<li>${p}</li>`).join('')}</ul></div>`: ''}
        ${solucion ? `<div class="exercise-solution"><h3>Solución / Conclusiones</h3><p>${solucion}</p></div>` : ''}
        ${recursos.length ? `<div class="exercise-resources"><h3>Recursos</h3><ul>${recursos.map(r=>renderResource(r)).join('')}</ul></div>`: ''}
        <div class="exercise-nav">
          ${idx>0 ? `<a class=\"btn\" href=\"#${ids[idx-1]}\">Anterior</a>` : ''}
          <a class=\"btn\" href=\"#top\">Volver arriba</a>
          ${idx < ids.length-1 ? `<a class=\"btn\" href=\"#${ids[idx+1]}\">Siguiente</a>` : ''}
        </div>
      </section>
    `;
  }

  function renderResource(r) {
    if (typeof r === 'string') {
      return `<li><a href="${r}" target="_blank">${r}</a></li>`;
    }
    if (r && r.url) {
      const text = r.text || r.url;
      return `<li><a href="${r.url}" target="_blank">${text}</a></li>`;
    }
    return '';
  }
})();
