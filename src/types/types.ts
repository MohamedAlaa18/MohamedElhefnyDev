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
    projectsFiltered: Project[];
    hoveredIndex: number;
    descriptionPosition: 'right' | 'left' | 'bottom';
    currentImageIndex: number;
    isModalOpen: boolean;
    screenshots: string[];
    loading: boolean;
    isDropdownOpen: boolean;
    videoUrl: string;
}