import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class AmountValidatedField extends ValidatedField {

    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([
            amountValidator
        ]);
    }

    handleChange(val: string) {
        super.handleChange(trimAmount(val));
    }

}

const AMOUNT_REGEX = /^[0-9,]*(?:\.\d{0,2})?$/;

export const amountValidator: IValidatorConfig = {
    id: 'only_digits',
    defaultMessage: 'Amount can only contain 0-9, commas, and dots (.)',
    validateOnChange: val => {
        if (val != null && val !== '' && ((val.replace(/\s/, "")) === "" || !AMOUNT_REGEX.test(val))) {
            return false;
        }
    },
    validateOnSubmit: val => {
        if (val != null && val !== '' && ((val.replace(/\s/, "")) === "" || !AMOUNT_REGEX.test(val))) {
            return false;
        }
    }
};

function trimAmount(amt: string) {
    if (amt == null || amt === '') {
        return amt;
    }
    if (amt.indexOf(".") > -1 && (amt.length - amt.indexOf(".") - 1) > 2) {
        return amt.substring(0, amt.indexOf(".") + 3);
    }
    return amt;
}
