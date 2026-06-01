import './About.css'

const timelineRows = [
  {
    id: 'row-1',
    year: '2007 - 2018',
    image:`${import.meta.env.BASE_URL}/about/about-1.jpg`,
    title: 'Early passion',
    text: 'My journey began with a love for video games. Spending hours immersed in various games on my computer, I discovered an early fascination with how games were created and dreamed of developing my own one day.',
    side: 'left',
  },
  {
    id: 'row-2',
    year: '2012 - 2020',
    image:`${import.meta.env.BASE_URL}/about/about-2.jpg`,
    title: 'Building Artistic Foundations',
    text: 'As a kid, I was constantly drawing, whether it was graffiti-style sketches on paper or creative artwork in notebooks and other surfaces I could find. My creativity flourished in these early years, forming the foundation for my later work in digital media.',
    side: 'right',
  },
  {
    id: 'row-3',
    year: '2021 - 2023',
    image:`${import.meta.env.BASE_URL}/about/about-3.jpg`,
    title: 'Exploring Digital Art',
    text: 'When the world slowed down during the COVID-19 pandemic, I took the opportunity to learn digital drawing with Clip Studio and Adobe Illustrator. I practiced creating portraits, logos, and banners through commissions. This period solidified my commitment to combining my technical skills with my artistic passion.',
    side: 'left',
  },
  {
    id: 'row-4',
    year: '2024 - Present',
    image:`${import.meta.env.BASE_URL}/about/about-4.jpg`,
    title: 'Pursuing Interactive Media Development',
    text: "Now, I'm studying Interactive Media Development at Camosun College, a field that lets me bring together my love for programming and digital art. This program aligns perfectly with my interests and skills, setting me on a path to create impactful, interactive media.",
    side: 'right',
  },
  {
    id: 'row-5',
    year: '',
    title: '',
    image:`${import.meta.env.BASE_URL}/about/about-5.png`,
    text: '',
    side: 'none',
  },
]

const About = ()=> {
  return (
    <section className="about" id="about">
      <h2 className="about__heading">About Me</h2>
      <p className="about__subheading">Learn more about me, where I came from and what drives me.</p>

      <div className="about__timeline">
        {timelineRows.map((row) => (
          <article key={row.id} className={`about__row about__row--${row.side}`}>
            <div className="about__text">
              {row.year ? <p className="about__year">{row.year}</p> : null}
              {row.title ? <h3 className="about__title">{row.title}</h3> : null}
              {row.text ? <p className="about__description">{row.text}</p> : null}
            </div>

            <img src={row.image} className="about__circle" type="button" aria-label="Add timeline image" />
          </article>
        ))}
      </div>
    </section>
  )
}

export default About
