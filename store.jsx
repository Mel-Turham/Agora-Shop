import { create } from 'zustand';

export const shopCard = create((set) => ({
	CARD: [],
	addProduit: (produit) =>
		set((state) => ({ CARD: [...state.CARD, { ...produit, qte: 1 }] })),
	uppdateProduit: (produit) => set({ CARD: produit }),
	updateBears: (newBears) => set({ bears: newBears }),
	resetCARD: () => set({ CARD: [] }),
}));
