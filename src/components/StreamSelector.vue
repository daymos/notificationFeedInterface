<template>
  <div class="container">
    <div class="streamSelector">
      <button id='mailServer' v-on:click="emitSelection('mailServer')">mailServer stream</button>
      <button id='dbServer' v-on:click="emitSelection('dbServer')">dbServer stream</button>
      <button id="smsServer" v-on:click="emitSelection('smsServer')">smsServer stream</button>
      <button id="mergeAll" v-on:click="emitSelection('mergeAll')">merge all streams</button>
    </div>
  </div>

</template>


<script>
import eventBus from './eventBus' 

export default {
  name: 'streamSelector',
  methods: {
    emitSelection(streamId){
        eventBus.$emit('streamSelection', streamId )
    } 
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
  border-style:solid;
  border-width: 2px;
  border-radius:5px;
  margin-top: 10px;
}
</style>
