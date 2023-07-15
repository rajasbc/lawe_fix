import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class TextOnlyValidatedField extends ValidatedField {
    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([textOnlyValidator]);
    }

    handleChange(val: string) {
        super.handleChange(val);
    }
}

export const textOnlyValidator: IValidatorConfig = {
    id: 'text-only',
    defaultMessage: 'Invalid Input Value',

    validateOnSubmit: val => {
        if (val != null && val !== '' && !/^[A-Za-z]+(\.)*$/.test(val)) {
            return false;
        }
    }
};
