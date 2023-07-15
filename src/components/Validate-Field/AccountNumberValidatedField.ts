import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class AccountNumberValidatedField extends ValidatedField {
    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([AccountNumberValidator]);
    }

    handleChange(val: string) {
        super.handleChange(val);
    }
}

export const AccountNumberValidator: IValidatorConfig = {
    id: 'accNumber',
    defaultMessage: 'Account Number not Valid',

    validateOnChange: val => {
        if (val != null && val !== '' && !/^[0-9]*$/.test(val)) {
            return false;
        }
    },
    validateOnSubmit: val => {
        if (val != null && val !== '' && !/^[0-9]*$/.test(val)) {
            return false;
        }
    }
};
