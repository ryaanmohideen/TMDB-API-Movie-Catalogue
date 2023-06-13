<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const store = useStore();
const router = useRouter();
const email = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email.value,
      passwordOne.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};

const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordOne.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};

const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);
    store.user = user;
    const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
    store.cart = cart;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="auth-container">
    <div>
      <h1>Register via Google</h1>
      <button @click="registerViaGoogle">Google</button>
    </div>
    <div>
      <h1>Register via Email</h1>
      <form class="setup" @submit.prevent="registerViaEmail">
        <input id="emailSetup" v-model="email" type="email" placeholder="Email" />
        <input id="passwordOneSetup" v-model="passwordOne" type="password" placeholder="Enter Password" />
        <input id="passwordTwoSetup" v-model="passwordTwo" type="password" placeholder="Re-enter Password" />
        <input type="submit" value="Register" />
      </form>
      <hr />
      <h1>Login via Email</h1>
      <form class="login" @submit.prevent="loginViaEmail">
        <input id="emailLogin" v-model="email" type="email" placeholder="Email" />
        <input id="passwordOneLogin" v-model="passwordOne" type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  gap: 5rem;
}

.setup,
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="submit"] {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

input[type="submit"]:active {
  background-color: #3e8e41;
}
</style>
