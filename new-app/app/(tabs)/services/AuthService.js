import { Client, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')  
    .setProject('676d278b00097e04ab85');  

const account = new Account(client);

export const signup = async (email, password, name) => {
    try {
        const response = await account.create(
            ID.unique(),  
            email,
            password,
            name
        );
        console.log('Sign-up successful:', response);
        return response;  
    } catch (error) {
        console.error('Sign-up error:', error);  
        throw error;  
    }
};

export const signin = async (email, password) => {
    try {
        const session = await account.createSession(email, password);
        console.log('Sign-in successful:', session);
        return session; 
    } catch (error) {
        console.error('Sign-in error:', error);  
        throw error;  
    }
};
