<template>
  <div class='container'>
    <ul>
      <li v-for='notification in filteredNotifications'>
        <Notification v-bind:localData='notification' v-on:read="updateStatus"></Notification>
      </li>
    </ul>
    <RangeSelector v-on:filter="updateFilterParam"></RangeSelector>
  </div>
</template>


<script>
import  dbData from '../assets/data';
import Notification from './Notification'
import RangeSelector from './RangeSelector';

import * as _ from 'ramda'
import { updateState } from '../logic/handlers'
import Rx from 'rxjs/Rx'

const socket = io('localhost:3000/')


export default {
  name: 'notificationList',
  components:{ Notification, RangeSelector },
  data() {
    return {
      filterParam: '0',
      notifications: [] ,
      update:  Rx.Observable.fromEvent(socket, 'newInvite').subscribe(el => { this.notifications.push(JSON.parse(el))})
    }
  },
    methods: {
      updateStatus(id) {
        this.notifications =  updateState(id, this.notifications) 
      },
      updateFilterParam(param){
        this.filterParam = param 
      }
    },
    computed: {
      filteredNotifications(){
        return (this.filterParam === '0') ? this.notifications : 
          this.notifications.filter(el => el.status === 'unread') ; 
      }
    }
  }
  </script>



  <style scoped>
  li {
    border-style:solid;
    border-width: 2px;
    margin:5px;
    border-radius:5px;
  }
  ul {
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
    height:300px;
    overflow:auto;
    border-style:solid;
    border-width: 2px;
    border-radius:5px;
  }
  .container {
    padding: 10px; 
  }
  </style>
