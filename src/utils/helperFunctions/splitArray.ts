/**
 * `splitArray` function will split given array in provided chunksize
 * and return an array which contains all chunked array.
 *
 * @author Kiran A. Bansode <kiran5120135@gmail.com> <czar.kiran@gmail.com>
 *
 * @param {Array} arr - Any Array to be chunked
 * @param {number} chunkSize - by how many element given array should be chunked
 * @return {Array[]} an array which contains all chunked array
 */

/* eslint-disable consistent-return */
const splitArray = (arr: any[], chunkSize: number): any[][] | undefined => {
    if (arr.length === 0) return;

    const chunkThis = structuredClone(arr);
    const arrReturn: any[] = [];

    while (chunkThis.length) {
        if (chunkThis.length === 0) break;
        arrReturn.push(chunkThis.splice(0, chunkSize));
    }

    return arrReturn;
};

export default splitArray;
