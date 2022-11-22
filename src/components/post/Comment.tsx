import './Comment.scss';

interface ICommentProps {
    name: string;
    body: string;
}

const Comment: React.FC<ICommentProps> = ({ name, body }) => {
    return (
        <li className="comment-item">
            <p className="comment-item__title">{name}</p>
            <p className="comment-item__body">{body}</p>
        </li>
    );
};
export default Comment;
