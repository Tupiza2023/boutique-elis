import { create } from 'zustand';

const initialState = {
  products: [],
  total: 0,
};
const forUSDtoBs = 6.98;
const actions = set => ({
  setProducts: product => {
    set(state => {
      // Revisa si el producto ya existe en el array
      const existingProductIndex = state.products.findIndex(
        p => p.id === product.id
      );

      // Asegúrate de que product.quantity sea un número válido
      const newQuantity = Number(product.quantity ?? 1);
      if (isNaN(newQuantity)) {
        console.log(
          'La cantidad proporcionada no es válida:',
          product.quantity
        );
        return state;
      }

      // Si el producto existe, actualiza la cantidad
      if (existingProductIndex > -1) {
        const existingQuantity = Number(
          state.products[existingProductIndex].quantity
        );
        state.products[existingProductIndex].quantity =
          (isNaN(existingQuantity) ? 0 : existingQuantity) + newQuantity;
        return { products: [...state.products] };
      }

      // Si el producto no existe, lo añade al array con la cantidad proporcionada
      product.quantity = newQuantity;
      return { products: [...state.products, product] };
    });
  },
  deleteProduct: productId => {
    set(state => ({
      products: state.products.filter(product => product.id !== productId),
    }));
  },
  decreaseQuantity: productId => {
    set(state => {
      const productIndex = state.products.findIndex(p => p.id === productId);
      if (productIndex > -1 && state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        return { products: [...state.products] };
      } else if (
        productIndex > -1 &&
        state.products[productIndex].quantity === 1
      ) {
        return {
          products: state.products.filter(product => product.id !== productId),
        };
      }
      return state;
    });
  },
  setTotal: total => {
    set(state => ({
      total: total,
    }));
  },
});

export const useCartStore = create(set => ({
  ...initialState,
  ...actions(set),
}));
