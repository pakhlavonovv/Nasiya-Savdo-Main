import {useMutation} from '@tanstack/react-query';
import { signIn, signUp } from '../service';
import { SignIn, SignUp } from '../types';

export function useSignInMutation(){
    return useMutation({
        mutationFn: (data:SignIn)=> signIn(data),
        onSuccess: (res) => {
            const access_token = res.data?.AccessToken
            window.localStorage.setItem("access_token", access_token)
        }
    })
}

export function useSignUpMutation(){
    return useMutation({
        mutationFn: (data:SignUp)=> signUp(data)
    })
}