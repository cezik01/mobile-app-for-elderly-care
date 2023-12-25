export const parseDate = (timestamp: string) => {
    return new Date(parseInt(timestamp, 10));
};

export const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 10));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};
