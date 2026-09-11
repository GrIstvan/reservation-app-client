import { useCallback, useState } from 'react'
import './CustomInput.css'

interface CustomInputProp {
    label?: string
    type?: string
    children?: React.ReactNode
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function CustomInput({ label, type = 'text',children, onChange }: CustomInputProp) {

    const eyeClick = useCallback(() => {setShowPassword(prev => !prev)}, [])

    const [showPassword, setShowPassword] = useState(false)

    const inputType =
    type === 'password'
    ? showPassword ? 'text' : 'password'
    : type

    return(
        <div className={`input-group ${type === 'password' && 'password-input-group'}`}>
            <input type={inputType} onChange={onChange} placeholder=" " value={children?.toString()}/>
            <label>{label}</label>
            {type === 'password' && (<span onClick={eyeClick} className="material-symbols-outlined eye-icon">{showPassword ? 'visibility' : 'visibility_off'}</span>)}
        </div>
    )
}

export default CustomInput