<template>

  <div class="text-center progress hide" :class="{ on : state }">
    <v-overlay>
      <v-progress-circular
        indeterminate
        :size="50"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.hide{
  display: none;
}

.on{
  display: block;
}

.progress{
  position: absolute;
  z-index: 9999;
  top: 40%;
  left: 50%;
}


</style>

<script>
import eventBus from '../../plugins/eventBus';

export default {
  name: 'Progress',

  data: () => ({
    state : false
  }),
  created() {
    eventBus.$on('progress-state', (isCheck) => {
      if(this.state != isCheck){
        this.state = isCheck
      }
    })
  },
  methods:{
    showProgress: () => {
      this.state = true;
    },
    hideProgress: () => {
      this.state = false;
    }
  }
};
</script>