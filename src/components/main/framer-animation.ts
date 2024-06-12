export const smoothScaleAnimation = {
    hidden: {
        transform: 'scale(0.75)',
        opacity: 0,
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        transform: 'scale(0)',
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

export const ringEffect = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        transition: {
            delay: 0,
            duration: 0.6,
            ease: 'easeInOut',
            times: [0, 0.6, 1],
        },
    },
};

export const markerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
};