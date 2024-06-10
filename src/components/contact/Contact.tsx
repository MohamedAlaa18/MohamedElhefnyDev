import { ValidationError, useForm } from '@formspree/react';
import './contact.css';
import Lottie from 'lottie-react';
import doneAnimation from '../../../public/animation/done.json';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
      const darkAnimation = await import('../../../public/animation/contact_dark.json');
      const lightAnimation = await import('../../../public/animation/contact_light.json');
      setPreloaded({ dark: darkAnimation.default, light: lightAnimation.default });
    };
    preloadAnimations();
  }, []);

  // Determine the current animation based on the theme
  const currentAnimation = isDark ? preloaded.dark : preloaded.light;

  return (
    <section className='contact-us'>
      <h1 className='title flex'>
        <i className='icon-envelope' />
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

          <motion.button
            className='submit flex'
            type="submit"
            disabled={state.submitting}
            whileHover="hover"
          >
            <span>{state.submitting ? "Sending ..." : "Send"}</span>
            &nbsp;
            <motion.i
              className='icon-send'
              variants={{
                hover: { scale: 1.1, rotate: 45 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
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
