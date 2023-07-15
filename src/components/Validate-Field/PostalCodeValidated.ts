import { IValidatedFieldConfig, ValidatedField } from 'mobx-validated-field';

export class ValidatedPostalCodeField extends ValidatedField {

    constructor(opts?: IValidatedFieldConfig) {
        super(opts);

        this.addValidators([{
            id: 'postal_code',
            defaultMessage: 'Invalid postal code',
            validateOnSubmit: val => {
                if (val != null && val !== '' && !(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val))) {
                    return false;
                }
            }
        }
        ]);
    }

    handleChange(val: string) {
        super.handleChange(maskZip(val));
    }
}

export function maskZip(zip: string): string {
    if (zip == null || zip === '') {
        return zip;
    }
    
    //allow to input hypen
    if (zip.length == 6 && zip[5] == "-") {
        return zip;
    }

    var x = zip.replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/);
    
    return !x[2] ? x[1] : x[1] + '-' + x[2];
}