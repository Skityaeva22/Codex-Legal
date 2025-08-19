export interface Dialog {
    question?: string;
    files?: File[] | [];
    answer?: string;
}

export interface File {
    name: string;
    size: number;
    type: string;
    lastModified: number;
}
