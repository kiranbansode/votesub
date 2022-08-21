const toProperCase = (str: string) => {
    const strGroup = str.toLowerCase().trim().split(' ');
    const result = strGroup.map(
        (singleStr) => singleStr.charAt(0).toUpperCase() + singleStr.slice(1),
    );

    return result.join(' ');
};

export default toProperCase;
