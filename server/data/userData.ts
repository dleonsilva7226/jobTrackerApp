export interface User {
    id: number;
    username: string;
    password: string;
}

export const users = [
    {
        id: "1",
        username: 'testuser',
        password: 'password123'
    },
    {
        id: "2",
        username: 'anotheruser',
        password: 'mypassword'
    },
    {
        id: "3",
        username: 'admin',
        password: 'adminpassword'
    }, 
    {
        id: "4",
        username: 'guest',
        password: 'guestpassword'
    }
]