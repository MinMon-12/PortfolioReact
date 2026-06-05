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

const MockupLightbox = ({ images, index, sectionTitle, onClose, onChangeIndex }) => {
  const lastIndex = images.length - 1

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft') {
        onChangeIndex(Math.max(0, index - 1))
      }

      if (event.key === 'ArrowRight') {
        onChangeIndex(Math.min(lastIndex, index + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, lastIndex, onChangeIndex, onClose])

  const image = images[index]

  return (
    <div
      className="project-showcase__lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${sectionTitle} image viewer`}
    >
      <button
        type="button"
        className="project-showcase__lightbox-backdrop"
        onClick={onClose}
        aria-label="Close image viewer"
      />

      <div className="project-showcase__lightbox-content">
        <button
          type="button"
          className="project-showcase__lightbox-close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          &times;
        </button>

        <button
          type="button"
          className="project-showcase__lightbox-arrow project-showcase__lightbox-arrow--prev"
          onClick={() => onChangeIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          aria-label="Previous image"
        >
          &larr;
        </button>

        <figure className="project-showcase__lightbox-figure">
          <img
            src={image.src}
            alt={image.alt}
            className="project-showcase__lightbox-image"
          />
          <figcaption className="project-showcase__lightbox-caption">
            {image.alt} ({index + 1} / {images.length})
          </figcaption>
        </figure>

        <button
          type="button"
          className="project-showcase__lightbox-arrow project-showcase__lightbox-arrow--next"
          onClick={() => onChangeIndex(Math.min(lastIndex, index + 1))}
          disabled={index >= lastIndex}
          aria-label="Next image"
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}

const MockupImageTrigger = ({ image, onOpen }) => (
  <button type="button" className="project-showcase__mockup-trigger" onClick={onOpen}>
    <img src={image.src} alt={image.alt} loading="lazy" />
  </button>
)

const MockupImageSection = ({ section }) => {
  const viewportRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewerIndex, setViewerIndex] = useState(null)
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

  const openViewer = (index) => {
    setViewerIndex(index)
  }

  const closeViewer = () => {
    setViewerIndex(null)
  }

  return (
    <>
    <section className="project-showcase__section project-showcase__mockups">
      <h2 className="project-showcase__heading">{section.title}</h2>

      <ul
        className={`project-showcase__mockup-grid project-showcase__mockup-grid--cols-${columnCount}`}
      >
        {section.images.map((image, index) => (
          <li key={image.src} className="project-showcase__mockup-item">
            <MockupImageTrigger image={image} onOpen={() => openViewer(index)} />
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
            {section.images.map((image, index) => (
              <div key={image.src} className="project-showcase__mockup-slide">
                <MockupImageTrigger image={image} onOpen={() => openViewer(index)} />
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

    {viewerIndex !== null && (
      <MockupLightbox
        images={section.images}
        index={viewerIndex}
        sectionTitle={section.title}
        onClose={closeViewer}
        onChangeIndex={setViewerIndex}
      />
    )}
    </>
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
