<template>
  <div class='container'>
    <ul>
      <li v-for='notification in filteredNotifications'>
        <Notification v-bind:localData='notification' v-on:read="updateStatus"></Notification>
      </li>
    </ul>
    <rangeSelector v-on:filter="updateFilterParam"></RangeSelector>
  </div>
</template>


<script>
import  dbData from '../assets/data';
import Notification from './Notification'
import RangeSelector from './RangeSelector';

import * as _ from 'ramda'
import { updateState } from '../logic/handlers.js'
import Rx from 'rxjs/Rx'
import eventbus from './eventBus'


export default {
  name: 'notificationList',
  components:{ Notification, RangeSelector },
  data() {
    return {
      filterParam: '0',
      notifications: [] ,
      update: null,
      dictionary: {
        mailServer: 'localhost:3001/',
        dbServer: 'localhost:3002/',
        smsServer: 'localhost:3003/' 
      },
    }
  },
  methods: {
    updateStatus(id) {
      this.notifications =  updateState(id, this.notifications) 
    },
    updateFilterParam(param){
      this.filterParam = param 
    },
    updateObservable(socketUrl){
      this.notifications = [] 
      if(this.update !== null) this.update.complete()
      let socket = io(this.dictionary[socketUrl])

      this.update = Rx.Observable.fromEvent(socket, 'newInvite').subscribe(el => { 
        this.notifications.push(JSON.parse(el))
        this.notifications = _.sortBy( _.prop('invite_time'))(this.notifications).reverse()
      })
    }
  },
  computed: {
    filteredNotifications(){
      return (this.filterParam === '0') ? this.notifications : 
        this.notifications.filter(el => el.status === 'unread') ; 
    }
  },
  created: function() {
    eventbus.$on('streamSelection', this.updateObservable) 
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
