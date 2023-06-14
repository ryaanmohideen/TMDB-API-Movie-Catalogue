import { defineStore } from 'pinia'
import { firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const useStore = defineStore('store', {
  state: () => ({
    user: null,
    cart: [],
  }),
  actions: {
    async addToCart(poster, title) {
      this.cart.push({
        poster,
        title,
      });

      await setDoc(doc(firestore, "carts", this.user.email), { cart: this.cart });
    },
    async removeFromCart(movie) {
      this.cart = this.cart.filter((cartItem) => cartItem.title !== movie.title);
      await setDoc(doc(firestore, "carts", this.user.email), { cart: this.cart });
    },
  },
})
