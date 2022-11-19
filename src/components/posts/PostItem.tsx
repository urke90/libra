import { IPost } from 'ts/posts';

import './PostItem.scss';

interface IPostItemProps {
    post: IPost;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
    return <li className="post-item">titlefdaslkfhjksdhlf</li>;
};
export default PostItem;
