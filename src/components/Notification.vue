<template>
  <div v-bind:class="{unread: localData.status === 'unread'}" v-on:click="updateStatus" >
    <span><strong> {{ grabErrorMessage(localData.invite) }} </strong></span>
    <span> {{ `${formatDate(localData.invite_time)} ago |` }} </span>
    <span> {{ localData.status }} </span>
  </div>
</template>


<script>

import eventBus from './eventBus.vue'
var moment = require('moment');

export default {
  name:'Notification',
  props:['localData'],
  methods: {
    updateStatus() {
      this.$emit('read', this.localData.invite_id)
      eventBus.$emit('bigViewRequested', this.localData)
    },
    grabErrorMessage(str) {
      return str.match(/\[(.*?)\]/)[1] 
    },
    formatDate(data) {
      return moment(data).fromNow(true)
    } 
  },
  components:  {
    eventBus
  }
}
</script>


<style scoped>
.unread {
  color:red;
}
</style>
