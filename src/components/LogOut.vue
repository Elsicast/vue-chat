<template lang="">
  <div>
    <button @click="logOut" class="logout">
      <img src="../assets/登出.svg" />
    </button>
  </div>
</template>
<script>
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default {
  data() {
    return {};
  },
  methods: {
    async logOut() {
      const id = await JSON.parse(localStorage.getItem("chat-user"))._id;
      console.log(id);
      const data = await axios.get(`${logoutRoute}/${id}`);
      console.log(data);
      if (data.status === 200) {
        localStorage.clear();
        this.$router.push("/auth");
      }
    },
  },
};
</script>
<style lang="scss">
.logout {
  border: none;
  padding: 0.3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: aliceblue;
  border: 0.2rem solid #8a8a8a;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  img {
    display: inline-block;
    height: 1.5rem;
  }
  &:hover {
    background-color: #80808033;
  }
}
</style>
