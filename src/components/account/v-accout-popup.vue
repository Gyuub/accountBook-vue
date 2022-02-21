<template>
  <div>
    <v-list dense>
      <v-subheader
        class="">나의 가계부</v-subheader>
      <v-list-item-group
        v-model="selectId"
        mandatory
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item.id"
        >
          <v-list-item-icon>
            <v-icon>{{isSelection(item.id)}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<style scoped>
  
</style>

<script>
import mixin from '@/plugins/mixin';

export default {
  mixins:[mixin],
  name: 'v-account-popup',

  data: () => ({
    selectId: 1,
    items: [
      { id: 1, name: '나만의 가계부', icon: 'mdi-clock' },
      { id: 2, name: '가계부 테스트', icon: 'mdi-account' },
      { id: 3, name: '가계부 테스트2', icon: 'mdi-flag' },
    ],
  }),
  created() {
  },
  watch: {
   
    
  },
  methods:{
    isSelection(param){
      return param == this.selectId ? 'mdi-book-open-variant' : 'mdi-book'
    }
  }
};
</script>