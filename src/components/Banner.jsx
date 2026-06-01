import './Banner.css'

const Banner = ()=> {
  return (
    <section className="banner">
      <h1
        className="banner__title"
        data-text="Interactive Media
          Designer &
          Developer"
      >
        Interactive Media
        <br />
        Designer &
        <br />
        Developer
      </h1>

      <div className="banner__meta">
        <p>
          Frontend
          <br />
          Web & Mobile / Ui&Ux
          <br />
          Currently available
          <br />
          Student
        </p>
        <p>
          Based
          <br />
          in Victoria, Canada
          <br />
          Raised in Rangoon
        </p>
      </div>
    </section>
  )
}

export default Banner
