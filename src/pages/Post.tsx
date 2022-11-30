import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IPost } from '../ts/posts';
import { IAuthors } from '../ts/authors';
import { IComments } from '../ts/comments';
import { useAxios } from '../hooks/use-axios';

import Comment from '../components/post/Comment';
import LoadingSpinner from '../shared/ui/LoadingSpinner';
import Modal from '../shared/ui/Modal';
import Link from '../shared/form/Link';

import './Post.scss';

const Post: React.FC = () => {
    const [post, setPost] = useState<IPost>();
    const [author, setAuthor] = useState<IAuthors>();
    const [comments, setComments] = useState<IComments[]>([]);
    const { sendRequest, isLoading, handleClearError, error } = useAxios();

    const { postId } = useParams<string>();

    useEffect(() => {
        const fetchPost = async () =>
            await sendRequest({ url: `posts/${postId}` });
        const fetchAuthor = async () =>
            await sendRequest({ url: `users/${2}` });
        const fetchComments = async () =>
            await sendRequest({ url: `posts/${postId}/comments` });

        const fetchPostsAndAuthors = async () => {
            try {
                const responses = await Promise.all([
                    fetchPost(),
                    fetchAuthor(),
                    fetchComments()
                ]);

                const [post, author, comments] = responses;

                if (post?.status === 200 && post.data) {
                    setPost(post.data);
                }

                if (author?.status === 200 && author.data) {
                    setAuthor(author.data);
                }
                if (comments?.status === 200 && comments.data.length > 0) {
                    setComments(comments.data);
                }
            } catch (error) {}
        };

        fetchPostsAndAuthors();
    }, [sendRequest, postId]);

    useEffect(() => {
        const fetchPostAuthor = async () => {
            try {
                const author = await sendRequest({
                    url: `users/${post!.userId}`
                });

                if (author?.status === 200 && author.data) {
                    setAuthor(author.data);
                }
            } catch (error) {}
        };

        fetchPostAuthor();
    }, [sendRequest, post]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (
        !isLoading &&
        (!post || post === undefined) &&
        (!author || author === undefined) &&
        comments.length === 0
    ) {
        return (
            <div className="post">
                <div className="post__container">
                    <h1>Something went wrong</h1>
                </div>
            </div>
        );
    }

    const { name, address } = author!;
    const { city, street, zipcode } = address;
    const { title, body } = post!;

    return (
        <>
            <Modal
                show={error}
                headerTitle="Could not show posts"
                onClose={handleClearError}
            ></Modal>
            <div className="post">
                <div className="post__container">
                    <h1 className="post__heading">{title}</h1>
                    <p className="post__text">{body}</p>
                    <div className="post__links-wrapper">
                        <Link postId={+postId!} isPreviousPage />
                        <Link postId={+postId!} />
                    </div>
                    <div className="post__author">
                        <div className="post__author-details">
                            <p className="post__author-details--gray">
                                Author name
                            </p>
                            <p>{name}</p>
                        </div>
                        <div className="post__author-details">
                            <p className="post__author-details--gray">
                                Address
                            </p>
                            <p>
                                <span>
                                    {city}, {zipcode}, {street}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="post__comments">
                        <h3 className="post__comments-heading">Comments</h3>
                        <ul className="post__comments-list">
                            {comments.length
                                ? comments.map(({ name, body, id }) => (
                                      <Comment
                                          key={id}
                                          name={name}
                                          body={body}
                                      />
                                  ))
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
