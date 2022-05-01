<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div>
        <div>
          <v-icon>mdi-glass-mug-variant</v-icon>
        </div>
        <span>Beer Chooser App</span>
      </div>
    </v-app-bar>

    <v-main>
      <RandomizerComponent :user="userData"/>
    </v-main>
  </v-app>
</template>

<script>
  import { axiosInstance } from '@/apiService/axios.js'
  import RandomizerComponent from './components/RandomizerComponent';

  export default {
    name: 'App',

    components: {
      RandomizerComponent
    },

    data: () => ({
      userData: null
    }),

    created() {
      axiosInstance.get('users/random_user')
      .then(resp => {
        this.userData = resp.data
      })
      .catch(err => console.error(err))
    }
  };
</script>
