const convertZeroTimeToLocale = () => {
    const zeroDate = new Date(0);
    const localeHour =
        zeroDate.getHours() > 12 ? zeroDate.getHours() - 12 : `0${zeroDate.getHours()}`;
    const LocaleMinutes =
        zeroDate.getMinutes().toString().length < 2
            ? `0${zeroDate.getMinutes()}`
            : zeroDate.getMinutes();
    const dayOrNight = zeroDate.getHours() > 12 ? 'p.m.' : 'a.m.';

    return `${localeHour}:${LocaleMinutes} ${dayOrNight}`;
};

export default convertZeroTimeToLocale;
