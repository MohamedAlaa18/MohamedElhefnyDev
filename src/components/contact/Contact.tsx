import { ValidationError, useForm } from '@formspree/react';
import './contact.css';
import Lottie from 'lottie-react';
import doneAnimation from '../../animation/done.json';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnimationData = any;

export default function Contact() {
  const [state, handleSubmit] = useForm("xoqgdvqy");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Preload animations
  const [preloaded, setPreloaded] = useState<{ dark: AnimationData | null; light: AnimationData | null }>({
    dark: null,
    light: null,
  });

  useEffect(() => {
    const preloadAnimations = async () => {
      const darkAnimation = await import('../../animation/contact_dark.json');
      const lightAnimation = await import('../../animation/contact_light.json');
      setPreloaded({ dark: darkAnimation.default, light: lightAnimation.default });
    };
    preloadAnimations();
  }, []);

  // Determine the current animation based on the theme
  const currentAnimation = isDark ? preloaded.dark : preloaded.light;


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
          {currentAnimation && (
            <Lottie animationData={currentAnimation} style={{ height: 355 }} />
          )}
        </div>
      </div>
    </section>
  );
}
