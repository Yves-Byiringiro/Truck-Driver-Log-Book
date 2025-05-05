import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import Input from '../components/Input';
import TertiaryButton from '../components/TertiaryButton';
import { validate } from '../utils/funcs';
import { register } from '../context/slices/auth.slice';


export default function Register() {
    const dispatch = useDispatch();
    const {
        registerSuccess,
        registerLoading,
        registerError
    } = useSelector(state=> state.auth)

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleRegister = () => {
        const isValid = validate(formState, 'register', setErrors);
        if (!isValid) return;

        const bodyReq = formState
        dispatch(register(bodyReq))
    }



  return (
    <div className='py-20 flex justify-center pt-40'>
      <div className='bg-white w-[35%] p-6 shadow-lg rounded-sm'>
        <div className='flex justify-center mb-6'>
            <h2 className='font-bold text-2xl'>Create a new account</h2>
        </div>
        <div className='flex flex-col gap-y-4'>
            <Input
                label="Username"
                type="text"
                value={formState.username}
                onChange={(val) => {
                    setFormState((prev) => ({ ...prev, username: val }))
                    setErrors((prev) => ({ ...prev, username: '' }));
                }}
                editable={true}
                error={errors.username}
            />
            <Input
                label="Email"
                type="email"
                value={formState.email}
                onChange={(val) => {
                    setFormState((prev) => ({ ...prev, email: val }))
                    setErrors((prev) => ({ ...prev, email: '' }));
                }}
                editable={true}
                error={errors.email}
            />
            <Input
                label="Password"
                type="password"
                value={formState.password}
                onChange={(val) => {
                    setFormState((prev) => ({ ...prev, password: val }))
                    setErrors((prev) => ({ ...prev, password: '' }));
                }}
                editable={true}
                error={errors.password}
            />
        </div>
        <div className='mt-8'>
            <TertiaryButton label={"Register"} onClick={handleRegister} />
        </div>
        <div className='mt-4'>
            <p className='text-base'>Not a new user?</p>
            <NavLink
                to={'/register'}
                className='font-semibold text-[#377DF6]'
            >
                Login with your account
            </NavLink>
        </div>
      </div>
    </div>
  )
}
