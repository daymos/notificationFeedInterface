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
import dbData from '../assets/data';
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
      update: [],
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
      if(this.notifications.length > 0) this.update.complete()
      this.notifications = []
      let socket = io(this.dictionary[socketUrl])

      switch(socketUrl){
        case 'mailServer':
          this.update = Rx.Observable.fromEvent(socket, 'newInvite')
            .map(el => JSON.parse(el)) 
            .bufferCount(5)
            .subscribe(el => { 
              this.notifications = this.notifications.concat(el) 
              this.notifications = _.sortBy( _.prop('invite_time'))(this.notifications).reverse()
            })
            break;
          case 'dbServer':
            //buffer and concat
            this.update = Rx.Observable.fromEvent(socket, 'newInvite')
              .map(el => JSON.parse(el)) 
              .subscribe(el => { 
                this.notifications = this.notifications.concat(el) 
                this.notifications = _.sortBy( _.prop('invite_time'))(this.notifications).reverse()
              })

              break;
            case 'smsServer':
              //show as is
              this.update = Rx.Observable.fromEvent(socket, 'newInvite')
                .map(el => JSON.parse(el)) 
                .subscribe(el => { 
                  this.notifications = this.notifications.concat(el) 
                  this.notifications = _.sortBy( _.prop('invite_time'))(this.notifications).reverse()
                })
                break;
              case 'mergeAll':
              let socket1 = io(this.dictionary.mailServer)
              let socket2 = io(this.dictionary.dbServer)
              let socket3 = io(this.dictionary.smsServer)

              this.update = Rx.Observable.fromEvent(socket1, 'newInvite')
                .merge(Rx.Observable.fromEvent(socket2, 'newInvite'))
                .merge(Rx.Observable.fromEvent(socket3, 'newInvite'))
                .map(el => JSON.parse(el)) 
                .subscribe(el => { 
                  this.notifications = this.notifications.concat(el) 
                  this.notifications = _.sortBy( _.prop('invite_time'))(this.notifications).reverse()
                })
              break;
            default:
              console.log(socketUrl)
      }
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
