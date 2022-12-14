import { useCallback, useEffect, useState } from 'react';

import { useAxios } from '../hooks/use-axios';
import { IPost } from '../ts/posts';
import { IAuthors } from '../ts/authors';
import type { TPaginationAction } from '../ts/pagination';
import { selectPostsToRender } from '../util/pagination';

import PostItem from '../components/posts/PostItem';
import LoadingSpinner from '../shared/ui/LoadingSpinner';
import Modal from '../shared/ui/Modal';
import Input from '../shared/form/Input';
import Dropdown from '../shared/form/Dropdown';
import Pagination from '../components/pagination/Pagination';
import Header from '../components/posts/Header';

import './Posts.scss';

interface IPostsProps {}

const Posts: React.FC<IPostsProps> = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [authors, setAuthors] = useState<IAuthors[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [authorId, setAuthorId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { sendRequest, isLoading, handleClearError, error } = useAxios();

    const handleSearchByTitle = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const handleSearchByAuthor = useCallback((id: number) => {
        setAuthorId(id);
    }, []);

    const handleChangePage = useCallback(
        (type: TPaginationAction, pageNum?: number) => {
            setCurrentPage((prevPage) => {
                if (type === 'exact' && pageNum) {
                    setCurrentPage(pageNum);
                } else if (type === 'inc') {
                    return (prevPage += 1);
                }

                return (prevPage -= 1);
            });
        },
        []
    );

    let filteredPosts = posts.filter(
        (post) => post.userId === authorId || authorId === 0
    );
    filteredPosts = filteredPosts.filter(
        (post) =>
            post.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );

    const postsPerPage = 14;
    const postsToRender = selectPostsToRender(
        filteredPosts,
        currentPage,
        postsPerPage
    );

    useEffect(() => {
        const fetchPosts = async () => await sendRequest({ url: 'posts' });
        const fetchUsers = async () => await sendRequest({ url: 'users' });

        const fetchPostsAndAuthors = async () => {
            try {
                const responses = await Promise.all([
                    fetchPosts(),
                    fetchUsers()
                ]);

                const [posts, authors] = responses;

                if (posts?.status === 200 && posts.data.length > 0) {
                    setPosts(posts.data);
                }

                if (authors?.status === 200 && authors.data.length > 0) {
                    setAuthors(authors.data);
                }
            } catch (error) {}
        };

        fetchPostsAndAuthors();
    }, [sendRequest]);

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoading && posts.length === 0 && authors.length === 0) {
        return (
            <h1 className="posts__heading--error">
                Something went wrong, posts not found
            </h1>
        );
    }

    return (
        <>
            <Modal
                show={error}
                headerTitle="Could not show posts"
                onClose={handleClearError}
            ></Modal>
            <div className="posts">
                <Header postsCount={postsToRender.length} />
                <div className="posts__content">
                    <div className="posts__search">
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchValue}
                            onChange={handleSearchByTitle}
                        />
                        <Dropdown
                            onClick={handleSearchByAuthor}
                            items={authors}
                        />
                    </div>
                    <ul className="posts__list">
                        {postsToRender.length
                            ? postsToRender.map((post, index) => (
                                  <PostItem
                                      key={post.id}
                                      post={post}
                                      isFirstPost={index === 0}
                                  />
                              ))
                            : null}
                    </ul>
                </div>
                {posts.length ? (
                    <Pagination
                        totalPosts={filteredPosts.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        changePage={handleChangePage}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Posts;
