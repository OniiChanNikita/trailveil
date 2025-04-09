import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import "./HomeCart1.css";

const HomeCart = () => {
  const [hovered, setHovered] = useState(null);

  // отслеживаем появление в области видимости
  const [ref, inView] = useInView({
    triggerOnce: true, // анимация только один раз
    threshold: 0.3,    // 20% должно быть видно
  });

  // Анимация fade-in сверху вниз с параллакс-ощущением
  const fadeInSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(-200px)',
    config: { tension: 170, friction: 100 },
  });

  // Hover-анимации с затемнением другой карточки
  const leftSpring = useSpring({
    transform:
      hovered === 'left'
        ? 'translateX(-10%) rotate(-2deg) scale(1.02)'
        : 'translateX(0px) rotate(0deg) scale(1)',
    filter: hovered === 'right' ? 'brightness(0.5)' : 'brightness(1)',
    zIndex: hovered === "left" ? '2' : '1',
    config: { tension: 500, friction: 18, mass: 0 },
  });

  const rightSpring = useSpring({
    transform:
      hovered === 'right'
        ? 'translateX(10%) rotate(2deg) scale(1.02)'
        : 'translateX(0px) rotate(0deg) scale(1)',
    filter: hovered === 'left' ? 'brightness(0.5)' : 'brightness(1)',
    zIndex: hovered === "right" ? '2' : '1',
    config: { tension: 500, friction: 18, mass: 0 },
  });

  return (
    <div className="container" ref={ref}>
      <animated.div
        className="image-box left"
        style={{ ...fadeInSpring, ...leftSpring }}
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
      >
        <img src="/media/opiumcart.jpg" alt="Left" />
      </animated.div>
      <animated.div
        className="image-box right"
        style={{ ...fadeInSpring, ...rightSpring }}
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
      >
        <img src="/media/gorpcart.jpg" alt="Right" />
      </animated.div>
    </div>
  );
};

export default HomeCart;
