import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { IPost } from 'ts/posts';
import { IAuthors } from 'ts/authors';
import { IComments } from 'ts/comments';

import { useParams } from 'react-router-dom';
import { useAxios } from 'hooks/use-axios';

import Comment from 'components/post/Comment';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import Modal from 'shared/ui/Modal';

import './Post.scss';

const Post: React.FC = () => {
    const [post, setPost] = useState<IPost>({
        body: '',
        id: 0,
        title: '',
        userId: 0
    });
    const [authors, setAuthors] = useState<IAuthors[]>([]);
    const [comments, setComments] = useState<IComments[]>([]);
    const { sendRequest, isLoading, handleClearError, error } = useAxios();

    const { postId } = useParams<string>();

    const postAuthor = authors.find((author) => author.id === post.userId);
    console.log('postAuthor', postAuthor);

    useEffect(() => {
        const fetchPost = async () =>
            await sendRequest({ url: `posts/${postId}` });
        const fetchUsers = async () => await sendRequest({ url: 'users' });
        const fetchComments = async () =>
            await sendRequest({ url: `posts/${postId}/comments` });

        const fetchPostsAndAuthors = async () => {
            try {
                const responses = await Promise.all([
                    fetchPost(),
                    fetchUsers(),
                    fetchComments()
                ]);

                const [post, authors, comments] = responses;

                if (post?.status === 200 && post.data) {
                    setPost(post.data);
                }

                if (authors?.status === 200 && authors.data.length > 0) {
                    setAuthors(authors.data);
                }
                if (comments?.status === 200 && comments.data.length > 0) {
                    setComments(comments.data);
                }
            } catch (error) {}
        };

        fetchPostsAndAuthors();
    }, [sendRequest, postId]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (!isLoading && error) {
        return (
            <div className="post">
                <div className="post__container">
                    <h1>Something went wrong</h1>
                </div>
            </div>
        );
    }

    const { name, address } = postAuthor || {};
    const { city, street, zipcode } = address || {};
    const { title, body } = post;

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
                        <Link
                            className="post__link"
                            to={`/posts/${+postId! - 1}`}
                            style={{
                                color: +postId! === 1 ? '#B4B7D4' : '#2c2c37',
                                pointerEvents: +postId! === 1 ? 'none' : 'auto'
                            }}
                        >
                            <AiOutlineArrowLeft className="post__link-arrow" />
                            <span className="post__link-text">
                                Previous article
                            </span>
                        </Link>
                        <Link
                            to={`/posts/${+postId! + 1}`}
                            style={{
                                color: +postId! === 99 ? '#B4B7D4' : '#2c2c37',
                                pointerEvents: +postId! === 99 ? 'none' : 'auto'
                            }}
                            className="post__link"
                        >
                            <span className="post__link-text">
                                Next article
                            </span>
                            <AiOutlineArrowRight className="post__link-arrow" />
                        </Link>
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
