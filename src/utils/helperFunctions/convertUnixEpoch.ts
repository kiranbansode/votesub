/**
 * `convertUnixEpochToDate` will convert unix epoch to normal date
 *
 * @param {number} unixEpoch unix epoch in number format
 */

const convertUnixEpochToDate = (unixEpoch: number) => {
    const dateObj = new Date(unixEpoch * 1000);

    /**
     * Calendar Date as per month
     */
    const day = dateObj.getDate();

    /**
     * Calendar Month as per year
     */
    const month = dateObj.getMonth() + 1;

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
         * Calendar Month as per year
         */
        month,
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
