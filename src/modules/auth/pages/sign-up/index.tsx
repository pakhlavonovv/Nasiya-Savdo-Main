import { Formik, Field, FieldInputProps, Form as FormikForm } from "formik";
import { Input, Button } from "antd";
import { SignUp as SignUpType } from "../../types";
import { useSignUpMutation } from "../../hooks/mutations";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
    const { mutate } = useSignUpMutation();
    const navigate = useNavigate();


    const initialValues: SignUpType = {
        full_name: "",
        username: "",
        phone_number: "",
        email: "",
        address: "",
        password: ""
    };

    function handleSubmit(values: SignUpType): void {
        const payload = { 
          ...values, 
          phone_number: `+998${values.phone_number}` 
        };
        
        mutate(payload, {
          onSuccess: (res: any) => {
            alert(res)
            navigate("/");
          },
          onError: (error: any) => {
            console.log(error);
          }
        });
      }
      

    return (
        <div style={{ margin: "auto", marginTop: "50px" }} className="max-w-64 lg:max-w-[450px]">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <FormikForm onSubmit={handleSubmit} className="flex flex-col gap-1">
                        <h1 className="font-bold text-4xl text-center">Sign Up</h1>

                        <div className="form-group flex flex-col gap-2">
                            <label>Full Name</label>
                            <Field name="full_name">
                                {({ field }: { field: FieldInputProps<string> }) => (
                                    <Input {...field} placeholder="Full Name" />
                                )}
                            </Field>
                        </div>

                        <div className="form-group flex flex-col gap-2">
                            <label>Username</label>
                            <Field name="username">
                                {({ field }: { field: FieldInputProps<string> }) => (
                                    <Input {...field} placeholder="Username" />
                                )}
                            </Field>
                        </div>

                        <div className="form-group flex flex-col gap-2">
                            <label>Email</label>
                            <Field name="email">
                                {({ field }: { field: FieldInputProps<string> }) => (
                                    <Input {...field} placeholder="Email" />
                                )}
                            </Field>
                        </div>

                        <div className="form-group flex flex-col gap-2">
                            <label>Address</label>
                            <Field name="address">
                                {({ field }: { field: FieldInputProps<string> }) => (
                                    <Input {...field} placeholder="Address" />
                                )}
                            </Field>
                        </div>

                        <div className="form-group flex flex-col gap-2">
                            <label>Phone number</label>
                            <Field name="phone_number">
                                {({ field }: { field: FieldInputProps<string> }) => (
                                    <Input {...field} addonBefore="+998" placeholder="Phone number" />
                                )}
                            </Field>

                        </div>
                        <div className="form-group flex flex-col gap-2">
                            <label>Password</label>
                            <Field name="password">
                                {({ field }: { field: FieldInputProps<string> }) => (
                                    <Input.Password {...field} placeholder="Password" />
                                )}
                            </Field>
                        </div>
                        <div className="form-group mt-3">
                            <Button className='bg-[#AD8354] text-white p-5 text-lg' htmlType="submit" block>
                                Create
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Do you have an account?</p>
                            <NavLink to={'/'} className='text-[#AD8354]'>Sign In</NavLink>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
