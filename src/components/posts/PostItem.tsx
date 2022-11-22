import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { IPost } from 'ts/posts';

import './PostItem.scss';

interface IPostItemProps {
    post: IPost;
    isFirstPost: boolean;
}

const PostItem: React.FC<IPostItemProps> = ({ post, isFirstPost }) => {
    const { title, body, id } = post;

    return (
        <Link className="post-item" to={`/posts/${id}`}>
            <li className="post-item__content">
                <h4 className="post-item__title">{title}</h4>
                <p className="post-item__text">{body}</p>
                <div className="post-item__link">
                    <div className="post-item__link-body">
                        <span className="post-item__link-text">Read More</span>
                        <AiOutlineArrowRight className="post-item__link-arrow" />
                    </div>
                </div>
            </li>
        </Link>
    );
};

export default PostItem;
