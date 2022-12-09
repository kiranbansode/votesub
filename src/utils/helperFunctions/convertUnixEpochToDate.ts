/**
 * `convertUnixEpochToDate` will convert unix epoch to normal date
 *
 * @param {number} unixEpoch unix epoch in number format. `Seconds` only
 */

const convertUnixEpochToDate = (unixEpoch: number) => {
    const dateObj = new Date(unixEpoch * 1000);
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
    const day = dateObj.getDate();

    /**
     * Calendar Month as per year in number format
     * e.g. 1
     */
    const month = dateObj.getMonth() + 1;
    /**
     * Calendar Month as per year in number format with leading zero
     * e.g. 01
     */
    const monthWithZero =
        `${dateObj.getMonth() + 1}`.length === 2
            ? dateObj.getMonth() + 1
            : `0${dateObj.getMonth() + 1}`;

    /**
     * Calendar Month as per year in full format
     * e.g. January
     */
    const fullMonth = fullMonths[dateObj.getMonth()];

    /**
     * Calendar Month as per year in short format
     * e.g. Jan
     */
    const shortMonth = shortMonths[dateObj.getMonth()];

    /**
     * Calendar Year as per Birth of Christ
     */
    const year = dateObj.getFullYear();

    /**
     * Time as per 12 Hour format `AM/PM`.Time will differ as per local timezone.
     * Code from this link http://stackoverflow.com/a/17538193/3541385
     */
    const time = dateObj.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');

    return {
        /**
         * Calendar Date as per month
         */
        day,
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
        /**
         * Time as per 12 Hour format `AM/PM`.Time will differ as per local timezone.
         * Code from this link http://stackoverflow.com/a/17538193/3541385
         */
        time,
    };
};

export default convertUnixEpochToDate;
