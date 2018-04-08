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
        return Promise.reject({
            code: res.status,
            message: res.statusText
        });
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