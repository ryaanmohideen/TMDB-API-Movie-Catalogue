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
import Header from '../components/Header.vue';
const store = useStore();
const router = useRouter();
const email = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");
const errorMessage = ref("");

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    errorMessage.value = "Passwords do not match!";
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
    errorMessage.value = "Incorrect email or password.";
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
  <Header/>
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
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Roboto", sans-serif;
}

.auth-container > div {
  width: 400px;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="email"],
input[type="password"] {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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

hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #ccc;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
