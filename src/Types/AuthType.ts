export interface ISignUpDetails {
    email: string;
    password: string;
    phone_number?: string;
    signup_type?: string;
    username?: string;
    role: string,
}
export interface ILoginDetails {
    email: string;
    password: string;
    role: string,
    authToken?: string;
    isAuthenticated?: boolean
}