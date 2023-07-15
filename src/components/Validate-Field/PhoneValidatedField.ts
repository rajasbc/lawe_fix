import { IValidatedFieldConfig, ValidatedField } from 'mobx-validated-field';

export class PhoneValidatedField extends ValidatedField {
    public _opts: any;
    constructor(opts?: IValidatedFieldConfig) {
        super(opts);
        this._opts = opts;
        this.addValidators([
            {
                id: 'only_digits',
                defaultMessage: 'Invalid Phone Number',
                validateOnSubmit: val => {
                    if (!val) {
                        return true;

                    }
                    return /^\((\d{3})\) (\d{3})-(\d{4})$/.test(val) ? /^\((\d{3})\) (\d{3})-(\d{4})$/.test(val) : /^\((\d{3})\)-(\d{3})-(\d{4})$/.test(val);
                }
            },
        ]);
    }

    handleChange(val: string) {
        if (this._opts.placeholder) {
            super.handleChange(maskPhone(val, this._opts.placeholder));
        }
    }
}

export function maskPhone(phone: string, type: string): string {
    if (type === 'US') {
        if (phone == null || phone === '' || phone == "(") {
            return phone;
        }

        //allow to input round bracket
        if (phone == "(" || (phone.length == 5 && phone[4] == ")") || (phone.length == 6 && phone[5] == " ")) {
            return phone;
        }

        //allow to input hypen
        if (phone.length == 10 && phone[9] == "-") {
            return phone;
        }

        var x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        if (x[1].length > 0 && !x[1].startsWith("(")) {
            x[1] = '(' + x[1];
        }
        return !x[2] ? x[1] : x[1] + ") " + x[2] + (x[3] ? '-' + x[3] : '');
    } else {

        if (phone == null || phone === '' || phone == "(") {
            return phone;
        }
        //allow to input round bracket
        if (phone == "(" || (phone.length == 2 && phone[4] == ")") || (phone.length == 6 && phone[5] == " ")) {
            return phone;
        }

        var x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        if (x[1].length > 0 && !x[1].startsWith("(")) {
            x[1] = '(' + x[1];
        }

        return !x[2] ? x[1] : x[1] + ")-" + x[2] + (x[3] ? '-' + x[3] : '');
    }
}
