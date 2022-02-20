<template >
  <v-toolbar flat short 
    color="#F06292"
    dark
    max-height="105">
  
        <v-toolbar-title>가계부</v-toolbar-title>
  
        <v-spacer>
          <!-- <v-btn
          @click="fnTest">test</v-btn> -->
        </v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        
    </v-toolbar>
</template>
<script>
export default {
  name: 'AppToolbar',

  data: () => ({
  }),
};
</script>
