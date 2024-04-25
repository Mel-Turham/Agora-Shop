import { shopCard } from '../../store';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa6';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

import emailjs from '@emailjs/browser';

const schema = yup.object({
	name: yup.string().required('Ce champ est obligatoire'),
	address: yup.string().required('Ce champ est obligatoire'),
	telephone: yup
		.string()
		.required('Ce champ est obligatoire')
		.matches(/^\+?237\d{9}$/, 'Entrer un numero valide'),
});

export default function Cart() {
	const [isLoader, setIsLoader] = useState(false);
	const CARD = shopCard((state) => state.CARD);
	const uppdateProduit = shopCard((state) => state.uppdateProduit);
	const resetCARD = shopCard((state) => state.resetCARD);

	function removePro(id) {
		let restProd = CARD.filter((item) => item.id !== id);
		uppdateProduit(restProd);
	}

	function removeQte(id) {
		let removeQte = CARD.map((item) => {
			return item.id === id && item.qte > 1
				? { ...item, qte: item.qte - 1 }
				: item;
		});
		uppdateProduit(removeQte);
	}
	function addQte(id) {
		let addQte = CARD.map((item) => {
			return item.id === id && item.qte < 10
				? { ...item, qte: item.qte + 1 }
				: item;
		});
		uppdateProduit(addQte);
	}

	useEffect(() => {
		$('form').hide();
	}, []);
	const handleShowForm = () => {
		$('form').slideDown(700);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		setIsLoader(true);
		const templateParams = {
			nom: data.name,
			tel: data.telephone,
			quartier: data.address,
		};

		emailjs
			.send(
				'service_fblsnzn',
				'template_inh9m0a',
				templateParams,
				'ozNhRLh8J0MqEe7n1',
			)
			.then(
				(response) => {
					console.log('SUCCESS!', response.status, response.text);
					setIsLoader(false);
					resetCARD();
					reset();
					toast.success('Nous vous contacterons pour votre livraisons');
				},
				(error) => {
					console.log('FAILED...', error);
				},
			);
	};
	return (
		<main className='container'>
			{CARD.length === 0 ? (
				<h1 className='text-center'>Aucun Produit Commander</h1>
			) : (
				<>
					<h1 className='text-center'> Tous vos produits</h1>
					<section className='row d-flex  justify-content-center'>
						<div className='col-lg-8'>
							<div className='table-responsive'>
								<table className='table'>
									<thead>
										<tr>
											<th scope='col'>Nom</th>
											<th scope='col'>Categorie</th>
											<th scope='col'>Prix</th>
											<th scope='col'>Image</th>
											<th scope='col'>Action</th>
											<th scope='col'></th>
										</tr>
									</thead>
									<tbody>
										{CARD.map((item, index) => {
											return (
												<tr key={index}>
													<td>{item.title}</td>
													<td>{item.category}</td>
													<td>{item.price} FCFA</td>
													<td>
														<img
															src={`/${item.thumbnail.regular.medium}`}
															alt=''
															className='rounded-circle'
															width={50}
															height={50}
														/>
													</td>
													<td>
														<div className='hstack gap-3'>
															<span
																role='button'
																onClick={() => removeQte(item.id)}
															>
																<FaMinus />
															</span>
															<span>{item.qte} </span>
															<span
																role='button'
																onClick={() => addQte(item.id)}
															>
																<FaPlus />
															</span>
														</div>
													</td>
													<td>
														<span
															role='button'
															className='text-danger'
															onClick={() => removePro(item.id)}
														>
															<FaTrash />
														</span>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<div className='col-lg-4'>
							<div className='card p-2 shadow-lg'>
								<span className='fs-4 text-center d-block'>Votre Facture</span>
								<span className='fw-bold mt-2'>
									Total:{' '}
									{CARD.reduce((somme, item) => {
										return somme + item.qte * item.price;
									}, 0)}{' '}
									FCFA
								</span>

								<button
									className='btn btn-outline-primary my-4'
									onClick={handleShowForm}
								>
									{' '}
									Commencer le paiement
								</button>

								<form className='shadow-sm' onSubmit={handleSubmit(onSubmit)}>
									<div className='mb-3'>
										<input
											type='text'
											className='form-control '
											placeholder='Votre nom'
											{...register('name')}
										/>
										<span className='text-danger'> {errors.name?.message}</span>
									</div>
									<div className='mb-3'>
										<input
											type='tel'
											className='form-control '
											placeholder='Telephone... ex : 237XXXXXXXX'
											{...register('telephone')}
										/>
										<span className='text-danger'>
											{' '}
											{errors.telephone?.message}
										</span>
									</div>
									<div className='mb-3'>
										<input
											type='text'
											className='form-control '
											placeholder='Address...'
											{...register('address')}
										/>
										<span className='text-danger'>
											{' '}
											{errors.address?.message}
										</span>
									</div>
									{isLoader ? (
										<div className='d-flex justify-content-center fs-5 text-success'>
											<div className='spinner-border' role='status'>
												<span className='visually-hidden'>Loading...</span>
											</div>
										</div>
									) : (
										<button type='submit' className='btn btn-success w-100'>
											Payer Maintenant
										</button>
									)}
								</form>
							</div>
						</div>
					</section>
				</>
			)}
		</main>
	);
}
