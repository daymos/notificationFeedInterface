<template>
  <div id="app">
    <div><img src="./assets/moog.png" display=''></div>
    <div class="spacer"></div>
    <div class="bigView">    
      <bigNotification></bigNotification>
      <StreamSelector></StreamSelector>
    </div>
    <notificationList class="list" ></notificationList>
  </div>
</template>

<script>
import NotificationList from './components/NotificationList';
import BigNotification from './components/bigNotification';
import StreamSelector from './components/StreamSelector'
import eventBus from './components/eventBus'

export default {
  name: 'app',
  components: {
    NotificationList, BigNotification, eventBus, StreamSelector
  },
  created: function(){
    eventBus.$on('streamSelection', el => console.log(el) ) 
  }
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
  width: 100px;
  height: 100px;
  padding: 10px;
  overflow: auto;
}

.list {
  width: 40%;
  float: left;
}

#inner{
  border-style:solid;
  border-width: 2px;
  border-radius:5px;
  height: 100%;
  width: 100%
}

.bigView {
  padding: 10px;
  float:left;
  width: 60%;
  height: 200px;
}
.spacer { height: 50px; }

.clearer { clear: both; }
</style>
