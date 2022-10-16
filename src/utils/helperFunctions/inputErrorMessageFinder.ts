/*
	Author : Kiran Ashok Bansode
	Ex:- ErrorObject = address.country.state.city
------------------------------------------------------------
*	array lenght:		1			2			3		4
					['address', 'country',   'state', 'city']
!	array index :		0			1			2		3
------------------------------------------------------------
*/

import { FieldErrors } from 'react-hook-form';

/**
 * Return an Error Message from error object provided by React-Hook-Form
 * @param inputFieldName - name of field e.g. 'firstName'
 * @param errorObject - error object extracted from useForm hook
 * @returns - an error message
 */

const inputErrorMessageFinder = (inputFieldName: string, errorObject: FieldErrors) => {
    const names: string[] = inputFieldName.split('.');

    /* Solution 1 = Original Solution */
    // let error;
    // if (names.length === 2) {
    //   error = errorObject[names[0]]?.[names[1]]?.message;
    // } else if (names.length === 3) {
    //   error = errorObject[names[0]]?.[names[1]]?.[names[2]]?.message;
    // } else if (names.length === 4) {
    //   error = errorObject[names[0]]?.[names[1]]?.[names[2]]?.[names[3]]?.message;
    // } else if (names.length === 5) {
    //   error = errorObject[names[0]]?.[names[1]]?.[names[2]]?.[names[3]]?.[names[4]]?.message;
    // } else {
    //   error = errorObject[names[0]]?.message;
    // }

    /* Solution 2 */
    const error = {
        // object keys will always be converted to string
        // @ts-ignore
        1: errorObject[names[0]]?.message,
        // @ts-ignore
        2: errorObject[names[0]]?.[names[1]]?.message,
        // @ts-ignore
        3: errorObject[names[0]]?.[names[1]]?.[names[2]]?.message,
        // @ts-ignore
        4: errorObject[names[0]]?.[names[1]]?.[names[2]]?.[names[3]]?.message,
        // @ts-ignore
        5: errorObject[names[0]]?.[names[1]]?.[names[2]]?.[names[3]]?.[names[4]]?.message,
    };

    // @ts-ignore
    return error[names.length];
};

export default inputErrorMessageFinder;
