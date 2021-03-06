export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value => (value.trim() !== '' ? undefined : 'Cannot be empty');
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`
    }
    if (length.max && value.length > length.max) {
        return `Must be no more than ${length.max} characters long`
    }
};
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim() ? undefined : 'Does not match';

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const emailFormat = value => (value.match(emailPattern) ? undefined : 'Invalid email');

export const isPDF = e => {
    try {
        const file = e[0];
        if (file.type === 'application/pdf') {
            return undefined
        }

        else return 'Document must be a PDF'
    }
    catch(error) {
        return 'No file selected'
    }
};
