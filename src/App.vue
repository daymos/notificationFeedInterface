<template>
  <div id="app">
    <img src="./assets/logo.png">
    <notificationList></notificationList>
    <rangeSelector></rangeSelector>
  </div>
</template>

<script>
import NotificationList from './components/NotificationList';
import rangeSelector from './components/rangeSelector';

export default {
  name: 'app',
  components: {
    rangeSelector,
    NotificationList,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
