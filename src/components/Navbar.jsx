import { NavLink } from 'react-router-dom';
import { shopCard } from '../../store';
export default function Navbar() {
	const CARD = shopCard((state) => state.CARD);

	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<NavLink className='navbar-brand' to='/'>
					Agora | Shop
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<NavLink className='nav-link active' aria-current='page' to='/'>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/cart'>
								Cart({CARD.length})
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
