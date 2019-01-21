<template>
  <div class="dashboard container">
    <!--<nav class="navbar navbar-dark bg-dark">-->
      <!--<a class="navbar-brand" href="#">-->
        <!--<img src="https://a.storyblok.com/f/39898/1024x1024/dea4e1b62d/vue-js_logo-svg.png" width="40" height="40">-->
      <!--</a>-->
      <!--<div>-->
        <!--<img :src="$auth.user.picture" width="30" height="30">-->
        <!--<span class="text-muted font-weight-light px-2">{{$auth.user.name}}</span>-->
        <!--<button type="button" class="btn btn-outline-secondary btn-sm" @click="$auth.logout()">Logout</button>-->
      <!--</div>-->
    <!--</nav>-->

    <!--<div class="card mb-3">-->
      <!--<div class="container p-2">-->
        <!--<h1 class="display-6">Hello, {{$auth.user.name}}!</h1>-->
      <!--</div>-->
    <!--</div>-->
    <div>
      <youtube :video-id="videoId" @ready="ready" @paused="pause"></youtube>
    </div>

    <div class="row my-3">
      <div class="col-12">
        <div class="card">
          <div class="row d-flex align-items-center p-2">
            <div class="col-2 border-right">
              <label>Time start: </label>
              <h5>{{getTimeInMinutes(timeStart)}}s</h5>
            </div>
            <div class="col-8 text-left border-right">
              <div class="input-group-sm">
                <label>Description: </label>
                <input type="text" class="form-control" @keyup.enter="addRecord()" v-model="description"/>
              </div>
            </div>
            <div class="col-2 d-flex flex-column">
              <button class="btn btn-secondary btn-sm mb-1" v-on:click="getTime()">Get current time</button>
              <button class="btn btn-primary btn-sm" v-on:click="addRecord()">Save record</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="recordList.length">
      <div class="col-12">
        <div class="card mb-5">
          <div class="card-body">
            <table class="table table-striped table-sm">
              <thead class="thead-dark">
              <tr>
                <th>No</th>
                <th>Time start</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(record, index) in recordList" v-bind:key="record.id">
                <td>{{index + 1}}</td>
                <td>
                  <span class="link" @click="goToTime(record.timeStart)">
                  {{getTimeInMinutes(record.timeStart)}}s
                  </span>
                </td>
                <td>{{record.description}}</td>
                <td>
                  <button type="button" class="btn btn-sm">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button type="button" class="btn btn-sm" @click="deleteRecord(record.id)">
                    <i class="fas fa-times"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data () {
      return {
        stories: [],
        videoId: 'M7lc1UVf-VE',
        player: '',
        timeStart: '0',
        description: '',
        recordList: [],
        id: 0
      }
    },
    mounted () {
    },
    computed: {},
    methods: {
      ready (event) {
        console.log('ready')
        this.player = event.target
        console.log(event)
      },
      pause () {
        this.roundAndSetTime()
      },
      getTime () {
        this.roundAndSetTime()
      },
      roundAndSetTime () {
        let time = Math.floor(this.player.getCurrentTime())
        this.timeStart = time
      },
      addRecord () {
        const record = { timeStart: this.timeStart, description: this.description, id: this.id }
        this.recordList.push(record)
        this.id++
        this.description = ''
      },
      deleteRecord (recordId) {
        const recordToDel = this.recordList.findIndex(e => e.id === recordId)
        this.recordList.splice(recordToDel, 1)
      },
      getTimeInMinutes (time) {
        if (time > 60) {
          const minutes = Math.floor(time / 60)
          const seconds = time - minutes * 60
          const timeInMin = minutes + ':' + seconds
          return timeInMin
        } else {
          return time.toString()
        }
      },
      goToTime (time) {
        this.player.pauseVideo()
        this.player.seekTo(time)
      }
    }
  }

</script>

<style scoped lang="scss">
  .border-right {
    border-right: 1px solid lightgray;
  }

  .link {
    color: #007bff;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
