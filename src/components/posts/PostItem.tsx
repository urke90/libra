import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { IPost } from 'ts/posts';

import './PostItem.scss';

interface IPostItemProps {
    post: IPost;
    firstPost: boolean;
}

const PostItem: React.FC<IPostItemProps> = ({ post, firstPost }) => {
    const { title, body, id } = post;

    return (
        <li className="post-item">
            <h4 className="post-item__title">{title}</h4>
            <p className="post-item__text">{body}</p>
            <div className="post-item__link">
                <Link to={`/posts/${id}`}>
                    <div className="post-item__link-body">
                        <span className="post-item__link-text">Read More</span>
                        <AiOutlineArrowRight className="post-item__link-arrow" />
                    </div>
                </Link>
            </div>
        </li>
    );
};

export default PostItem;
