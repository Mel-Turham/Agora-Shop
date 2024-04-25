import { Link } from 'react-router-dom';

export default function ErrorPage() {
	return (
		<main>
			<h1 className='text-center'>
				<span className='d-block'>Page Not Found</span>
				Cliquer <Link to='/'>ICI</Link> pour aller a la page d&quot;accueil
			</h1>
		</main>
	);
}
