export const textVariant = {
    initial: {
      opacity: 0,
      y: -20,
    },
    final: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    final2: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.25,
        duration: 0.6,
      },
    },
    final3: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  };

  export const leftVariant = {
    initial: {
      opacity: 0,
      x: -100,
    },
    final: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    final2: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.125,
        duration: 0.5,
      },
    },
    final3: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.25,
        duration: 0.5,
      },
    },
  };

  export const moodVariant = {
    initial: {
      opacity: 0,
      y: -20,
    },
    final: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      opacity: 1,
      y: -20,
      transition: {
        duration: 0.25,
      },
    },
  };

  export const contVariant = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1.05, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  export const parentVariant = {
    initial: {},
    final: {
      transition: {
        staggerChildren: 0.1, // Adjust the delay between children animations
      },
    },
  };

  