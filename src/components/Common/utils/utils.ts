import { differenceInHours, formatDistanceToNow, format, getMinutes } from 'date-fns';
import md5 from 'uuid';

import { GlobalState } from '../../../globalState';

export function fillArray<T>(len: number, el: T): T[] {
    return new Array(len).fill(el);
}

export function sleep(ms: number): Promise<void> {
    return new Promise((r) => {
        setTimeout(() => {
            r();
        }, ms);
    });
}

export function isBase64String(base64String: string): boolean {
    const BASE_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (base64String && base64String.indexOf(',')) {
        base64String = base64String.substr(base64String.indexOf(',') + 1);
        const matches = base64String.match(BASE_REGEX);
        if (!matches) {
            return false;
        }
        return true;
    }
    return false;
}

export function isEmpty(sub: any): boolean {
    if (sub == null) {
        return true;
    }

    if (typeof sub === 'string' && sub === '') {
        return true;
    }

    if (Array.isArray(sub) && sub.length === 0) {
        return true;
    }

    if (isPlainObj(sub) && Object.keys(sub).length === 0) {
        return true;
    }

    return false;
}

export function deepFindObj(obj, key) {
    if (isEmpty(obj)) {
        return null;
    }
    return key.split('.').reduce((result, key) => {
        return result[key];
    }, obj);
}



export function isEmptyDeep(sub: any): boolean {
    if (Array.isArray(sub)) {
        return sub.every((item) => isEmptyDeep(item));
    }

    if (isPlainObj(sub)) {
        return Object.keys(sub).every((key) => isEmptyDeep(sub[key]));
    }

    return isEmpty(sub);
}

export function omitEmptyDeep<T>(obj: T): Partial<T> {
    return omitDeep(obj, (val) => isEmpty(val));
}

export function omitNullsDeep<T>(obj: T): Partial<T> {
    return omitDeep(obj, (val: any) => val == null);
}

export function omitDeep<T>(obj: T, predicate: (val: any) => boolean): Partial<T> {
    const cleaned: Partial<T> = {};

    Object.keys(obj).forEach((key) => {
        let val = (obj as any)[key];

        if (predicate(val)) {
            // omit this val
            return;
        }

        if (isPlainObj(val)) {
            val = omitDeep(val, predicate);
        }

        cleaned[key] = val;
    });

    return cleaned;
}

export function isPlainObj(o) {
    return o && typeof o == 'object' && o.constructor == Object;
}


// export function currencySymbol(): string{
//     const currency = window.gs.customer.appData && window.gs.customer.appData.currency ? window.gs.customer.appData.currency.value : 'USD';
//     const Symbol = {
//         USD: '$',
//         CAD: 'CA$',
//         EUR: '€',
//         GBP: '£'
//     }
//     return Symbol[currency]
// }

// export function formatAmount(amount: number, removePrefix?: boolean): string {
//     const currency = window.gs.customer.appData && window.gs.customer.appData.currency ? window.gs.customer.appData.currency.value : 'USD';
//     if (amount == null) {
//         return removePrefix ? '0.00' : 0.00.toLocaleString('en-US', { style: 'currency', currency: currency });;
//     }

//     const amt = (amount / 100).toLocaleString('en-US', { style: 'currency', currency: currency });
//     if (removePrefix) {
//         return amt.replace(/\$/g, '');
//     }
//     return amt;
// }

//copy-paylink with Id
export function copyLink() {
    let copyText :any = document.getElementById('paylink') as HTMLInputElement;
    if (!copyText) {
        return;
    }
    copyText.removeAttribute('disabled');
    copyText.select();
    document.execCommand('copy');
    copyText.setAttribute('disabled', '');
}

export function downloadFile(data: string, fileName: string, type: string) {
    let linkSource;
    if (type === 'text') {
        const file = new Blob([data], { type: 'text/plain' });
        linkSource = URL.createObjectURL(file);
    } else if (type === 'pdf') {
        linkSource = `data:application/pdf;base64,${data}`;
    }
    const element = document.createElement('a');
    element.href = linkSource;
    element.download = fileName ? fileName : 'pd.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
}

