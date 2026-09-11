import './registration.css'
import Button from '../components/button/button';
import CustomInput from '../components/CustomInput/customInput';
import DropDownMenu from '../components/dropDownMenu/dropDownMenu';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const data: Record<number, string> = {
    0: 'Férfi',
    1: 'Nő',
    2: 'Egybéb'
}

function RegistrationPage() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(0);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {



            const response = await axios.post(
                "http://localhost:3000/api/users",
                {
                    userName: userName,
                    password: password,
                    email: email,
                    gender: gender,
                    firstName: firstName,
                    lastName: lastName
                }
            );
            console.log("Sikeres regisztracio", response.data)

            navigate("/login");

        } catch (error) {
            console.error("Nem sikerült a regisztráció", error)
        }
    }


    return (
        <div className='registration-page'>
            <div className='registration-container'>

                <div className='registration-card'>
                    <h2 className='h2-registration'>Regisztráció</h2>

                    <form className='registration-form' onSubmit={handleSubmit}>

                        <CustomInput
                            type='text'
                            label='Felhasználónév'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserName(e.target.value) 
                            }
                            }
                        />

                        <CustomInput
                            type='password'
                            label='Jelszó'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                        />

                        <CustomInput
                            type='email'
                            label='E-mail'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                        />

                        <div className='name-row'>

                        <CustomInput
                            type='text'
                            label='Keresztnév'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFirstName(e.target.value)
                            }
                        />

                        <CustomInput
                            type='text'
                            label='Vezetéknév'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setLastName(e.target.value)
                            }
                        />
                        </div>

                        <DropDownMenu
                            data={data}
                            onChange={(value) => setGender(value!)}
                        />
                        <Button width='40%'>Regisztráció</Button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default RegistrationPage