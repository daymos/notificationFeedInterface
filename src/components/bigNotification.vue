<template>
  <div class="bigView">
    <div class="inner">
      <div class="wrapDetails">
        <div class="invite">{{localData.invite}}</div>  
        <span class="sender">{{localData.sender_id}}</span>  
        <span class="vector">{{localData.vector}}</span>  
        <span class="when">{{when(localData.invite_time)}}</span>  
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from './eventBus.vue'
var moment = require('moment');

export default {
  name:'bigNotification',
  data:function() {
    return {
      localData:'click on an invitation on the right',
    }
  },
  methods:{
    update(data){
      this.localData = data 
    },
    when(ms) {
      return (ms)? moment(ms).fromNow(true) : '' 
    }
  },
  created: function(){
    eventBus.$on('bigViewRequested', this.update) 
  },
  components:{
    eventBus 
  }
}
</script>

<style scoped>
.inner {
  width: 100%;
  height: 100%;
  border-style:solid;
  border-width: 2px;
  border-radius:5px;
  position: relative;
}

.bigView {
  padding: 10px;
  float:left;
  width: 60%;
  height: 200px;
}

.wrapDetails {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
}
.sender {
  font-weight: bold; 
}

.vector {
  color: blue;  
}

</style>
