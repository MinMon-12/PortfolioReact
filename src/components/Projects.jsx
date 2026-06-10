/* eslint-disable react-refresh/only-export-components -- project data is co-located for editing */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'

// const loremShort =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.'

// const loremParagraph =
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

export const projects = [
  {
    id: 'd-1',
    type: 'design',
    name: 'Webmart',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/design/Webmart.png`,
    tagline: "WebMart is an e-commerce website designed in Figma and prepared for development. The project focuses on creating a modern online shopping experience with intuitive navigation and a clean user interface.",
    link: 'https://www.figma.com/proto/kseVbomMRdzPZcCJQVFqAj/WebMart?node-id=6-3&p=f&t=cRqjrWfB30eXAQlT-1&scaling=min-zoom&content-scaling=fixed&page-id=6%3A2',
    note: 'This is a figma prototype',
    learningOutcomes: ['Wireframing to high-fidelity prototyping','Color theory','Modern e-commerce design patterns','UI design systems'],
    features: ['Delivery tracking map','Step-by-step checkout navigation','Product browsing experience'],
    technologies: null,
  },
  {
    id: 'd-2',
    type: 'design',
    name: 'Empire Donuts',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/design/EmpireDonuts.png`,
    tagline: "Empire Donuts is my final UI/UX design project. The goal was to improve the customer ordering experience for a blind-box donut business through research-driven design decisions and iterative testing.",
    link: 'https://www.figma.com/proto/O2aCF1bY2RpoimItCfCNYQ/EmpireDonutsPrototype?node-id=1-2&p=f&t=OuNtPJjWIMTGku9Z-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2',
    note: 'This is a figma prototype.',
    learningOutcomes: ['User flow creation', 'Information architecture', 'UI component design', 'User testing', 'Iterative design improvements'],
    features: ['Blind-box donut ordering','Simplified checkout process','User-centered interface','Design documentation'],
    technologies: null,
  },
  {
    id: 'd-3',
    type: 'design',
    name: 'Catitude',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/design/Catitude.png`,
    tagline: "Cattitude is a mobile application designed for cat lovers, providing information about cat breeds, personalities, and behaviors.",
    link: 'https://www.figma.com/proto/FqzBxTo2rCZGge8VhmTiaB/Cattitude?t=EczUOFOBZIo2khAl-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=3-2&starting-point-node-id=80%3A1524&show-proto-sidebar=1',
    note: 'This is a figma prototype',
    learningOutcomes: ['Mobile UI design','User interaction design','Logo design','UX principles','Color theory'],
    features: ['Cat breed information','Behavior insights','Camera detection', 'Mobile-first design'],
    technologies: null,
  },
  {
    id: 'd-4',
    type: 'design',
    name: 'VibeChat',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/design/VibeChat.png`,
    tagline: "VibeChat is an AI-powered chatbot web application design that allows users to engage in conversations with multiple AI personalities for both assistance and entertainment.",
    link: 'https://www.figma.com/proto/bVZcOW7lRNBOoJF4nzglzk/chatBot?node-id=23-10&p=f&t=VCRIbY7UJ7IHNKVr-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=19%3A23&show-proto-sidebar=1',
    note: 'This is a figma prototype',
    learningOutcomes: ['Convert figma design to development'],
    features: ['Dark mode', 'Modern minimalist design'],
    technologies: null,
  },
  {
    id: 'd-5',
    type: 'design',
    name: 'FoodSwift',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/design/FoodSwift.png`,
    tagline: "FoodSwift is a mobile food-ordering application designed to help users quickly discover and order meals through an intuitive interface.",
    link: 'https://www.figma.com/proto/v5Xd9H8RKlBbDxRnbLFnmg/FoodSwift?node-id=1-476&t=AaF2MkAKdifrNw2S-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    note: 'This is a figma prototype',
    learningOutcomes: ['Mobile app design', 'User-centered design', 'UX research'],
    features: ['Food search and filtering','Streamlined ordering flow',],
    technologies: null,
  },
  {
    id: 'dev-1',
    type: 'develop',
    name: 'VibeChat',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/design/VibeChat.png`,
    tagline: "VibeChat is an AI-powered chatbot web application that allows users to engage in conversations with multiple AI personalities for both assistance and entertainment.",
    link: 'https://project-h4kzg.vercel.app/',
    note: "The application is currently optimized for desktop use. Mobile responsiveness is planned for future updates. Username - Min, Password - mingopassword1234",
    learningOutcomes: ['API integration','State management','Authentication', 'Database integration','Full-stack application architecture'],
    features: ['Multiple AI personalities (Assistant, Wizard, LOML, Rapster & GEN-Z','Conversation history','Message deletion','Real-time cloud storage','Dark mode'],
    design: null,
    technologies: ['React','OpenAI API','Firebase Firestore','JavaScript','CSS'],
  },
  {
    id: 'dev-2',
    type: 'develop',
    name: 'Canada Events Finder',
    image: `${import.meta.env.BASE_URL}/projects/projects-thumbnails/develop/CanadaEventsFinder.png`,
    tagline: "Canada Events Finder is a web application that helps users discover concerts, sports events, and other activities happening across Canada through an interactive map interface.",
    link: 'https://minmon-12.github.io/ICS-128_Final_Map-Builder/',
    // note: loremShort,
    learningOutcomes: ['API integration','Interactive maps','Database management','Responsive web development','Event-driven programming'],
    features: ['Interactive event map','Event type filtering','City filtering','User-created custom events','Mobile-responsive design'],
    design: null,
    technologies: ['Vanilla JavaScript','Leaflet Maps','Ticketmaster API','Firebase Firestore','HTML & CSS'],
  },
]

export const projectRows = [
  {
    id: 'design',
    title: 'DESIGN',
    projects: projects.filter((project) => project.type === 'design'),
  },
  {
    id: 'develop',
    title: 'DEVELOP',
    projects: projects.filter((project) => project.type === 'develop'),
  },
]

export const getProjectById = (id) => projects.find((project) => project.id === id)

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
                <Link to={`/project/${project.id}`} className="projects__card-link">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="projects__thumbnail" />
                  ) : (
                    <div className="projects__thumbnail projects__thumbnail--placeholder">
                      <span>Thumbnail</span>
                    </div>
                  )}
                </Link>
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
