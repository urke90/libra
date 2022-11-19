import { createPortal } from 'react-dom';

import './Backdrop.scss';

interface IBackdropProps {
    show: boolean;
    onClose: () => void;
}

const Backdrop: React.FC<IBackdropProps> = ({ onClose, show }) => {
    if (!show) return null;

    const content = <div className="backdrop" onClick={onClose} />;

    return createPortal(
        content,
        document.getElementById('backdrop-root') as HTMLDivElement
    );
};

export default Backdrop;
