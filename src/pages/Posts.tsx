import { useEffect } from 'react';
import { useAxios } from 'hooks/use-axios';

import './Posts.scss';

interface IPostsProps {}

const Posts: React.FC<IPostsProps> = () => {
    const { sendRequest, isLoading, error, handleClearError } = useAxios();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await sendRequest({ method: 'GET' });
                console.log('response fetch posts', response);
            } catch (error) {}
        };

        fetchPosts();
    }, []);

    return <div className="posts">Posts page</div>;
};
export default Posts;
