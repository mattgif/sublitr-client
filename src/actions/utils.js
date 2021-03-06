import {API_BASE_URL} from '../config';
import faker from 'faker';

export const normalizeResponseErrors = res => {
    if (!res.ok) {
        if (
            res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')
        ) {
            // It's a nice JSON error returned by us, so decode it
            return res.json().then(err => Promise.reject(err));
        }
        // It's a less informative error returned by express
        return Promise.reject (new Error (res.statusText));

    }
    return res;
};

export const seedUsers = (count) => {
    if (!count) {
        count = 20;
    }
    for (let i=0; i<count; i++) {
        const user = {
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: 'testpassword',
            editor: Math.random() > 0.5
        };
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...user})
        })
            .then(() => console.log(`user ${i} of ${count} seeded`))
            .catch(console.error);
    }
};

export function formatDate(_date, includeTime) {
    // take in str formatted date, and bool for whether time is required
    // return formatted str of date (+ time, if requested)
    const date = new Date(_date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let dateString;
    const _dateString = date.toDateString();
    if (_dateString === today.toDateString()) {
        dateString = 'Today';
    } else if (_dateString === yesterday.toDateString()) {
        dateString = 'Yesterday'
    } else {
        dateString = days_between(today, date).toString() + ' days ago';
    }

    if (dateString === 'Today' || dateString === 'Yesterday') {
        // add time if date was today or yesterday
        const rawHours = date.getHours();
        const suffix = rawHours >= 12 ? "pm" : "am";
        const hours = ((rawHours + 11) % 12 + 1);
        let minutes = date.getMinutes();
        if (minutes < 10 ) {
            minutes = "0" + minutes
        }
        dateString = `${dateString} at ${hours}:${minutes}${suffix}`
    }

    return dateString;
}

export function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    const difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

export function compare(a, b, reverse) {
    // input is any two items of same type and a bool to toggle reversing
    // Intl.Collator is used to control for accent characters
    if (typeof a === 'string') {
        return reverse ? new Intl.Collator().compare(b, a) : new Intl.Collator().compare(a, b)
    } else {
        return reverse ? b - a : a - b
    }
}

export function sortByKey(key, data, reverse) {
    return data.slice().sort((a, b) => compare(a[key], b[key], !!reverse));
}

export function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

export function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

