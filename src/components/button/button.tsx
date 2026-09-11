import React from "react";
import './button.css'

interface ButtonProps {
    onClick?: ()=>void,
    children?: React.ReactNode
    width?: string
}

function CustomButton({ onClick, children, width}: ButtonProps) {
    return (
        <button onClick={onClick} className="Custom-Button" style={{width}}>
            {children ?? 'Click me'}
        </button>
    )
}

export default CustomButton;