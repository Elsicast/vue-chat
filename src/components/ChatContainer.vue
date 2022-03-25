<template lang="">
  <div class="chatter">
    <div class="chat-header">
      <div class="user-details">
        <img :src="currentChat.avatarImage" />
        <h3>{{ currentChat.username }}</h3>
      </div>
      <logout></logout>
    </div>
    <div class="messages" ref="scrolltome">
      <div
        v-for="(item, index) in messages"
        :key="index"
        :class="`${item.fromSelf === true ? 'sended' : 'received'}`"
        ref="child"
      >
        <div class="content">
          <p>{{ item.message }}</p>
        </div>
      </div>
    </div>
    <chatInput v-on:handleSubmit="handleSubmit" />
  </div>
</template>
<script>
// import { reactive, watch } from "vue";
import logout from "./LogOut.vue";
import chatInput from "./ChatInput.vue";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
export default {
  //   setup(props) {
  //     console.log(props);
  //     let messages = reactive([]);
  //     function flowToBottom() {
  //       this.$nextTick(() => {
  //         const el = this.$refs.scrolltome;
  //         const childs = el.childNodes;
  //         if (childs.length > 2) {
  //           const lastChild = childs[childs.length - 2];
  //           console.log(lastChild.__proto__);
  //           lastChild.scrollIntoView({ behavior: "smooth" });
  //         }
  //       });
  //     }
  //     watch(
  //       () => [...messages],
  //       (newval) => {
  //         console.log(newval);
  //         flowToBottom();
  //         return newval;
  //       }
  //     );
  //     return {
  //       messages,
  //     };
  //   },
  async created() {
    this.currentUser = JSON.parse(localStorage.getItem("chat-user"));
    await this.handleGetMessage(this.currentChatter);
  },
  props: ["currentChatter", "socket"],
  computed: {
    currentChat() {
      return this.currentChatter;
    },
  },
  components: {
    logout,
    chatInput,
  },
  watch: {
    async currentChatter(newval) {
      //   console.log(oldval.username);
      //   console.log(newval.username);
      await this.handleGetMessage(newval);
      return newval;
    },
    arrivalMsg(newval) {
      if (newval) {
        console.log(newval, "hhh");
        this.messages.push(newval);
      }
    },
    messages: {
      handler() {
        this.flowToBottom();
      },
      deep: true,
    },
  },
  data() {
    return {
      currentUser: {},
      arrivalMsg: {},
      messages: [],
    };
  },
  methods: {
    flowToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.scrolltome;
        const childs = el.childNodes;
        if (childs.length > 2) {
          const lastChild = childs[childs.length - 2];
          console.log(lastChild.__proto__);
          lastChild.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    async handleSubmit(msg) {
      try {
        const currentUser = this.currentUser;
        const currentChat = this.currentChat;
        this.socket.emit("send-msg", {
          to: currentChat._id,
          from: currentUser._id,
          msg: msg,
        });
        await axios.post(sendMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        });
        this.messages.push({ fromSelf: true, message: msg });
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async handleGetMessage(newval) {
      const currentUser = this.currentUser;
      const messages = await axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: newval._id,
      });
      this.messages = messages.data;
      console.log(this.socket);
      if (this.socket) {
        this.socket.on("msg-recieve", (msg) => {
          console.log(msg);
          this.arrivalMsg = { fromSelf: false, message: msg };
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.chatter {
  padding-top: 1rem;
  margin-right: 1.2rem;
  display: grid;
  grid-template-rows: 6% 70% 24%;
  overflow: auto;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        height: 3rem;
      }
    }
  }
  .messages {
    gap: 0.2rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        width: 0.2rem;
        border-radius: 1rem;
      }
    }
    .sended,
    .received {
      max-width: 40%;
      position: relative;
      padding: 0.4rem 0.8rem;
      border-radius: 0.6rem;
      font-size: 1.2rem;
      background-color: #3bbc6c;
      word-break: break-all;
    }
    .sended {
      margin: 0.4rem 1rem 0.2rem auto;
      &::after {
        position: absolute;
        display: block;
        content: "";
        width: 0px;
        height: 0px;
        border-top: 1rem solid #3bbc6c;
        border-right: 1rem solid transparent;
        right: -0.1rem;
        top: 30%;
        // border-right: 1rem solid black;
        transform: translate(-80% -50%);
        transform: rotate(135deg);
        box-sizing: content-box;
      }
    }
    .received {
      margin: 0.4rem auto 0.2rem 1rem;
      background-color: #949494;
      &::after {
        position: absolute;
        display: block;
        content: "";
        width: 0px;
        height: 0px;
        border-top: 1rem solid #949494;
        border-right: 1rem solid transparent;
        left: -0.1rem;
        top: 30%;
        transform: rotate(-45deg);
        box-sizing: content-box;
      }
    }
  }
}
</style>
