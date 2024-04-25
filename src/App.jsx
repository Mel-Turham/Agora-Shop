import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Cart from './pages/Cart';
import ProduitItems from './pages/ProduitItems';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: 'produit/:id',
				element: <ProduitItems />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
