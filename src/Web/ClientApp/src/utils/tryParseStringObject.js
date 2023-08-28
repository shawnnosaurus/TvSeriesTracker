export const tryParseStringObject = (str) => {
    try {
        return JSON.parse(str);
    } catch { }

    return undefined;
};