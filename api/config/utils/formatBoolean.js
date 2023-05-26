
export function fToInteger(value) {
    if (value === false) {
        return 0;
    } if (value === true) {
        return 1;
    }
    return 0;
}

export function fToBoolean(value) {
    if (value === true || value === false) {
        return value;
    }
    if (value === 0 || value === '0') {
        return false;
    } if (value === 1 || value === '1') {
        return true;
    }
    return false;
}
