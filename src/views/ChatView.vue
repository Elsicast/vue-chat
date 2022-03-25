<template lang="">
  <div>
    <div class="container">
      <div class="chat-container">
        <contact :users="users" v-on:getUser="getSelectedUser"></contact>
        <welcome v-if="currentSelected === undefined"></welcome>
        <ChatContainer
          v-else
          :currentChatter="currentUser"
          :socket="socket"
        ></ChatContainer>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import contact from "../components/Contact.vue";
import welcome from "../components/Welcome.vue";
import ChatContainer from "../components/ChatContainer.vue";
import io from "socket.io-client";
export default {
  async created() {
    await this.fetchData();
  },
  mounted() {},
  components: {
    contact,
    welcome,
    ChatContainer,
  },
  computed: {
    currentUser() {
      if (this.currentSelected === undefined) {
        return undefined;
      } else {
        return this.users[this.currentSelected];
      }
    },
  },
  data() {
    return {
      // hasUser: false,
      users: [],
      currentSelected: undefined,
      socket: undefined,
    };
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("chat-user"));
      // console.log(this.user);
    },
    getSelectedUser(index) {
      this.currentSelected = index;
      // console.log(index);
    },
    async fetchData() {
      try {
        //判断是否登录
        if (!localStorage.getItem("chat-user")) {
          this.$router.push("/auth");
        }
        await this.getUser();
        if (this.user.isAvatarImageSet === false) {
          this.$router.push("/setAvatar");
        }
        const user = this.user;
        this.socket = io(host);
        this.socket.emit("add-user", user._id);
        //获取所有用户列表
        const res = await axios.get(`${allUsersRoute}/${user._id}`);
        this.users = res.data;
        this.hasUser = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #eee;
}
.chat-container {
  height: 85vh;
  width: 85vw;
  background-color: aliceblue;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 25% 75%;
  gap: 0.6rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
</style>
