import { faker } from '@faker-js/faker';

export default function createRandomUser() {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        company: faker.company.name(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}