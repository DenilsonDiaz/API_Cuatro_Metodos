import './style.css'

const services = [
  {
    icon: '📚',
    title: 'Cursos',
    description: 'Consulta los cursos disponibles y organiza tu carga académica.',
  },
  {
    icon: '🗓️',
    title: 'Horarios',
    description: 'Revisa tus clases, salones y actividades de la semana.',
  },
  {
    icon: '📝',
    title: 'Inscripciones',
    description: 'Realiza el proceso de inscripción de forma rápida y ordenada.',
  },
  {
    icon: '🎓',
    title: 'Calificaciones',
    description: 'Visualiza tus notas y el avance de cada curso inscrito.',
  },
]

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <div class="container nav-container">
      <a class="brand" href="#inicio" aria-label="Ir al inicio">
        <span class="brand-mark">U</span>
        <span>Portal Universitario</span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#informacion">Información</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero" id="inicio">
      <div class="container hero-content">
        <div>
          <p class="eyebrow">Ciclo académico 2026</p>
          <h1>Todo lo que necesitas para avanzar en tus estudios</h1>
          <p class="hero-text">
            Accede a información académica, cursos e inscripciones desde un solo lugar.
          </p>
          <a class="primary-button" href="#servicios">Ver servicios</a>
        </div>
        <aside class="status-card" aria-label="Estado del portal">
          <span class="status-dot"></span>
          <p>Portal disponible</p>
          <strong>24 horas</strong>
          <small>Contenido distribuido mediante CloudFront</small>
        </aside>
      </div>
    </section>

    <section class="services section" id="servicios">
      <div class="container">
        <p class="section-label">Servicios</p>
        <h2>Gestiones académicas</h2>
        <div class="card-grid">
          ${services
            .map(
              ({ icon, title, description }) => `
                <article class="service-card">
                  <span class="service-icon" aria-hidden="true">${icon}</span>
                  <h3>${title}</h3>
                  <p>${description}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="info-section section" id="informacion">
      <div class="container info-grid">
        <div>
          <p class="section-label">Información</p>
          <h2>Un portal rápido y disponible</h2>
          <p>
            Este sitio fue construido con Vite y se publica automáticamente en AWS
            por medio de GitHub Actions.
          </p>
        </div>
        <div class="facts">
          <div><strong>Vite</strong><span>Construcción</span></div>
          <div><strong>S3</strong><span>Almacenamiento</span></div>
          <div><strong>CloudFront</strong><span>Distribución</span></div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container footer-content">
      <p>Portal Universitario</p>
      <p>Proyecto de deployment · <span id="current-year"></span></p>
    </div>
  </footer>
`

document.querySelector('#current-year').textContent = new Date().getFullYear()
