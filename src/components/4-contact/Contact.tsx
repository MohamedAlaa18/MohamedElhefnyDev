import { ValidationError, useForm } from '@formspree/react';
import './contact.css'
import Lottie from 'lottie-react';
import doneAnimation from '../../animation/done.json'
import contactAnimation from '../../animation/contact.json'

function Contact() {
  const [state, handleSubmit] = useForm("xoqgdvqy");

  return (
    <section className='contact-us'>
      <h1 className='title'>
        <span className='icon-envelope'></span>
        Contact us
      </h1>
      <p className='sub-title'>Contact us for more information and get notified when i publish something new.</p>

      <div className="flex">
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            <label htmlFor="email">Email Address:</label>
            <input type="email" name="email" id="email" required autoComplete='off' />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className='flex'>
            <label htmlFor="message">Your message:</label>
            <textarea name="message" id="message" required></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button className='submit' type="submit" disabled={state.submitting}>
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>
          {state.succeeded &&
            <p className='massage-sent flex'>
              <Lottie loop={false} animationData={doneAnimation} style={{ height: 37 }} />
              Your massage has been sent successfully
            </p>}
        </form>
        <div className="animation">
          <Lottie animationData={contactAnimation} style={{ height: 355 }} />
        </div>
      </div>
    </section>
  )
}

export default Contact