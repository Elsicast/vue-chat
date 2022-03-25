<template lang="">
  <div class="welcome-container">
    <img src="../assets/robot.gif" />
    <div>
      你好，<span class="myname">{{ user.username }}</span
      >!
    </div>
    <div>选择头像开始聊天！</div>
  </div>
</template>
<script>
export default {
  created() {
    this.getUser();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("chat-user"));
    },
  },
};
</script>
<style lang="scss" scoped>
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .myname {
    font-weight: bold;
  }
  img {
    height: 20rem;
  }
}
</style>
