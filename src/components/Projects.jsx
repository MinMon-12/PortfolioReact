import { useEffect, useRef, useState } from 'react'
import './Projects.css'

const getVisibleProjects = () => {
  if (typeof window === 'undefined') {
    return 3
  }

  if (window.innerWidth < 700) {
    return 1
  }

  if (window.innerWidth < 1024) {
    return 2
  }

  return 3
}

const projectRows = [
  {
    id: 'design',
    title: 'DESIGN',
    projects: [
      { id: 'd-1', name: 'Design Project 01', image: `${import.meta.env.BASE_URL}/projects-thumbnails/design/Webmart.png`, link:'https://www.figma.com/proto/kseVbomMRdzPZcCJQVFqAj/WebMart?node-id=6-3&p=f&t=cRqjrWfB30eXAQlT-1&scaling=min-zoom&content-scaling=fixed&page-id=6%3A2' },
      { id: 'd-2', name: 'Design Project 02', image: `${import.meta.env.BASE_URL}/projects-thumbnails/design/EmpireDonuts.png`, link:'https://www.figma.com/proto/O2aCF1bY2RpoimItCfCNYQ/EmpireDonutsPrototype?node-id=1-2&p=f&t=OuNtPJjWIMTGku9Z-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2'},
      { id: 'd-3', name: 'Design Project 03', image: `${import.meta.env.BASE_URL}/projects-thumbnails/design/Catitude.png`,link:'https://www.figma.com/proto/FqzBxTo2rCZGge8VhmTiaB/Cattitude?t=EczUOFOBZIo2khAl-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=3-2&starting-point-node-id=80%3A1524&show-proto-sidebar=1' },
      { id: 'd-4', name: 'Design Project 04', image: `${import.meta.env.BASE_URL}/projects-thumbnails/design/VibeChat.png`,link:'https://www.figma.com/proto/bVZcOW7lRNBOoJF4nzglzk/chatBot?node-id=23-10&p=f&t=VCRIbY7UJ7IHNKVr-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=19%3A23&show-proto-sidebar=1' },
      { id: 'd-5', name: 'Design Project 05', image: `${import.meta.env.BASE_URL}/projects-thumbnails/design/FoodSwift.png`, link:'https://www.figma.com/proto/v5Xd9H8RKlBbDxRnbLFnmg/FoodSwift?node-id=1-476&t=AaF2MkAKdifrNw2S-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1' },
      // { id: 'd-6', name: 'Design Project 06', image: '' },
    ],
  },
  {
    id: 'develop',
    title: 'DEVELOP',
    projects: [
      { id: 'dev-1', name: 'Develop Project 01', image: `${import.meta.env.BASE_URL}/projects-thumbnails/design/VibeChat.png`, link: 'https://project-h4kzg.vercel.app/' },
      { id: 'dev-2', name: 'Develop Project 02', image: `${import.meta.env.BASE_URL}/projects-thumbnails/develop/CanadaEventsFinder.png`, link:'https://minmon-12.github.io/ICS-128_Final_Map-Builder/' },
      // { id: 'dev-3', name: 'Develop Project 03', image: '' },
      // { id: 'dev-4', name: 'Develop Project 04', image: '' },
      // { id: 'dev-5', name: 'Develop Project 05', image: '' },
      // { id: 'dev-6', name: 'Develop Project 06', image: '' },
    ],
  },
]

const ProjectsRow = ({ row }) => {
  const viewportRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [visibleProjects, setVisibleProjects] = useState(getVisibleProjects)

  useEffect(() => {
    const handleResize = () => {
      const nextVisibleProjects = getVisibleProjects()
      const nextMaxIndex = Math.max(0, row.projects.length - nextVisibleProjects)

      setVisibleProjects(nextVisibleProjects)
      setIndex((previous) => Math.min(previous, nextMaxIndex))
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [row.projects.length])

  const maxIndex = Math.max(0, row.projects.length - visibleProjects)
  const currentIndex = Math.min(index, maxIndex)

  const updateIndexFromScroll = () => {
    if (!viewportRef.current) {
      return
    }

    const stepSize = viewportRef.current.clientWidth / visibleProjects

    if (stepSize === 0) {
      return
    }

    const scrolledIndex = Math.round(viewportRef.current.scrollLeft / stepSize)
    setIndex(Math.min(maxIndex, Math.max(0, scrolledIndex)))
  }

  useEffect(() => {
    if (!viewportRef.current) {
      return
    }

    const stepSize = viewportRef.current.clientWidth / visibleProjects

    if (stepSize === 0) {
      return
    }

    const scrolledIndex = Math.round(viewportRef.current.scrollLeft / stepSize)
    setIndex(Math.min(maxIndex, Math.max(0, scrolledIndex)))
  }, [visibleProjects, maxIndex])

  const moveLeft = () => {
    if (!viewportRef.current) {
      return
    }

    const stepSize = viewportRef.current.clientWidth / visibleProjects
    const nextIndex = Math.max(0, currentIndex - 1)

    viewportRef.current.scrollTo({
      left: stepSize * nextIndex,
      behavior: 'smooth',
    })
  }

  const moveRight = () => {
    if (!viewportRef.current) {
      return
    }

    const stepSize = viewportRef.current.clientWidth / visibleProjects
    const nextIndex = Math.min(maxIndex, currentIndex + 1)

    viewportRef.current.scrollTo({
      left: stepSize * nextIndex,
      behavior: 'smooth',
    })
  }

  return (
    <article className="projects__row">
      <h3 className="projects__row-heading">{row.title}</h3>

      <div className="projects__carousel">
        <button
          type="button"
          className="projects__arrow"
          onClick={moveLeft}
          disabled={currentIndex === 0}
          aria-label={`Previous ${row.title.toLowerCase()} project`}
        >
          &larr;
        </button>


        <div className="projects__viewport" ref={viewportRef} onScroll={updateIndexFromScroll}>
          <div className="projects__track">
            {row.projects.map((project) => (
              <div key={project.id} className="projects__card">
                <a target="_blank" href={project.link}>
                {project.image ? (
                  <img src={project.image} alt={project.name} className="projects__thumbnail" />
                ) : (
                  <div className="projects__thumbnail projects__thumbnail--placeholder">
                    <span>Thumbnail</span>
                  </div>
                )}
                </a>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="projects__arrow"
          onClick={moveRight}
          disabled={currentIndex >= maxIndex}
          aria-label={`Next ${row.title.toLowerCase()} project`}
        >
          &rarr;
        </button>
      </div>
    </article>
  )
}

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2 className="projects__heading">PROJECTS</h2>

      <div className="projects__rows">
        {projectRows.map((row) => (
          <ProjectsRow key={row.id} row={row} />
        ))}
      </div>
    </section>
  )
}

export default Projects
