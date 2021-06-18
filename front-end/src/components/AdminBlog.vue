<template>
  <div>
    <form @submit.prevent="upload">
      <div class="separator">
        <input v-model="title" placeholder="Title" class="titleformat"/>
      </div>
      <br>
      <div class="separator">
        <textarea v-model="description" placeholder="Description" class="descriptclass"></textarea>
      </div>
      <br>
      <div class="separator">
        <textarea v-model="articles" placeholder="Article" class="artclass"></textarea>
      </div>
      <br>
      <div class="separator">
        <div class="imageInput" @click="chooseImage">
          <img v-if="url" :src="url" />
          <div v-if="!url">Image</div>
          <input ref="fileInput" type="file" @input="fileChanged" />
        </div>
        <p v-if="error">{{error}}</p>
      </div>
      <br>
      <div class="separator">
        <button type="submit">Upload</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'AdminBlog',
  data() {
    return {
      title: "",
      description: "",
      articles: "",
      url: "",
      file: null,
      error: "",
    }
  },
  methods: {
    fileChanged(action) {
      this.file = action.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    async upload() {
      try {
        const toUpload = new FormData();
        toUpload.append("photo", this.file, this.file.name);
        toUpload.append("article", this.articles);
        toUpload.append("title", this.title);
        toUpload.append("description", this.description);
        
        await axios.post("/api/articles", toUpload);
        this.title = "";
        this.description = "";
        this.articles = "";
        this.url = "";
        this.file = null;
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
.artclass {
  width: 90%;
  height: 350px;
}

textarea {
  white-space: pre-wrap;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.separators {
  justify-content: space-evenly;
}

.titleformat {
  height: 30px;
}

.descriptclass {
  width: 40%;
  height: 60px;
}

button {
  padding: 10px;
  margin: 10px;
  background-color: rgb(255, 255, 255, 0.95);
  border-radius: 15px;
}
</style>
