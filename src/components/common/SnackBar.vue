<template>

  <div>
    <v-snackbar
        v-model="state"
        :bottom="y === 'bottom'"
        :color="color"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn
          dark
          text
          @click="state = false"
        >
          Close
        </v-btn>
      </v-snackbar>
  </div>
</template>

<style scoped>
</style>

<script>
import eventBus from '@/plugins/eventBus';

export default {
  name: 'SnackBar',

  data: () => ({
      color: 'success',
      mode: '',
      state: false,
      text: 'alert',
      timeout: 3000,
      x: null,
      y: 'bottom',
  }),
  created() {
    eventBus.$on('snackbar-state', (obj) => {
      if(this.state != obj.state){
        this.state = obj.state
        this.text = obj.text
        this.color = obj.color
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