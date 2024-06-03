import { ValidationError, useForm } from '@formspree/react';
import './contact.css';
import Lottie from 'lottie-react';
import doneAnimation from '../../animation/done.json';
import contactAnimationDark from '../../animation/contact_dark.json';
import contactAnimationLight from '../../animation/contact_light_2.json';
import { useTheme } from '../../context/ThemeContext';
import LazyLoad from 'react-lazyload';

function Contact() {
  const [state, handleSubmit] = useForm("xoqgdvqy");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className='contact-us'>
      <h1 className='title'>
        <span className='icon-envelope'></span>
        Contact us
      </h1>
      <p className='sub-title'>Contact us for more information and get notified when I publish something new.</p>

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
            <p className='message-sent flex'>
              <Lottie loop={false} animationData={doneAnimation} style={{ height: 37 }} />
              Your message has been sent successfully
            </p>}
        </form>
        <div className="animation">
          <LazyLoad height={355} offset={100}>
            <Lottie
              // animationData={isDark ? contactAnimationDark : contactAnimationLight}
              animationData={contactAnimationDark}
              style={{ height: 355 }} />
          </LazyLoad>
        </div>
      </div>
    </section>
  );
}

export default Contact;
