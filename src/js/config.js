const { createApp } = Vue;

createApp({
  data() {
    return {
      config: {
        minimal_nav: true,
      },
    };
  },
}).mount("#app");
