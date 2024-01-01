export const setNameHandler = (
    text: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setName: React.Dispatch<React.SetStateAction<string>>
) => {
    if (/^\d+$/.test(text)) {
        setIsError(true);
    } else {
        setIsError(false);
        setName(text);
    }
};
