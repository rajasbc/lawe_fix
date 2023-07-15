import { intersection } from 'lodash';
import * as capabilities from '../Common/JsonFiles/cababilities.json';

///CEntral area to check if access is there for the profile.
export function hasAccess(action:any, role:any, isSignedIn:any): boolean {
    const capab : any =capabilities;
    const allowedGroups = capab[action];
    if (allowedGroups == null) {
        throw new Error(`Could not find action '${action}' in capabilities`);
    }
    let returnVal = intersection(allowedGroups, role).length > 0;
    if (isSignedIn) {
        const group = allowedGroups.filter(t => t == role)[0];
        returnVal = group ? true : false;
    } else {
        returnVal = false;
    }
    return returnVal;
}