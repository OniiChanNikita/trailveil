import React from 'react';
import { useSpring, animated } from 'react-spring';

const Header = () => {

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0px)' }, 
    config: { tension: 50, friction: 100 },
  });

  const [props, set] = useSpring(() => ({
    y: 0,
    config: { tension: 40, friction: 15 }
  }));

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset;
      set({ y: offset * 0.5 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [set]);



  return (
    <header className="header">
      <div className = 'headerDiv'>
      <animated.img
        src="/media/gray_big_stone1.png"
        alt="Mountain 1"
        style={{
          ...fadeIn,
          transform: props.y.to((y) => `translateX(${y*0.5}px)`)
        }}
        className="mountain"
      />
      <animated.img
        src="/media/bg-home.jpg" //https://i.pinimg.com/1200x/ce/d0/8f/ced08fca1cfc1e746f2c6211e3adf6eb.jpg
        alt="Person"
        /*style={{
          transform: props.y.to((y) => `translateX(${y * 0.2}px)`)
        }}*/
        className="bg-home"
      />
      <animated.img
        src="/media/gray_small_stone1.png"
        alt="Mountain 2"
        style={{
          ...fadeIn,
          transform: props.y.to((y) => `translateX(${y}px)`)
        }}
        className="mountain small-stone"
      />
      </div>
    </header>
  );
};

export default Header;
