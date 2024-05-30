export const ringEffect = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        transition: {
            duration: 0.5,
            times: [0, 0.5, 1],
        },
    },
};

export const smoothScaleAnimation = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "linear",
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "linear",
        },
    },
};