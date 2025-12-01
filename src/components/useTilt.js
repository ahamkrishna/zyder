
import React from 'react';

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!active) {
      return;
    }

    const el = ref.current;
    if (!el) {
      return;
    }

    const handleMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      const rotateX = (y - 0.5) * 20;
      const rotateY = (x - 0.5) * -20;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseleave',handleLeave);
      }
    };
  }, [active]);

  return ref;
}

export default useTilt;
