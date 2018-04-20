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
        dateString = date.toLocaleDateString();
    }

    let time = '';
    if (includeTime) {
        const rawHours = date.getHours();
        const suffix = rawHours >= 12 ? "PM" : "AM";
        const hours = ((rawHours + 11) % 12 + 1);
        time = ` at ${hours}:${date.getMinutes()} ${suffix}`
    }
    return dateString + time;
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

