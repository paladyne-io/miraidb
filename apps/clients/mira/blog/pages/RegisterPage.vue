<template>
      <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <router-link to="/signin">Sign In</router-link></p>
      </div>
    </template>
  