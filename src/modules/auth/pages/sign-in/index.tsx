
import { Form, Input, Button } from "antd";  
import { NavLink, useNavigate, } from "react-router-dom";
import { SignIn as SignInType} from "../../types";
import { useSignInMutation } from "../../hooks/mutations"


const SignIn = () => {
  const {mutate} = useSignInMutation()
  const navigate = useNavigate();
  const initialValues: SignInType = {
    username: '',
    password: ''
  };


  function handleSubmit(values: SignInType): void {
    mutate(values, {
      onSuccess: () => {
        
        navigate('/admin-layout')
      },
      onError: (error) => {
        alert(error.message)
      },
    });
  }
  
    return (
      <>
          <div className="w-full h-[100vh] flex justify-center items-center bg-[#2d2d2d] text-white">
        <div className="w-[100%] flex flex-col justify-center items-center md:w-[50%]">
          <div className="w-full md:w-[60%]">
            <h1 className="font-bold text-4xl mb-4 text-center">Sign In</h1>
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={initialValues}
              className="flex flex-col items-center justify-center text-white"
            >
              <Form.Item
              className="w-[350px]"
                name="username"
                label={<span style={{ fontSize: "14px", color: "white" }}>Username</span>}
                rules={[{ required: true, message: "Please input your Username!" }]}
              >
                <Input placeholder="Username" style={{ padding: "7px 15px", fontSize: "16px" }} />
              </Form.Item>

              <Form.Item
                className="w-[350px]"
                name="password"
                label={<span style={{ fontSize: "14px", color: "white" }}>Password</span>}
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Password" style={{ padding: "7px 15px", fontSize: "16px" }} />
              </Form.Item>

              <Form.Item className="w-[350px]">
                <Button
                  style={{ backgroundColor: "#AD8354", fontSize: "16px", padding: "23px" }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Sign In
                </Button>
              </Form.Item>
              <div className="flex items-center justify-between w-[350px]">
                <p>Do you have an account?</p>
                <NavLink to={'sign-up'} className='text-[#AD8354]'>Sign Up</NavLink>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
    )
  }
  export default SignIn