<template>
    <div class="nav">
      <div class="button-group">
        <button class="button blue" @click="()=>toggleForm()">Add post</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["toggleForm"],
  };
  </script>
  
  <style>
  .nav {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav h2 {
    color: var(--dark);
    font-size: 32px;
    font-weight: 400;
  }
  
  .button {
    /* Add your default button styles here */
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .blue {
    /* Add the blue color for the button here */
    background-color: blue;
    color: white;
  }
  </style>
  