import hrOptions from 'utils/menuOptions/hr';
import devOptions from 'utils/menuOptions/developer';
import trOptions from 'utils/menuOptions/tr';
import { IOptions } from 'utils/menuOptions';

const getUserRole = (category: string, role: string) => {
    if (category === 'st') return 'student';

    const userRoles = {
        tr: trOptions,
        hr: hrOptions,
        dev: devOptions,
    };

    const userCategory = userRoles[category as keyof typeof userRoles];

    // eslint-disable-next-line no-use-before-define
    return findUserRole(userCategory, role);
};

export default getUserRole;

function findUserRole(userCategory: IOptions[], role: string) {
    const roleOption = userCategory.filter((opt) => opt.value === role);

    return roleOption[0].option;
}
