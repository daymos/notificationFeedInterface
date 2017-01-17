<template>
  <input v-model='filterParam' v-on:change='updateParent'  type="range" name='showOnlyUnread' min="0" max="1" step="1"  />
</template>


<script>

export default {
  name:'RangeSelector',
  data(){
    return {
      filterParam:'0', 
    };
  },
  methods: {
    updateParent(){
      this.$emit('filter', this.filterParam)
    } 
  }
}

</script>


<style scoped>

</style>
