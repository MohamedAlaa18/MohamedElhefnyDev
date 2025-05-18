import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { useTheme } from '../../../context/ThemeContext';
import { useCallback } from 'react';

function ParticlesBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className='particlesContainer'>
      <div className="particlesBackground">
        <Particles
          id="particlePlane"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: true,
              zIndex: -1,
            },
            style: {
              position: 'absolute',
              width: '100%',
              height: '100%',
            },
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 144,
            particles: {
              color: {
                value: isDark ? "rgb(244, 244, 255)" : "rgb(39, 39, 42)",
              },
              links: {
                color: 'var(--primary)',
                distance: 25,
                enable: true,
                opacity: 0.25,
                width: 1,
              },
              move: {
                enable: true,
                random: true,
                direction: "none",
                speed: 0.25,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 16,
              },
              opacity: {
                value: 0.25,
              },
              shape: {
                type: 'star',
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'bubble'
                },
                onClick: {
                  enable: false,
                  mode: 'push'
                },
                resize: true
              },
              modes: {
                push: {
                  quantity: 4
                },
                bubble: {
                  distance: 100,
                  duration: 0.4,
                  // opacity: 0.5,
                  // size: 3.5
                }
              },
            }
          }}
        />
      </div>
    </div>
  );
}

export default ParticlesBackground;
