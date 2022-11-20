import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';
import Button from 'shared/form/Button';

import './Modal.scss';

interface IModalProps {
    show: boolean;
    headerTitle: string;
    onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ headerTitle, onClose, show }) => {
    if (!show) return null;

    const content = (
        <>
            <Backdrop onClose={onClose} show={show} />
            <div className="modal">
                <header className="modal__header">
                    <h4>{headerTitle}</h4>
                </header>
                <div className="modal__content">
                    Ooops something went wrong!
                </div>
                <footer className="modal__footer">
                    <Button clickHandler={onClose}>close</Button>
                </footer>
            </div>
        </>
    );

    return createPortal(
        content,
        document.getElementById('modal-root') as HTMLDivElement
    );
};
export default Modal;
