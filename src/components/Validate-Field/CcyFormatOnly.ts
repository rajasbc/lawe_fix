import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class CcyFormatOnlyValidatedField extends ValidatedField {

    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([
            NumberValidator
        ]);
    }

    handleChange(val: string) {
        super.handleChange(val);
    }
}

export const NumberValidator: IValidatorConfig = {
    id: 'numOnly',
    defaultMessage: 'Invalid Input',

    validateOnChange: val => {
        if (val != null && val !== '' && !(/^[-+]?[0-9]+\.[0-9]+$/.test(val)|| /^[0-9]*$/.test(val))){
            return false;
        }
    },
    validateOnSubmit: val => {
        if (val != null && val !== '' && !(/^[-+]?[0-9]+\.[0-9]+$/.test(val) || /^[0-9]*$/.test(val))){
            return false;
        }
    }
};
