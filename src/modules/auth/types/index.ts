export interface SignIn {
    username: string;
    password: string;
    massage?: string
}

export interface SignUp extends SignIn{
    full_name: string;
    username: string;
    email: string;
    address: string;
    phone_number: string;
    password: string
}

