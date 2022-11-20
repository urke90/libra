import React from 'react';

import Button from './Button';

import './Input.scss';

interface IInputProps {
    type: 'text';
    placeholder: string;
    isSelect?: boolean;
    children?: React.ReactNode;
    clickHandler: () => void;
}

const Input: React.FC<IInputProps> = ({
    type,
    placeholder,
    isSelect,
    clickHandler
}) => {
    if (isSelect) {
        return (
            <>
                <Button onClick={clickHandler}></Button>
            </>
        );
    }

    return <input className="input" type={type} placeholder={placeholder} />;
};

export default Input;
