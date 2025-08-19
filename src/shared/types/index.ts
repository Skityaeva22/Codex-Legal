export interface Dialog {
    question?: string;
    files?: File[] | [];
    answer?: Answer;
}

export interface File {
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

export interface Answer {
    answer: string;
    sources: string[];
    message?: string | null;
}
