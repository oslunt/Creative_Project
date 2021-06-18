<template>
  <div>
    <div v-if="user">
      <AdminBlog v-if="admin" />
      <h1>Blog Posts</h1>
      <div class="cols" v-for="article in articles" v-bind:key="article._id">
        <div class="item">
          <router-link :to="{ name: 'Article', params: { id: article._id } }">
            <h2>{{ article.title }}</h2>
            <h4>{{ article.description }}</h4>
            <p>{{ formatDate(article.created) }}</p>
          </router-link>
        </div>
      </div>
      <button type="submit" @click.prevent="logout" class="floatright">
        Logout
      </button>
    </div>
    <div v-else>
      <h1>Join</h1>
      <form class="forForms">
        <fieldset>
          <input placeholder="First Name" v-model="firstName" />
          <input placeholder="E-mail Address" v-model="emailAddress" />
          <input type="password" placeholder="Password" v-model="password" />
        </fieldset>
        <button type="submit" @click.prevent="join">Join</button>
      </form>
      <h1>Login</h1>
      <form class="forForms">
        <fieldset>
          <input placeholder="E-mail Address" v-model="emailAddresslogin" />
          <input
            type="password"
            placeholder="Password"
            v-model="passwordlogin"
          />
        </fieldset>
        <button type="submit" @click.prevent="login">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import AdminBlog from "@/components/AdminBlog.vue";
export default {
  name: "Blog",
  components: {
    AdminBlog,
  },
  data() {
    return {
      firstName: "",
      emailAddress: "",
      password: "",
      error: "",
      emailAddresslogin: "",
      passwordlogin: "",
      errorLogin: "",
      articles: [],
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    admin() {
      return this.$root.$data.user.role === "admin";
    },
  },
  async created() {
    this.getArticles();
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
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
    async login() {
      this.errorLogin = "";
      if (!this.emailAddresslogin || !this.passwordlogin) {
        return;
      }
      try {
        let response = await axios.post("/api/users/login", {
          emailAddress: this.emailAddresslogin,
          password: this.passwordlogin,
        });
        this.$root.$data.user = response.data.user;
        this.emailAddresslogin = "";
        this.passwordlogin = "";
      } catch (error) {
        this.errorLogin = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
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
  },
};
</script>

<style scoped>
body {
  margin: 0px;
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
  background-color: rgb(66, 185, 131, 0.75);
  color: white;
}

button {
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255, 0.95);
  border-radius: 15px;
}

fieldset {
  border: white;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

.floatright {
  float: right;
}
</style>