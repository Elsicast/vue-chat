<template lang="">
  <form class="chat-input-container">
    <Picker
      :data="emojiIndex"
      set="facebook"
      @select="addEmoji"
      class="picker"
      v-show="selectEmoji"
      :showPreview="false"
    />
    <div class="chat-input-header">
      <img src="../assets/emoji.svg" @click="chageSelectEmoji" />
    </div>
    <div class="chat-input-textarea">
      <textarea
        name=""
        id=""
        class="text"
        v-model="inputs"
        @keydown.enter="enterdown"
      ></textarea>
    </div>
    <button class="submit" @click="submit">确认</button>
  </form>
</template>
<script>
import data from "emoji-mart-vue-fast/data/facebook.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
export default {
  created() {
    this.emojiIndex = new EmojiIndex(data);
  },
  components: {
    Picker,
  },
  data() {
    return {
      emojiIndex: undefined,
      inputs: "",
      selectEmoji: false,
    };
  },
  methods: {
    addEmoji(emoji) {
      this.inputs = this.inputs + emoji.native;
      this.chageSelectEmoji();
    },
    chageSelectEmoji() {
      this.selectEmoji = !this.selectEmoji;
    },
    enterdown(e) {
      e.preventDefault();
      this.submit(e);
    },
    submit(e) {
      e.preventDefault();
      this.$emit("handleSubmit", this.inputs);
      this.inputs = "";
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-input-container {
  margin-bottom: 0.8rem;
  border: 1px solid #808080;
  border-radius: 0.7rem;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  .chat-input-header {
    display: flex;
    align-items: center;
    padding: 00.3rem;
    gap: 0.5rem;
    border-bottom: 1px solid #80808054;
    img {
      height: 1.5rem;
      padding: 0.2rem;
      border-radius: 0.2rem;
      cursor: pointer;
      &:hover {
        background-color: #80808033;
      }
    }
  }
  .chat-input-textarea {
    overflow: hidden;
    .text {
      //   border: 1px solid black;
      padding: 0.2rem 1rem;
      resize: none;
      width: 100%;
      font-size: 1rem;
      outline: none;
      border: none;
      border-radius: 1rem;
      resize: none;
      display: block;
      overflow: auto;
      word-break: break-all;
      box-sizing: border-box;
      min-height: 6.4rem;
      max-height: 6.4rem;
      background-color: aliceblue;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: rgba(0, 0, 0, 0.5);
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
    }
  }
}
.submit {
  background-image: linear-gradient(
    to right,
    #1fa2ff 0%,
    #12d8fa 51%,
    #1fa2ff 100%
  );
}
.submit {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px;
  padding: 7.5px 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.submit:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.picker {
  position: absolute;
  transform: translateY(-100%);
  height: 18rem;
}
</style>
