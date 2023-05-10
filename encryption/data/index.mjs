import { faker } from '@faker-js/faker';
import * as fs from 'fs'


function users() {

    const USERS = []
    const no_of_docs = 1000000

    for (var i = 0; i < no_of_docs; i++) {
        USERS.push({
            name: faker.name.fullName(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            phone: faker.phone.number(),
            dob: faker.date.past(),
            education: {
                is_educated: faker.datatype.boolean(),
                qualification: faker.name.jobTitle()
            },
        })
    }


    fs.writeFileSync('./users.json', JSON.stringify(USERS))

}