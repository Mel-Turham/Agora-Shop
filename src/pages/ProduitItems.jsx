import { useParams } from 'react-router-dom';
import { data } from '../../data';
import { shopCard } from '../../store';
import { useState, useEffect } from 'react';

export default function ProduitItems() {
	const { id } = useParams();
	const [produit, setProduit] = useState([]);

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

	useEffect(() => {
		function getProduit() {
			return data.find((item) => item.id === id);
		}
		setProduit(getProduit);
	}, [id]);

	return (
		<main className='container mt-3'>
			{produit.length !== 0 && (
				<section className='row'>
					<div className='col-lg-6'>
						<img
							src={`/${produit.thumbnail.regular.medium}`}
							alt='product image'
							loading='lazy'
							className='img-fluid'
						/>
					</div>
					<div className='col-lg-6'>
						<span className='fs-4 d-block'> NOM: {produit.title}</span>
						<span className='fs-4'>PRIX: {produit.price} FCFA</span>
						<span className='fs-4 d-block'>CATEGORIE: {produit.category}</span>
						<button
							onClick={() => addProduit(produit.id)}
							className='btn btn-primary w-100'
						>
							Add to Cart
						</button>
					</div>
				</section>
			)}
		</main>
	);
}
