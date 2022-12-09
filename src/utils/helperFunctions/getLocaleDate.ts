const getLocaleDate = () => {
    const localeDate = new Date();
    const fullMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    /**
     * Calendar Date as per month
     */
    const date = localeDate.getDate();

    /**
     * Calendar Month as per year in number format
     * e.g. 1
     */
    const month = localeDate.getMonth() + 1;
    /**
     * Calendar Month as per year in number format with leading zero
     * e.g. 01
     */
    const monthWithZero =
        `${localeDate.getMonth() + 1}`.length === 2
            ? localeDate.getMonth() + 1
            : `0${localeDate.getMonth() + 1}`;

    /**
     * Calendar Month as per year in full format
     * e.g. January
     */
    const fullMonth = fullMonths[localeDate.getMonth()];

    /**
     * Calendar Month as per year in short format
     * e.g. Jan
     */
    const shortMonth = shortMonths[localeDate.getMonth()];

    /**
     * Calendar Year as per Birth of Christ
     */
    const year = localeDate.getFullYear();

    return {
        /**
         * Calendar Date as per month
         */
        date,
        /**
         * Calendar Month as per year in number format
         * e.g. 1
         */
        month,
        /**
         * Calendar Month as per year in number format with leading zero
         * e.g. 01
         */
        monthWithZero,
        /**
         * Calendar Month as per year in full format
         * e.g. January
         */
        fullMonth,
        /**
         * Calendar Month as per year in short format
         * e.g. Jan
         */
        shortMonth,
        /**
         * Calendar Year since Birth of Christ
         */
        year,
    };
};

export default getLocaleDate;
