import { IErrors } from '../types';

export const handleValidation = (
    data: object,
    validatorConfig: object,
    errors: IErrors,
    setErrors: Function
): boolean => {
    const errorsCurent = { ...errors };
    let status = true;
    for (const key in data) {
        for (const danger in validatorConfig[key]) {
            let stop = false;
            switch (danger) {
                case 'isRequired': {
                    data[key].length === 0
                        ? ((errorsCurent[key as keyof ErrorsCurent] =
                              validatorConfig[key][danger].message),
                          (status = false),
                          (stop = true))
                        : (errorsCurent[key as keyof ErrorsCurent] = '');
                    break;
                }
                case 'min': {
                    data[key].length < validatorConfig[key][danger].value && data[key].length !== 0
                        ? ((errorsCurent[key as keyof ErrorsCurent] =
                              validatorConfig[key][danger].message),
                          (status = false),
                          (stop = true))
                        : (errorsCurent[key as keyof ErrorsCurent] = '');
                    break;
                }
                case 'max': {
                    data[key].length > validatorConfig[key][danger].value && data[key].length !== 0
                        ? ((errorsCurent[key as keyof ErrorsCurent] =
                              validatorConfig[key][danger].message),
                          (status = false),
                          (stop = true))
                        : (errorsCurent[key as keyof ErrorsCurent] = '');
                    break;
                }
                case 'isOlder': {
                    new Date().getFullYear() - new Date(data[key]).getFullYear() < 18
                        ? ((errorsCurent[key as keyof ErrorsCurent] =
                              validatorConfig[key][danger].message),
                          (status = false),
                          (stop = true))
                        : (errorsCurent[key as keyof ErrorsCurent] = '');
                    break;
                }
                case 'isBadSymbol': {
                    const isBadSymbol = /;/g;
                    isBadSymbol.test(data[key])
                        ? ((errorsCurent[key as keyof ErrorsCurent] =
                              validatorConfig[key][danger].message),
                          (status = false),
                          (stop = true))
                        : (errorsCurent[key as keyof ErrorsCurent] = '');
                    break;
                }
            }
            if (stop) {
                break;
            }
        }
        continue;
    }
    setErrors(errorsCurent);
    return status;
};
