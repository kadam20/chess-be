import { isDate } from 'jet-validators';
import { transform } from 'jet-validators/utils';

/******************************************************************************
                                Constants
******************************************************************************/

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Check if a value is a UUID string.
 */
export function isUuid(arg: unknown): arg is string {
    return typeof arg === 'string' && UUID_REGEX.test(arg);
}

/**
 * Convert to date object then check is a validate date.
 */
export const transformIsDate = transform(
    (arg) => new Date(arg as string),
    (arg) => isDate(arg),
);
