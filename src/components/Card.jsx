import { FaEye } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { shopCard } from '../../store';
import PropTypes from 'prop-types';

export default function Card({ produit }) {
	const addProduits = shopCard((state) => state.addProduit);
	const CARD = shopCard((state) => state.CARD);

	function addProduit(id) {
		let is_exist = CARD.findIndex((item) => item.id === id);

		if (is_exist === -1) {
			addProduits(produit);
		} else {
			alert('Vous avez deja ajouter ce produit');
		}
	}

	return (
		<div className='card mb-3'>
			<img
				src={produit.thumbnail.regular.medium}
				className='card-img-top'
				alt='...'
			/>
			<div className='card-body'>
				<h5 className='card-title'>{produit.title}</h5>
				<p className='card-text'>
					Prix : {produit.price} FCFA <br />
					Category : {produit.category}
				</p>
				<div className='hstack'>
					<Link to={`/produit/${produit.id}`} className='fs-4'>
						<FaEye />
					</Link>
					<span
						onClick={() => addProduit(produit.id)}
						className='fs-4 text-success ms-auto'
						role='button'
					>
						<MdAddShoppingCart />
					</span>
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	produit: PropTypes.object,
};
