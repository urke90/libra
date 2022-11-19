import { useEffect, useState } from 'react';
import { useAxios } from 'hooks/use-axios';

import { IPost } from 'ts/posts';
import './Posts.scss';
import PostItem from 'components/posts/PostItem';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

interface IPostsProps {}

const Posts: React.FC<IPostsProps> = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const { sendRequest, isLoading, error, handleClearError } = useAxios();
    console.log('error', error);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await sendRequest({
                    method: 'GET'
                });
                console.log('response fetch posts', response);
                if (response?.status === 200 && response?.data.length > 1) {
                    setPosts(response.data);
                }
            } catch (error) {}
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    }

    return (
        <div className="posts">
            <header className="posts__header">
                <div className="posts__header-container">
                    <h2 className="posts__heading">
                        Posts found: {posts.length}
                    </h2>
                </div>
            </header>
            <div className="posts__content">
                <div className="posts__search">INPUT INPUT</div>
                <ul className="posts__list">
                    {posts.length
                        ? posts.map((post) => <PostItem post={post} />)
                        : null}
                </ul>
            </div>
        </div>
    );
};
export default Posts;
