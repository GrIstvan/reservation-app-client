import './login.css'
import CustomInput from '../../components/CustomInput/customInput'
import CustomButton from '../../components/button/button';
import { useState, useContext } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';


type Props = {
    onToken: (token: string) => void;
};

function LoginPage({onToken}: Props) {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const context = useContext(UserContext)

    if (!context) {
        throw new Error("UserContext hiba")
    }

    const { setUser } = context

    const handleLogin = async (e: React.FormEvent) => {
         e.preventDefault()


        try {


            const response = await axios.post(
                "http://localhost:3000/api/users/login",
                {
                    email: email,
                    password: password
                    
                }

            );

            const accessToken = response.data.token
            const loggedInUser = response.data.user

            localStorage.setItem('accessToken', accessToken);
            
            localStorage.setItem('user', JSON.stringify(loggedInUser))

            setUser(loggedInUser)

            onToken(accessToken);

            navigate('/home', {
                state: { loginSuccess: true }
              });

        }catch(error) {
            console.error("Nem sikerült a bejelentkezés", error)
        }
    }   

    return (
        <div className="login-page">
            <div className='login-container'>
                <div className='login-card'>
                    <h2 className='h2-login'>Login</h2>

                    <form className='login-form' onSubmit={handleLogin}>
                        <CustomInput
                        type='text'
                        label='Email'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }

                        />

                        <CustomInput
                        type='password'
                        label='Jelszó'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                        }

                        />
                        <CustomButton width='40%'>Login</CustomButton>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default LoginPage