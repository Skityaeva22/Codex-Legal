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