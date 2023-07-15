import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';


export class BusinessNameValidatedField extends ValidatedField {

    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([
            businessNameValidator
        ]);
    }

    handleChange(val: string) {
        super.handleChange(val);
    }
}

export const businessNameValidator: IValidatorConfig = {
    id: 'bname',
    defaultMessage: 'Invalid Input Value',

    validateOnSubmit: val => {
        if (val != null && val !== '' && !(/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 _'\-~?+!.,@%&]{2,}$/.test(val))) {
            return false;
        }
    }
};