export function copyToClipboard(data: string) {
    const el = document.createElement('textarea');
    el.value = data;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

/**
 * This function takes a string and returns an integer for the amount in cents
 *
 * 10 => 1000
 * 10.1 => 1010
 * 10.12 => 1012
 * 1,000 -> 100000
 *
 */

export function parseAmountUS(amountStr: string): number | string {
    if (!amountStr) {
        return '';
    }
    const amount = parseFloat(amountStr.replace(/[$,]/g, ''));
    if (isNaN(amount)) {
        return '';
    }

    return Math.round(100 * amount);
}

export function spliceString(str: string, index: number, count?: number, add?: string): string {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (index < 0) {
        index = str.length + index;
        if (index < 0) {
            index = 0;
        }
    }

    count = count != null ? count : 0;

    return str.slice(0, index) + (add || '') + str.slice(index + count);
}

export function invariant(message: string) {
    const gs = GlobalState.get();
    if (gs /* need to check if we're in prod or not */) {
        throw new Error(message);
    } else {
        console.error(message);
    }
}

export function isFunction(functionToCheck: any): functionToCheck is Function {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
export function isTrim(value: any) {
    const str = value
    const str_val = str.split(" ").join("")
    return str_val
}

export function getDate(value: any) {
    return format(new Date(value), 'M/dd/yyyy')
}

export function getHour(value: string) {
    return new Date(value).getHours()
}

export function getMinute(value: string) {
    return getMinutes(new Date(value))
}

export function getAmPm(value: string) {
    return format(new Date(value), 'aaaa')
}
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
}

export function ccyFormat(num) {
   const floatNumber= parseInt(num)
    return `${floatNumber.toFixed(2)}`;
}
export function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function scrollView(id: string) {
    let top :any = document.getElementById(id);
    if (top !== null) {
        top.scrollIntoView({ behavior: 'smooth' });
        top = null;
    }
}
export function dayOnlyText(date: any, addSuffix?: boolean) {
    return differenceInHours(new Date(), date) > 24
        ? format(date, 'MM/DD/YYYY').toString()
        : formatDistanceToNow(date, { addSuffix: addSuffix === false ? addSuffix : true });
}

// export function closePortal(id: string) {
//     portals.unmount(id);
// }

export function exhausted(val: never): never {
    throw new Error(`val '${val}' is not exhausted`);
}

export function intersection(arr1: string[], arr2: string[]): string[] {
    if (!arr1 || arr1.length === 0 || !arr2 || arr2.length === 0) {
        return [];
    }
    let array_intersection = arr1.filter(function (x) {
        // checking second array contains the element "x"
        if (arr2.indexOf(x) != -1) return true;
        else return false;
    });
    return array_intersection;
}

export function camelCase(str?: string): string {
    if (!str) return;
    return str
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
}

export function startCase(str?: string): string {
    if (!str) return;
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function deep<T>(getter: () => T): T {
    try {
        return getter();
    } catch (e) {
        if (e instanceof TypeError) {
            console.warn(e.message);
            console.warn('This is unexpeected and should be fixed, returning null for now.');
            return null;
        } else {
            throw e;
        }
    }
}

export function textEllipsis(str, maxLength, { side = 'end', ellipsis = '...' } = {}) {
    if (str.length > maxLength) {
        switch (side) {
            case '  start':
                return ellipsis + str.slice(-(maxLength - ellipsis.length));
            case 'middle':
                return str.slice(0, maxLength) + ellipsis + str.slice(-maxLength);
            case 'end':
            default:
                return str.slice(0, maxLength - ellipsis.length) + ellipsis;
        }
    }
    return str;
}

export function groupBy<T>(keys: string[], arrayValue: T[]): {} {
    const toString = (data: any): string => {
        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }
        return data;
    };
    return arrayValue.reduce((result, currentVal) => {
        const returnKey = keys.map((k) => toString(getDeepValue(currentVal, k)).replace(/\s/g, '')).join('-');
        (result[returnKey] = result[returnKey] || []).push(currentVal);
        return result;
    }, {});
}

export function getDeepValue(target, field) {
    const splitNested = (str) => {
        return [str].join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
    };

    var pathArray = splitNested(field);
    var result = void 0;

    try {
        result = pathArray.reduce(function (curr, path) {
            return curr[path];
        }, target);
    } catch (e) { }

    return result ? result : '';
}

 export function staticNoImage(email: string) {
    // return `https://www.gravatar.com/avatar/${md5(email)}.jpg?s=120&d=identicon`;
    return 'https://www.gravatar.com/avatar/nankodai.jpg?s=120&d=identicon';
}

export function updateIframeDOM(element: HTMLIFrameElement) {
    if (!element.contentWindow) {
        return;
    }

    let paper: any = element.contentWindow.document.getElementsByClassName('invoice-paper')[0];
    let webPage: any = element.contentWindow.document.getElementsByClassName('web-only')[0];
    let pageHeader: any = element.contentWindow.document.getElementsByClassName('paper-header')[0];
    if (paper) {
        paper.style.minWidth = 'unset';
    }
    if (webPage) {
        webPage.style.margin = '10px';
        pageHeader.style.right = '10px';
        webPage.style.marginBottom = '100px';
    }
}

export function conv2ISO8601Date(value: any): string {
    let date = null;
    if (value) {
        if (typeof value === 'string') {
            // There are various valid time string formats a sqlite time string might have:
            // https://www.sqlite.org/lang_datefunc.html
            // There are two separate fixes we may need to do:
            // 1) Add 'T' separator if space is used instead
            // 2) Add 'Z' UTC suffix if no timezone or offset specified

            date = value;
            if (/^\d\d\d\d-\d\d-\d\d \d\d:\d\d/.test(date)) {
                date = value.replace(' ', 'T');
            }
            if (/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d\d\d)?)?$/.test(date)) {
                date += 'Z';
            }
        } else if (value instanceof Date) {
            date = value.toJSON();
        }
    }
    return date;
}
