import './Cv.css'

const Cv = () => {
  return (
    <section className="cv" id="cv" aria-label="Curriculum Vitae">
      <h2 className="cv__heading">Curriculum Vitae</h2>
      <p className="cv__subheading">Please find my most recent below</p>

      <div className="cv__grid">
        <aside className="cv__left">
          <img className="cv__photo" src={`${import.meta.env.BASE_URL}cv/cv-photo.png`} alt="Min Mon portrait" />

          <div className="cv__contact">
            <p>Mrattmon12@gmail.com</p>
            <p>Victoria, British Columbia</p>
          </div>

          <section className="cv__panel cv__panel--interests">
            <h3>Personal Interests</h3>
            <ul>
              <li>3D Modeling</li>
              <li>Animation</li>
              <li>Game Development</li>
            </ul>
          </section>
        </aside>

        <div className="cv__right">
          <section className="cv__panel">
            <h3>Profile</h3>
            <p>
              I&apos;m Min Mon, a 23-year-old Interactive Media Development student with a passion for blending
              creativity with technology. Currently, I&apos;m studying at Camosun College, where I&apos;m refining my
              skills in programming, interactive design, and multimedia technology. I aim to bridge the worlds of
              art and interactivity, using both traditional and digital skills to create impactful user experiences.
              Driven by curiosity and adaptability, I&apos;m continuously seeking opportunities to innovate and bring
              ideas to life in the digital landscape.
            </p>
          </section>

          <section className="cv__panel">
            <h3>Education</h3>
            <p className="cv__meta">Current</p>
            <p>Interactive media developer - Camosun college</p>
          </section>

          <section className="cv__panel">
            <h3>Experience</h3>
            <p className="cv__meta">August 2023 - August 2024</p>
            <p className="cv__meta">City Holdings - Mobile &amp; Web Development Intern</p>
            <div className="cv__two-col">
              <div>
                <p className="cv__col-title">Projects</p>
                <ul>
                  <li>Redesign City Rewards Mobile Application</li>
                  <li>Implement Single Sign On</li>
                </ul>
              </div>
              <div>
                <p className="cv__col-title">Tech-Stack</p>
                <ul>
                  <li>React</li>
                  <li>Django</li>
                  <li>PostgreSQL</li>
                  <li>AWS</li>
                  <li>Azure</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="cv__panel">
            <h3>Technical Skills</h3>
            <div className="cv__three-col">
              <ul>
                <li>Figma</li>
                <li>Adobe Illustrator</li>
                <li>Adobe Indesign</li>
                <li>Canva</li>
                <li>Procreate</li>
              </ul>
              <ul>
                <li>HTML &amp; CSS</li>
                <li>Bootstrap</li>
                <li>Vanilla JavaScript</li>
                <li>MySQL</li>
                <li>.NET (C#)</li>
              </ul>
              <ul>
                <li>React</li>
                <li>React Native</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Cv
