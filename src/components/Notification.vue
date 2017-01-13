<template>
  <div v-bind:class="{unread: localData.status === 'unread'}" v-on:click="updateStatus" >
    <div> {{ localData.status }} </div>
    <span> {{ localData.invite }} </span>
  </div>
</template>


<script>
export default {
  name:'Notification',
  props:['localData'],
  methods: {
    updateStatus() {
      this.$emit('read', this.localData.invite_id)
    } 
  }
}
</script>


<style scoped>
.unread {
  color:red;
}
</style>
