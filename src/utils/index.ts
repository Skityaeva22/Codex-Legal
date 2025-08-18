export const getFileCardStyle = (fileType: string): { [key: string]: string } => {
    switch (fileType) {
        case 'application/pdf':
            return {
                'background-color': '#F56C6C',
            };
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return {
                'background-color': '#409EFF',
            };
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return {
                'background-color': '#67C23A',
            };
        case 'text/markdown':
            return {
                'background-color': '#E6A23C',
            };
        default:
            return {
                'background-color': '#909399',
            };
    }
};

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
        default:
            return "T"
    }
};

export const formatFileSize = (size: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let index = 0;
    let formattedSize = size;

    while (formattedSize >= 1024 && index < units.length - 1) {
        formattedSize /= 1024;
        index++;
    }

    return `${formattedSize.toFixed(2)} ${units[index]}`;
};

