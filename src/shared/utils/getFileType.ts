export const getFileType = (fileType: string): string => {
    switch (fileType) {
        case 'application/pdf':
            return "PDF";
        case 'application/msword':
            return "DOC"
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return "DOCX";
        case 'application/vnd.ms-excel':
            return "XLS";
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return "XLSX";
        case 'text/markdown':
            return "MD";
        case 'application/epub+zip':
            return "EPUB";
        case 'application/x-fictionbook+xml':
            return "FB2";
        default:
            return "T"
    }
};
