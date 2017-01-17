<template>
  <div id="app">
    <div><img src="./assets/moog.png" display=''></div>
    <div class="spacer"></div>
    <div id='viewer'>
      <BigNotification eventHub="eventHub" ></BigNotification>
    </div>  
    <notificationList class="list" eventHub="eventHub"></notificationList>
  </div>
</template>

<script>
import NotificationList from './components/NotificationList';
import BigNotification from './components/bigNotification.vue';
import Vue from 'vue';
import eventBus from './components/eventBus.vue'


export default {
  name: 'app',
  components: {
    NotificationList, BigNotification, eventBus
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
  margin: 60px;
}

* {
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
}

.viewer {
  width: 60%;
  height: 200px;
  float: left;
  padding: 10px;
}

.list {
  width: 40%;
  float: left;
}

#inner{
  border-style:solid;
  border-width: 2px;
  border-radius:5px;
  height: 200px;
}

.spacer {
  height: 50px;
}

</style>
