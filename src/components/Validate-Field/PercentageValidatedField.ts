import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class PercentageValidatedField extends ValidatedField {
    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([percentageValidator]);
    }

    handleChange(val: string) {
        super.handleChange(val);
    }
}
export const percentageValidator: IValidatorConfig = {
    id: 'only_percentage',
    defaultMessage: 'Value is out of range',
    validateOnChange: val => {
        if (val != null && val !== '' && !/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/.test(val)) {
            return false;
        }
    },
    validateOnSubmit: val => {
        if (val != null && val !== '' && !/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/.test(val)) {
            return false;
        }
    }
};
