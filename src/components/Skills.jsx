import './Skills.css'

const slides = [
  {
    id: 'design',
    title: 'Design',
    subtitle: 'A bridge between business goal and user needs',
    details: [
      'Full Design Process',
      'From understanding problems to refining solutions',
      // 'User journeys -> Information Architecture -> User flow -> User testing -> Improvements',
    ],
    tools: ['Adobe Illustrator', 'Adobe Indesign', 'Figma', 'Canva', 'Chatgpt', 'Gemeni'],
  },
  {
    id: 'develop',
    title: 'Develop',
    subtitle: 'Turning concepts into functional and scalable products',
    details: [
      'Frontend Development Process',
      'From prototype to production-ready application',
      // 'Planning -> Component architecture -> Development -> Testing -> Deployment',
    ],
    groups: {
      Languages: ['HTML/CSS', 'JavaScript'],
      Frameworks: ['React', 'React Native', 'Bootstrap'],
      Tools: ['Chatgpt', 'Cursor'],
    },
  },
]

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="skills__heading">SKILLS</h2>

      <div className="skills__grid">
        {slides.map((slide) => (
          <article key={slide.id} className="skills__column">
            <div className="skills__hero">
              <h3 className={`skills__title ${slide.id === 'design' ? 'skills__title--design' : 'skills__title--develop'}`}>
                {slide.title}
              </h3>
              <p className="skills__subtitle">{slide.subtitle}</p>
            </div>

            <div className="skills__content">
              <div>
                {slide.details.map((line) => (
                  <p key={line} className="skills__line">
                    {line}
                  </p>
                ))}
              </div>

              {slide.id === 'develop' ? (
                <div className="skills__groups-container">
                  {Object.entries(slide.groups).map(([groupTitle, items]) => (
                    <div key={groupTitle} className="skills__group-column">
                      <p className="skills__line">{groupTitle}</p>
                      <ul className="skills__tools">
                        {items.map((item) => (
                          <li key={item}><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="skills__tools-container">
                  <p className="skills__line">Tools</p>
                  <ul className={`skills__tools ${slide.id === 'design' ? 'skills__tools--design' : ''}`}>
                    {slide.tools.map((tool) => (
                      <li key={tool}><span>{tool}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
