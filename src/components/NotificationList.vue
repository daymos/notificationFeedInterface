<template>
  <ul>
    <li v-for='n in notifications'>
      <Notification v-bind:localData='n' v-on:read="updateStatus"></Notification>
    </li>
  </ul>
</template>

<script>

import dbData from '../assets/data';
import Notification from './Notification'
import * as _ from 'ramda'
import { updateState } from '../logic/handlers'

export default {
  name: 'notificationList',
  components:{ Notification },
  data(state) {
    return {
      notifications: state || dbData 
    };
  },
  methods: {
    updateStatus(id){
      this.notifications =  updateState(id, this.notifications) 
    } 
  }
};

</script>

<style scoped>
li{
  border-style:solid;
  border-width: 2px;
  margin:5px;
  border-radius:5px;
}

ul {
  list-style-type: none;
}

</style>
