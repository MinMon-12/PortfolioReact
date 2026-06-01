import { useCallback, useRef, useState } from 'react'
import './Contact.css'

const FloatingField = ({ id, label, type = 'text', name, autoComplete }) => {
  return (
    <div className="contact-field">
      <input
        className="contact-field__input"
        id={id}
        name={name}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
      />
      <label className="contact-field__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

const Contact = () => {
  const messageRef = useRef(null)
  const [result, setResult] = useState("");

  const resizeMessage = useCallback(() => {
    const el = messageRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  const handleSubmit = async(event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "f96f4612-8914-47c9-bfe8-6a4d06a9f9bb");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      alert('Message sent');
      event.target.reset();
    } else {
      setResult("Error");
      alert('Message was not sent. Try emailing to mrattmon12@gmail.com');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__box">
        <h2 className="contact__heading">Contact</h2>
        <p className="contact__subheading">
          Please feel free to contact and I will get back to you as soon as I can
        </p>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__row contact__row--split">
            <FloatingField id="contact-name" name="name" label="Name" autoComplete="name" />
            <FloatingField id="contact-email" name="email" label="Email" type="email" autoComplete="email" />
          </div>

          <div className="contact__row">
            <FloatingField id="contact-subject" name="subject" label="Subject" autoComplete="off" />
          </div>

          <div className="contact__row">
            <div className="contact-field contact-field--textarea">
              <textarea
                ref={messageRef}
                className="contact-field__input contact-field__input--textarea"
                id="contact-message"
                name="message"
                placeholder=" "
                rows={3}
                onInput={resizeMessage}
              />
              <label className="contact-field__label" htmlFor="contact-message">
                Message
              </label>
            </div>
          </div>

          <div className="contact__row contact__row--actions">
            <button type="submit" className="contact__send" aria-label="Send message">
              {result==="Sending...." ? <span>{result}</span> : <span>Send</span>}
              {/* <span className="contact__send-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 4L12 20L11 13L4 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span> */}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
