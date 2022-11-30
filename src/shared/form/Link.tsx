import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import './Link.scss';

interface ILinkProps {
    postId: number;
    isPreviousPage?: boolean;
}

const LinkItem: React.FC<ILinkProps> = ({ postId, isPreviousPage }) => {
    const linkText = isPreviousPage ? 'Previous article' : 'Next article ';
    const arrow = isPreviousPage ? (
        <AiOutlineArrowLeft className="link-item__arrow--left" />
    ) : (
        <AiOutlineArrowRight className="link-item__arrow--right" />
    );

    const styles: React.CSSProperties = isPreviousPage
        ? {
              color: +postId === 1 ? '#B4B7D4' : '#2c2c37',
              pointerEvents: +postId === 1 ? 'none' : 'auto'
          }
        : {
              color: +postId === 100 ? '#B4B7D4' : '#2c2c37',
              pointerEvents: +postId === 100 ? 'none' : 'auto'
          };

    const content = isPreviousPage ? (
        <>
            {arrow}
            <span>{linkText}</span>
        </>
    ) : (
        <>
            <span>{linkText}</span>
            {arrow}
        </>
    );

    return (
        <Link
            className="link-item"
            style={styles}
            to={
                isPreviousPage ? `/posts/${postId - 1}` : `/posts/${postId + 1}`
            }
        >
            {content}
        </Link>
    );
};

export default LinkItem;
