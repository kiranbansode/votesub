/* eslint-disable camelcase */
import { getList } from 'country-list-with-dial-code-and-flag';
import { nanoid } from 'nanoid';
import { IOptions } from '.';

const countryCodeOptionsCreator = () => {
    const countryCodes = getList();
    const options: IOptions[] = [];

    countryCodes.forEach(({ dial_code, name, flag }) => {
        options.push({
            value: dial_code,
            option: `${flag} ${name} : ${dial_code}`,
            id: nanoid(),
        });
    });

    return options;
};

const countryCodeOptions = countryCodeOptionsCreator();
export default countryCodeOptions;
