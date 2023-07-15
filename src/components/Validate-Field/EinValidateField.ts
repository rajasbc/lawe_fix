import { IValidatedFieldConfig, ValidatedField } from 'mobx-validated-field';


export class EINNumberValidatedField extends ValidatedField {

    constructor(config?: IValidatedFieldConfig) {
        super(config);

        this.addValidators([
            {
                id: 'einNumber',
                defaultMessage: 'Invalid EIN Number',
                validateOnSubmit: val => {
                    if (val != null && val !== '' && !(/^(?:\d{3}-?\d{2}-?\d{4}|\d{2}-?\d{7})$/.test(val))) {
                        return false;
                    }
                }
            }
        ]);
    }

    maskVal(ein: string): string {
        if (ein == null || ein === '') {
            return ein;
        }
        //allow to input hypen
        if ((ein.length == 3 && ein[2] == "-")) {
            return ein;
        }
        var x = ein.replace(/\D/g, '').match(/(\d{0,2})(\d{0,7})/);

        return !x[2] ? x[1] : x[1] + '-' + x[2];
    }

    handleChange(ein: string) {
        super.handleChange(this.maskVal(ein));
    }
}
