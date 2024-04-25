import { useState, useEffect } from 'react';
import { data } from '../../data';
import Card from '../components/Card';

export default function Home() {
	const [category, setCategory] = useState('');
	const [produits, setProduits] = useState([]);

	useEffect(() => {
		function getProduitBycategory() {
			return data.filter((item) => item.category.includes(category));
		}
		setProduits(getProduitBycategory);
	}, [category]);

	return (
		<main className='container mt-3'>
			<h1 className='text-center'>Nos Produits</h1>
			<div className='my-3 w-25'>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className='form-select'
					aria-label='Default select example'
				>
					<option value=''>Toutes les categories</option>
					<option value='TV Series'>TV Series</option>
					<option value='Movie'>Movie</option>
				</select>
			</div>
			<section className='row'>
				{produits.map((item, index) => {
					return (
						<div className='col-lg-3 col-md-6' key={index}>
							<Card produit={item} />
						</div>
					);
				})}
			</section>
		</main>
	);
}
