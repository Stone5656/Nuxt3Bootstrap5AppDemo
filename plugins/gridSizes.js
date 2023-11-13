export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('gridSizes', {
      easy: 9,
      medium: 16,
      hard: 25
    });
  });