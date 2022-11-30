import { Route, Routes, Navigate } from 'react-router-dom';

import Posts from '../pages/Posts';
import Post from '../pages/Post';

interface IRoutesConfig {
    name: string;
    path: string;
    component: React.ReactElement;
}

const ROUTES_CONFIG: IRoutesConfig[] = [
    {
        name: 'Posts',
        path: '/posts',
        component: <Posts />
    },
    {
        name: 'Post',
        path: '/posts/:postId',
        component: <Post />
    },
    {
        name: 'Not-Found',
        path: '*',
        component: <Navigate to="/posts" />
    }
];

const RouterComponent: React.FC = () => {
    return (
        <Routes>
            {ROUTES_CONFIG.map(({ path, component }) => (
                <Route key={path} path={path} element={component} />
            ))}
        </Routes>
    );
};

export default RouterComponent;
