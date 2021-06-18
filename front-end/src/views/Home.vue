<template>
  <div class="home">
    <div class="backgroundimg">
      <h1 class="center">Home</h1>
      <img src="../assets/landingpage.jpg" />
    </div>
    <div class="container">
      <h3>Become a traveler today!</h3>
      <form class="forForms">
        <input placeholder="First Name" v-model="firstName"/>
        <input placeholder="E-mail Address" v-model="emailAddress"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <button type="submit" @click.prevent="join">Join</button>
      </form>
    </div>
    <h1>Blog Posts</h1>
      <div class="cols" v-for="article in articles" v-bind:key="article._id">
        <div class="item">
          <router-link :to="{ name: 'Blog'}">
            <h2>{{ article.title }}</h2>
            <h4>{{ article.description }}</h4>
            <p>{{ formatDate(article.created) }}</p>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Home",
  data() {
    return {
      firstName: "",
      emailAddress: "",
      password: "",
      error: "",
      articles: [],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    async join() {
      this.error = "";
      if (!this.firstName || !this.emailAddress || !this.password) {
        return;
      }
      try {
        let response = await axios.post("/api/users", {
          firstName: this.firstName,
          emailAddress: this.emailAddress,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
        this.firstName = "";
        this.emailAddress = "";
        this.password = "";
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async getArticles() {
      try {
        let response = await axios.get("/api/articles/all");
        this.articles = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  /*background-color: rgb(0, 0, 0, 0.5);*/
}

.backgroundimg {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.center {
  position: absolute;
  top: 275px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.backgroundimg img {
  height: 600px;
  width: 100%;
  object-fit: cover;
}

.container {
  flex-grow: 2;
  display: flex;
  width: 100%;
  background-color: #42b983;
  height: 100px;
  flex-direction: row;
  justify-content: space-evenly;
}

.forForms {
  align-items: center;
  justify-content: space-between;
  display: flex;
}

input {
  padding: 10px;
  margin: 10px;
  border: none;
  border-bottom: 2px solid white;
  background-color: rgb(66, 185, 131, 0.5);
  color: white;
}

button {
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255, 0.95);
  border-radius: 15px;
}

.item {
  background-color: rgb(255, 255, 255, 0.8);
  display: inline-block;
  margin-top: 1em;
  width: 33.3%;
  border-radius: 15px;
}

.cols {
  display: flex;
  flex-direction: row;
  column-count: 3;
  flex-wrap: wrap;
  justify-content: center;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

@media only screen and (max-width: 820px) {
  .container {
    height: 250px;
  }
  .forForms {
    flex-direction: column;
  }
}
</style>