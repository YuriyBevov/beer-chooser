<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          elevation="2"
          outlined
        >
          <v-list-item three-line v-if="this.$props.user !== null" class="flex-column flex-sm-row">
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
              class="rounded-pill"
            >
              <img
                :src="this.$props.user.avatar"
                alt="user_avatar"
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{this.$props.user.first_name}} {{this.$props.user.last_name}}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{this.$props.user.address.country}},{{this.setAge()}}
              </v-list-item-title>
              <v-list-item-subtitle>{{this.$props.user.employment.title}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              v-if="!isBeerChoosen && !isBeerChoosed"
              @click="getBeer()"
            >
              Get beer !
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>

      <v-col cols="12" v-if="isBeerChoosen">
        <v-card
          elevation="2"
          outlined
        >        
          <v-list two-line>
            <v-subheader>Your random sort of beer:</v-subheader>

            <v-list-item class="flex flex-column align-start">
              <span>Brand: {{beerData.brand}}</span>
              <span>Name: {{beerData.name}}</span>
              <span>Style: {{beerData.style}}</span>
              <span>Hop {{beerData.hop}}</span>
              <span>Yeast {{beerData.yeast}}</span>
              <span>Malts {{beerData.malts}}</span>
              <span>Ibu {{beerData.ibu}}</span>
              <span>Alcohol {{beerData.alcohol}}</span>
              <span>Blg {{beerData.blg}}</span>
            </v-list-item>
          </v-list>         

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="getBeer()"
            >
              Dismiss and get other !
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { axiosInstance } from '../apiService/axios.js'
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'

  export default {
    name: 'RandomizerComponent',

    data: () => ({
      isBeerChoosed: false,
      isBeerChoosen: false,
      beerData: null
    }),

    props: {
      user: { type: Object }
    },

    methods: {
      getBeer() {
        !this.isBeerChoosed ? this.isBeerChoosed = true : null
        this.isBeerChoosen ? this.isBeerChoosen = false : null

        axiosInstance.get('beer/random_beer')
        .then(resp => {
          this.beerData = resp.data
          this.isBeerChoosen = true
        })
        .catch(err => console.error(err))
      },

      setAge() {
        dayjs.extend(relativeTime)
        return dayjs(this.$props.user.date_of_birth).fromNow(true)
      }
    },
  }
</script>
