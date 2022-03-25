<template lang="">
  <div class="container">
    <div v-if="isLoading">
      <img src="../assets/loader.gif" alt="loader" class="loader" />
    </div>
    <div v-else class="selectBox">
      <h1>请选择你的头像</h1>
      <div class="avatars">
        <div
          v-for="(imgs, index) in avatars"
          :key="index"
          :class="`avatar ${selectedAvatar === index ? 'selected' : ''}`"
        >
          <img :src="imgs" @click="changeSelect(index)" />
        </div>
      </div>
      <button
        :class="`submit ${isSelected ? 'btn-select' : ''}`"
        @click="submitAvatar"
      >
        确定
      </button>
    </div>
  </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Buffer } from "buffer";
export default {
  async created() {
    this.toaster = createToaster({});
    this.myOptions = {
      duration: 4000,
      position: "top",
    };
    try {
      await this.getImages();
      this.isLoading = false;
      console.log(this.avatars);
    } catch (err) {
      this.toaster.error("每分钟只能获取十张头像哦！", this.myOptions);
    }
  },
  //   computed: {
  //     avatarsURL: function () {},
  //   },
  data() {
    return {
      api: "https://api.multiavatar.com/4645646",
      avatars: [],
      selectedAvatar: undefined,
      isLoading: true,
      isSelected: false,
    };
  },
  //   watch:{
  //     avatars: function (val) {
  //         console.log(val);
  //         this.$nextTick(()=>{

  //         })
  //       }
  //   },
  methods: {
    async getImages() {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${this.api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        this.avatars.push(
          "data:image/svg+xml;base64," + buffer.toString("base64")
        );
      }
      return true;
    },
    changeSelect(n) {
      this.selectedAvatar = n;
      this.isSelected = true;
    },
    async submitAvatar() {
      if (this.selectedAvatar === undefined) {
        this.toaster.error("请选择一个头像！", this.myOptions);
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-user"));
        const img = this.avatars[this.selectedAvatar];
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: img,
        });
        console.log(user);
        console.log(data);
        if (data.isSet) {
          user.isAvatarImageSet = data.isSet;
          user.avatarImage = data.image;
          localStorage.setItem("chat-user", JSON.stringify(user));
          this.$router.push("/");
        }
      }
    },
  },
};
</script>
<style lang="scss" scope>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
}
.loader {
  max-inline-size: 100%;
}
.selectBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 30%;
  padding: 3rem;
  border-radius: 2rem;
  //   border: 0.2rem solid #eee;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
.avatars {
  display: flex;
  gap: 1rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
}
.avatar.selected {
  border: 0.4rem solid #4e04ff;
}
.submit {
  background-color: #5677fc;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  width: 8rem;
  height: 3rem;
  cursor: pointer;
  &.btn-select {
    background-color: #3b50ce;
  }
}
</style>
