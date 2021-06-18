<template>
  <div>
    <div v-if="admin">
      <h2>Edit or Delete Article</h2>
      <input v-model="oneArticle.title" />
      <br />
      <textarea v-model="oneArticle.description"></textarea>
      <br />
      <textarea v-model="oneArticle.article"></textarea>
      <br />
      <img :src="oneArticle.path" />
      <div v-if="oneArticle">
        <button @click="deleteArt(oneArticle)">Delete</button>
        <button @click="update(oneArticle)">Edit</button>
      </div>
    </div>
    <div v-else class="container">
      <h1>{{ oneArticle.title }}</h1>
      <h4>{{ oneArticle.description }}</h4>
      <div><img :src="oneArticle.path" /></div>
      <div class="pshader">
        <p>{{ oneArticle.article }}</p>
        <p class="subscript">{{ formatDate(oneArticle.created) }}</p>
      </div>
    </div>
    <div class="container">
      <form v-if="user" @submit.prevent="postComment">
        <div class="spaceit">
          <textarea v-model="comment" placeholder="Comment"></textarea>
        </div>
        <button type="submit">Post Comment</button>
      </form>
      <div v-for="comment in comments" v-bind:key="comment._id">
        <div class="commentformat">
          <p>{{ comment.comment }}</p>
          <p class="subscript">
            <span class="name">{{ comment.user.firstName }},</span>
            {{ formatDate(comment.created) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Article",
  data() {
    return {
      oneArticle: {},
      error: "",
      comment: "",
      comments: [],
      title: "",
      description: "",
      articles: "",
      url: "",
      file: null,
    };
  },
  created() {
    this.getArticle();
    this.getComments();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    admin() {
      return this.$root.$data.user.role === "admin";
    },
  },
  methods: {
    async getArticle() {
      try {
        let response = await axios.get(
          "/api/articles/one/" + this.$route.params.id
        );
        this.oneArticle = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async postComment() {
      try {
        const formData = { comment: this.comment };
        await axios.post("/api/comments/" + this.$route.params.id, formData);
        this.comment = "";
        this.getComments();
      } catch (error) {
        alert(error);
      }
    },
    async getComments() {
      try {
        this.response = await axios.get(
          "/api/comments/all/" + this.$route.params.id
        );
        this.comments = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deleteArt(art) {
      try {
        await axios.delete("/api/articles/" + art._id);
        return true;
      } catch (error) {
        alert(error);
      }
    },
    async update(art) {
      try {
        await axios.put("/api/articles/" + art._id, {
          title: this.oneArticle.title,
          description: this.oneArticle.description,
          article: this.oneArticle.article,
        });
        this.getArticle();
        return true;
      } catch (error) {
        alert(error);
      }
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
  display: inline-block;
  width: 100%;
  margin: auto;
}

img {
  float: left;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 450px;
  background-color: rgb(66, 185, 131, 0.5);
  border-radius: 15px;
}

.pshader {
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 15px;
  font-size: 24px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.spaceit {
  justify-content: space-evenly;
}

textarea {
  width: 50%;
  height: 150px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

button {
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255, 0.95);
  border-radius: 15px;
}

.subscript {
  color: rgb(0, 0, 0, 0.5);
  font-size: 14px;
  float: right;
}

.commentformat {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid rgb(66, 185, 131, 0.5);
}

.name {
  color: #2c3e50;
}
</style>