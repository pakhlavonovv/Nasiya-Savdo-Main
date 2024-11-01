import loadable from "@loadable/component"
import Loading  from "../components/loading";


const SignIn = loadable(()=> import ("./auth/pages/sign-in"),{
    fallback: <Loading/>
})

const SignUp = loadable(()=> import ("./auth/pages/sign-up"),{
    fallback: <Loading/>
})

const Product = loadable(()=> import ("./product/pages"),{
    fallback: <Loading/>
})

const Contract = loadable(()=> import ("./contract/pages"),{
    fallback: <Loading/>
})

export { SignIn, SignUp, Product, Contract }