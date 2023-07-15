import { IValidatedFieldConfig, ValidatedField, IValidatorConfig } from 'mobx-validated-field';

export class RoutingNumberValidatedField extends ValidatedField {
    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([RoutingNumberValidator]);
    }

    handleChange(val: string) {
        super.handleChange(val);
    }
}

export const RoutingNumberValidator: IValidatorConfig = {
    id: 'routingNumber',
    defaultMessage: 'Invalid Routing Number',

    validateOnSubmit: val => {
        const Val = val ? val.replace(new RegExp('-', 'g'), '') : val;
        if (val == null || val == '') {
            return true;
        } else if (val) {
            var checksumTotal =
                7 * (parseInt(Val.charAt(0), 10) + parseInt(Val.charAt(3), 10) + parseInt(Val.charAt(6), 10)) +
                3 * (parseInt(Val.charAt(1), 10) + parseInt(Val.charAt(4), 10) + parseInt(Val.charAt(7), 10)) +
                9 * (parseInt(Val.charAt(2), 10) + parseInt(Val.charAt(5), 10) + parseInt(Val.charAt(8), 10));

            var checksumMod = checksumTotal % 10;
            if (checksumMod !== 0) {
                return false;
            }
        }
    }
};
