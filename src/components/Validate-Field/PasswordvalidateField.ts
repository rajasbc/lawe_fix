import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class PassWordValidatedField extends ValidatedField {

    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([
            passwordValidator,
        ]);
    }
}

// copied from http://emailregex.com/
const EMAIL_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;

export const passwordValidator: IValidatorConfig = {
    id: 'valid_email',
    defaultMessage: "7 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    validateOnSubmit: (val: string) => {
        return val == null || val === '' || EMAIL_REGEX.test(val);
    },
};