<template>
  <div>
    <h1>About Me</h1>
    <div class="container">
      <img src="../assets/Me.jpg" />
      <div class="pshader">
        <p>
          Hello, I'm Spencer, a current college student that loves to travel. I
          have been lucky enough to have traveled all around the world with my
          family. This has sparked a life long passion in me to explore the
          world and help others see it too.
        </p>
        <p>
          I have heard many complain that traveling abroad is too hard,
          especially with a young family, but it doesn't have to be. I have four
          younger brothers and I have learned from my parents on how to do it
          and I want to share that knowledge with everyone. Feel free to check
          out the blog and become a user to gain more travel insights.
        </p>
      </div>
    </div>
    <div class="temp">
      <h1>Blog Posts</h1>
      <div class="cols" v-for="article in articles" v-bind:key="article._id">
        <div class="item">
          <router-link :to="{ name: 'Blog' }">
            <h2>{{ article.title }}</h2>
            <h4>{{ article.description }}</h4>
            <p>{{ formatDate(article.created) }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "About",
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
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
  },
};
</script>

<style scoped>
h1 {
  font-size: 36px;
  color: black;
}

body {
  margin: 0px;
  justify-content: center;
}

.container {
  width: 100%;
  margin: auto;
  display: inline-flex;
}

img {
  float: left;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 450px;
  background-color: rgb(66, 185, 131, 0.5);
  border-radius: 15px;
  height: auto;
}

.pshader {
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 15px;
  font-size: 24px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
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

.temp {
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 500px) {
  img {
    width: 90%;
  }
}
</style>