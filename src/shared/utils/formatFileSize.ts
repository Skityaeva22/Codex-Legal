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
