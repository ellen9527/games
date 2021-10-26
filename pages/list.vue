<script>
export default {
  name: "List",
  data() {
    return {
      lists: [
        {
          text: "我看到常威在打來福",
          active: false
        },
        {
          text: "你不會是海底撈月十三么吧",
          active: false
        },
        {
          text: "沒收功又罵髒話",
          active: false
        }
      ],
      rules: [
        v => !!v || "待辦事項不可為空白",
        v => (v || "").length <= 20 || "待辦事項不可輸入多於20個字"
      ],
      showNew: false,
      newText: "",
      editId: null
    };
  },
  computed: {
    total() {
      return this.lists.reduce(
        (acc, list, key) => {
          const status = list.active ? "finish" : "todo";
          acc[status].push({
            ...list,
            key
          });
          return acc;
        },
        {
          todo: [],
          finish: []
        }
      );
    },
    cancelText() {
      if (this.editId) {
        return '取消編輯'
      }
      return '取消新增'
    },
  },
  methods: {
    handleNew() {
      if (!this.$refs.newForm.validate()) {
        return;
      }

      if (this.editId) {
        this._changeLists(this.editId, "text", this.newText);
      } else {
        this.lists.push({ text: this.newText, active: false });
      }
      this.reset();
    },
    handleShowNew(value) {
      this._showNew(value);
    },
    handleCheck(key) {
      this._changeLists(key, "active", true);
    },
    handleEdit(key) {
      this._showNew(true);

      const { text } = this.lists[key];
      this.newText = text;
      this.editId = key;
    },
    handleDelete(key) {
      this.lists.splice(key, 1);
    },
    handleReturnLists(key) {
      this._changeLists(key, "active", false);
    },
    _showNew(value = true) {
      if (!value) {
        this.reset()
      }
      this.showNew = value;
    },
    _changeLists(key, property, value) {
      this.$set(this.lists[key], property, value);
    },
    reset() {
      this.newText = "";
      this.editId = null;
      this.$refs.newForm.reset();
    }
  }
};
</script>

<template>
  <div class="list">
    <div class="text-right mb-3">
      <v-btn v-if="!showNew" @click="handleShowNew(true)">新增待辦事項</v-btn>
      <v-btn v-if="showNew" @click="handleShowNew(false)">{{ cancelText }}</v-btn>
    </div>
    <transition name="fade">
      <v-form v-if="showNew" ref="newForm" class="d-flex align-center">
        <v-text-field v-model="newText" label="待辦事項" :rules="rules" />
        <v-btn @click="handleNew">送出</v-btn>
      </v-form>
    </transition>
    <v-list dense>
      <v-subheader>待辦事項：</v-subheader>
      <v-list-item v-for="{ key, text } in total.todo" :key="key">
        <v-list-item-content>
          {{ text }}
        </v-list-item-content>
        <v-list-item-icon class="list--icon">
          <v-icon @click="handleCheck(key)">mdi-check</v-icon>
          <v-icon @click="handleEdit(key)">mdi-pencil</v-icon>
          <v-icon @click="handleDelete(key)">mdi-delete</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-subheader>已完成：</v-subheader>
      <v-list-item v-for="{ key, text } in total.finish" :key="key">
        <v-list-item-content>
          {{ text }}
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="handleReturnLists(key)">移至待辦事項</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss">
.list {
  .fade-enter-active {
    transition: all 0.3s;
  }

  .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  &--icon {
    button + button {
      margin-left: 10px;
    }

    button {
      padding: 2px;
      background-color: #455A64;
      border-radius: 4px;
    }
  }
}
</style>
