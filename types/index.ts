export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    year: number;
    description: string;
    thumbnail: string; 
    demo_url: string;
    tech_stack: string[];
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    icon_url?: string;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    description?: string;
}