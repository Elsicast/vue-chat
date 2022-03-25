<template>
  <div class="contact">
    <!-- <div class="contact"> -->
    <div class="brand">
      <img src="../assets/qq.svg" alt="" />
      <h3>Chats</h3>
    </div>
    <div class="userList">
      <div
        v-for="(user, index) in userlist"
        :key="index"
        :class="`user ${index === selected ? 'selected' : ''}`"
        @click="changeSelect(index)"
      >
        <img :src="user.avatarImage" :alt="user.username" class="avatar" />
        <h3>{{ user.username }}</h3>
      </div>
    </div>
    <div class="current-user">
      <img :src="currentUser.avatarImage" />
      <h3>{{ currentUser.username }}</h3>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("chat-user"));
  },
  props: ["users"],
  computed: {
    userlist() {
      return this.users;
    },
  },
  data() {
    return {
      selected: undefined,
    };
  },
  methods: {
    getUsers() {
      console.log(this.userlist);
    },
    changeSelect(index) {
      //   console.log(index);
      this.selected = index;
      this.$emit("getUser", index);
    },
  },
};
</script>
<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-rows: 10% 75% 15%;
  //   background-color: aquamarine;
  overflow: hidden;
  .brand {
    gap: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 3rem;
    }
  }
  .userList {
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    // align-items: center;
    // gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .user {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: left;
      gap: 1rem;
      min-height: 4.5rem;
      border-radius: 0.4rem;
      background-color: #ffffff34;
      padding: 0.4rem;
      background-color: white;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      margin: 0.8rem 1rem;
      transition: 0.5s ease-in-out;
      &.selected {
        background-color: #80808036;
      }
      .avatar {
        height: 3rem;
      }
      &:hover {
        transform: scale(1.1);
        transition: 0.2s ease-in-out;
      }
    }
  }
  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    // border-top: 1px solid rgba(0, 0, 0, 0.4);
    img {
      height: 3.3rem;
    }
  }
  @media screen and (max-width: 720px) {
    h3 {
      display: none;
    }
  }
}
</style>
