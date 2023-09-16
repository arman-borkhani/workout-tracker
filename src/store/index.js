import { reactive } from "vue";

const state = reactive({
  currentUser: null,
});

const methods = {
  setUser(payload) {
    state.currentUser = payload ? payload.user : null;
  }
}

export default {
  state,
  methods
};