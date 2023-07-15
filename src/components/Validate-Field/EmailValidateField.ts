import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class EmailValidatedField extends ValidatedField {

    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([
            emailValidator,
        ]);
    }
}

// copied from http://emailregex.com/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator: IValidatorConfig = {
    id: 'valid_email',
    defaultMessage: 'Please enter a valid email.',
    validateOnSubmit: (val: string) => {
        return val == null || val === '' || EMAIL_REGEX.test(val);
    },
};