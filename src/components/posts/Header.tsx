import './Header.scss';

interface IHeaderProps {
    postsCount: number;
}

/**
 * ?DA LI OSTAVITI OVAKVE CLLASES KOJE C BITI U POSTS.SCSS ili NAPRAVITI NOVI HEADER.SCSS file???????
 */

const Header: React.FC<IHeaderProps> = ({ postsCount }) => {
    return (
        <header className="posts__header">
            <div className="posts__header-container">
                <h2 className="posts__heading">Posts found: {postsCount}</h2>
            </div>
        </header>
    );
};
export default Header;
