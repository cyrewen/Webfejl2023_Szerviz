export interface User {
    id: string;
    email: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    }
    address: string;
}