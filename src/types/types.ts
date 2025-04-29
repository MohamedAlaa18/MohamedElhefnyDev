export interface Project {
    imagPath: string;
    projectTitle: string;
    projectDescription: string;
    demo?: string;
    source?: string;
    video?: string;
    category: string[];
    isFeatured: boolean;
    screenShots: {
        path: string;
        length: number;
    };
}

export interface ProjectsState {
    active: string;
    isFeaturedFilter: boolean;
    hoveredIndex: number;
    descriptionPosition: 'right' | 'left' | 'bottom';
    currentImageIndex: number;
    isModalOpen: boolean;
    screenshots: string[];
    loading: boolean;
    isDropdownOpen: boolean;
    videoUrl: string;
}

export interface Technology {
    label: string;
    svg: string;
    description: string;
    genre: string;
}


export interface labels {
    left: {
        title: string;
        value: string;
        icon: string;
    };
    center: {
        title: string;
        value: string;
        icon: string;
    };
    right: {
        title: string;
        value: string;
        icon: string;
    }
}
