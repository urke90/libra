import './Input.scss';

interface IInputProps {
    type: 'text';
    placeholder: string;
    children?: React.ReactNode;
    onChange: (value: string) => void;
    value: string;
}

const Input: React.FC<IInputProps> = ({
    type,
    placeholder,
    onChange,
    value
}) => {
    return (
        <input
            className="input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default Input;
