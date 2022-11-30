import { IPost } from '../ts/posts';

export const selectPostsToRender = (
    posts: IPost[],
    currentPage: number,
    postsPerPage: number
) => {
    if (posts.length === 0) return [];

    const startSlice = (currentPage - 1) * postsPerPage;
    const endSlice = (currentPage - 1) * postsPerPage + postsPerPage;
    return posts.slice(startSlice, endSlice);
};
