import { IValidatedFieldConfig, IValidatorConfig, ValidatedField } from 'mobx-validated-field';

export class SSNValidatedField extends ValidatedField {
    constructor(config?: IValidatedFieldConfig) {
        super(config);
        this.addValidators([ssnValidator]);
    }

    handleChange(val: string) {
        super.handleChange(maskSSN(val));
    }
}

//regexp
//https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-15.php

export const ssnValidator: IValidatorConfig = {
    id: 'ssn',
    defaultMessage: 'Invalid SSN Number',
    validateOnSubmit: val => {
        if (val != null && val !== '' && !/^(?!000|666)[0-8][0-9]{2}\-?(?!00)[0-9]{2}\-?(?!0000)[0-9]{4}$/.test(val)) {
            return false;
        }
    }
};

export function maskSSN(ssn: string): string {
    if (ssn == null || ssn === '') {
        return ssn;
    }

    // allow to input hyphen
    if ((ssn.length === 4 && ssn[3] === '-') || (ssn.length === 7 && ssn[6] === '-')) {
        return ssn;
    }

    var x = ssn.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/);

    return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
}
