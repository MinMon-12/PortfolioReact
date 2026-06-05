import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProjectMockupSections } from '../data/projectMockups'
import Footer from './Footer'
import { getProjectById } from './Projects'
import './ProjectShowcase.css'

const getMockupColumnCount = (imageCount) => {
  if (imageCount >= 8) {
    return 5
  }

  if (imageCount >= 4) {
    return 4
  }

  return 2
}

const MockupImageSection = ({ section }) => {
  const viewportRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const columnCount = getMockupColumnCount(section.images.length)
  const lastIndex = Math.max(0, section.images.length - 1)

  const updateIndexFromScroll = useCallback(() => {
    if (!viewportRef.current) {
      return
    }

    const slideWidth = viewportRef.current.clientWidth

    if (slideWidth === 0) {
      return
    }

    const scrolledIndex = Math.round(viewportRef.current.scrollLeft / slideWidth)
    setActiveIndex(Math.min(lastIndex, Math.max(0, scrolledIndex)))
  }, [lastIndex])

  useEffect(() => {
    viewportRef.current?.scrollTo({ left: 0 })
    updateIndexFromScroll()
  }, [section.id, section.images.length, updateIndexFromScroll])

  const scrollToIndex = (nextIndex) => {
    if (!viewportRef.current) {
      return
    }

    viewportRef.current.scrollTo({
      left: viewportRef.current.clientWidth * nextIndex,
      behavior: 'smooth',
    })
  }

  const movePrevious = () => {
    scrollToIndex(Math.max(0, activeIndex - 1))
  }

  const moveNext = () => {
    scrollToIndex(Math.min(lastIndex, activeIndex + 1))
  }

  return (
    <section className="project-showcase__section project-showcase__mockups">
      <h2 className="project-showcase__heading">{section.title}</h2>

      <ul
        className={`project-showcase__mockup-grid project-showcase__mockup-grid--cols-${columnCount}`}
      >
        {section.images.map((image) => (
          <li key={image.src} className="project-showcase__mockup-item">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </li>
        ))}
      </ul>

      <div className="project-showcase__mockup-carousel">
        <button
          type="button"
          className="project-showcase__mockup-arrow"
          onClick={movePrevious}
          disabled={activeIndex === 0}
          aria-label={`Previous ${section.title} image`}
        >
          &larr;
        </button>

        <div
          className="project-showcase__mockup-viewport"
          ref={viewportRef}
          onScroll={updateIndexFromScroll}
        >
          <div className="project-showcase__mockup-track">
            {section.images.map((image) => (
              <div key={image.src} className="project-showcase__mockup-slide">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="project-showcase__mockup-arrow"
          onClick={moveNext}
          disabled={activeIndex >= lastIndex}
          aria-label={`Next ${section.title} image`}
        >
          &rarr;
        </button>
      </div>

      <p className="project-showcase__mockup-counter" aria-live="polite">
        {activeIndex + 1} / {section.images.length}
      </p>
    </section>
  )
}

const ProjectShowcase = () => {
  const navigate = useNavigate();
  const { projectId } = useParams()
  const project = getProjectById(projectId)

  if (!project) {
    return (
      <div className="project-showcase">
        <div className="project-showcase__topbar">
          <Link onClick={()=>navigate(-1)} className="project-showcase__back">
            &larr; Home Page
          </Link>
        </div>
        <div className="project-showcase__body">
          <p className="project-showcase__missing">Project not found.</p>
        </div>
        <Footer />
      </div>
    )
  }

  

  const isDesignProject = project.type === 'design'
  const mockupSections = getProjectMockupSections(project.id)

  return (
    <div className="project-showcase">
      <div className="project-showcase__topbar">
        <Link onClick={()=>navigate(-1)} className="project-showcase__back">
          &larr; Home Page
        </Link>
      </div>

      <div className="project-showcase__body">
        <section className="project-showcase__hero">
          <div className="project-showcase__hero-image">
            {project.image ? (
              <img src={project.image} alt={project.name} />
            ) : (
              <div className="project-showcase__image-placeholder">Thumbnail</div>
            )}
          </div>

          <div className="project-showcase__hero-details">
            <div className="project-showcase__hero-row">
              <h1 className="project-showcase__name">{project.name}</h1>
              <p className="project-showcase__tagline">{project.tagline}</p>
            </div>

            <div className="project-showcase__hero-row project-showcase__hero-row--meta">
              <p className="project-showcase__note">{project.note}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-showcase__demo-btn"
              >
                Live Demo
              </a>
            </div>
          </div>
        </section>

        {mockupSections.map((section) => (
          <MockupImageSection key={section.id} section={section} />
        ))}

        <section className="project-showcase__section">
          <h2 className="project-showcase__heading">Overview</h2>
          <p className="project-showcase__text">{project.overview}</p>
        </section>

        <section className="project-showcase__section">
          <h2 className="project-showcase__heading">Insight</h2>
          <p className="project-showcase__text">{project.insight}</p>
        </section>

        <section className="project-showcase__section">
          <h2 className="project-showcase__heading">Features</h2>
          <p className="project-showcase__text">{project.features}</p>
        </section>

        <section className="project-showcase__section">
          {isDesignProject ? (
            <>
              <h2 className="project-showcase__heading">Design</h2>
              <p className="project-showcase__text">{project.design}</p>
            </>
          ) : (
            <>
              <h2 className="project-showcase__heading">Technologies</h2>
              <p className="project-showcase__text">{project.technologies}</p>
            </>
          )}
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default ProjectShowcase
