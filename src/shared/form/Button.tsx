import './Button.scss';

interface IButtonProps {
    clickHandler: () => void;
    children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({ children, clickHandler }) => {
    return (
        <button onClick={clickHandler} className="button">
            {children}
        </button>
    );
};
export default Button;
