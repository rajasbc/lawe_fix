import { action, computed, observable } from 'mobx';
import { IValidatedFieldConfig, ValidatedField } from 'mobx-validated-field';

export class ValidatedDateField extends ValidatedField {
    @observable private _dateValue: Date;

    constructor(opts?: IValidatedFieldConfig) {
        super(opts);
    }

    @computed
    get dateValue(): Date {
        return this._dateValue;
    }

    @action
    handleChange(date: any) {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        this._dateValue = date;
        super.handleChange(date ? date.toISOString() : '');
    };

}
