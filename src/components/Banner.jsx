import './Banner.css'
import { useEffect } from 'react';

const Banner = ()=> {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${import.meta.env.BASE_URL}finisher-header.es5.min.js`;

    script.onload = () => {
      console.log(window.FinisherHeader);
      new window.FinisherHeader({
        "count": 10,
        "size": {
          "min": 2,
          "max": 40,
          "pulse": 0
        },
        "speed": {
          "x": {
            "min": 0,
            "max": 0.8
          },
          "y": {
            "min": 0,
            "max": 0.2
          }
        },
        "colors": {
          "background": "#e9e9ea",
          "particles": [
            "#ff926b",
            "#87ddfe",
            "#acaaff",
            "#1bffc2",
            "#f9a5fe"
          ]
        },
        "blending": "screen",
        "opacity": {
          "center": 1,
          "edge": 1
        },
        "skew": -1,
        "shapes": [
          "c",
          "s",
          "t"
        ]
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <section className="banner finisher-header">
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
