<template>
  <div id="data-selection">
    <b-alert :show="error429" dismissible variant="danger">
      <b>Too many requests</b> The Google Timeline API received too many requests.
      <a href="https://timeline.google.com/">Click here</a> to confirm you are not a robot and try again. If this error
      keeps poppin' up, try limiting the number of requests by reducing the date span.
    </b-alert>
    <b-form inline>
      <b-form-group>
        <b-form-radio-group v-model="type" @input="fetchData()">
          <b-form-radio v-for="Type in Types" :value="Type" :key="Type">{{ Type }}</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <label class="sr-only" for="from-date">From</label>
      <b-form-datepicker
        id="from-date"
        class="mb-2 mr-sm-2 mb-sm-0"
        @input="fetchData()"
        :value-as-date="true"
        v-model="from"
        :start-weekday="1"
        :hide-header="true"
      >
      </b-form-datepicker>
      <label class="sr-only" for="to-date">To</label>
      <b-form-datepicker
        v-if="type === Types.RANGE"
        id="to-date"
        class="mb-2 mr-sm-2 mb-sm-0"
        @input="fetchData()"
        :value-as-date="true"
        v-model="to"
        :hide-header="true"
      >
      </b-form-datepicker>
      <span v-if="fetching">
        <small class="text-muted"><b-spinner small></b-spinner></small>
      </span>
    </b-form>
  </div>
</template>

<script>
import globalOptions from '../services/global_options'
import { getFirstDayOfWeek, getLastDayOfWeek, getFirstDayOfMonth, getLastDayOfMonth } from '../util/date'

const Types = {
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  RANGE: 'Range'
}

export default {
  data() {
    return {
      globalOptions,
      type: Types.DAY,
      Types: Types,
      from: new Date(),
      to: new Date(),
      error429: false,
      fetching: false
    }
  },
  computed: {
    fromDate() {
      switch (this.type) {
        case Types.DAY:
          return new Date(this.from)
        case Types.WEEK:
          return getFirstDayOfWeek(this.from)
        case Types.MONTH:
          return getFirstDayOfMonth(this.from)
        default:
          return new Date(this.from)
      }
    },
    toDate() {
      switch (this.type) {
        case Types.DAY:
          return new Date(this.from)
        case Types.WEEK:
          return getLastDayOfWeek(this.from)
        case Types.MONTH:
          return getLastDayOfMonth(this.from)
        default:
          return new Date(this.to)
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.fetching = true
      this.error429 = false
      chrome.runtime.sendMessage({ from: this.fromDate, to: this.toDate }, response => {
        if (response.error !== null) {
          if (response.error.message.includes('code 429')) {
            this.error429 = true
          }
          this.$bvToast.toast(`Failed to fetch Google timeline data: ${response.error.message}`, {
            title: 'Error',
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
          return
        }
        // Convert dates to dates (Cannot be handled in fetchGoogleTimelineData method due to content background serialization)
        let data = response.data
        data.items = data.items.map(e => {
          e.timeBegin = new Date(e.timeBegin)
          e.timeEnd = new Date(e.timeEnd)
          e.distance = parseInt(e.distance)
          e.duration = parseInt(e.duration)
          return e
        })
        this.$emit('data-updated', data)
        this.fetching = false
      })
    }
  }
}
</script>
<style>
#data-selection {
  margin-top: 10px;
  margin-bottom: 10px;
}
.b-form-datepicker {
  width: 300px !important;
}
</style>
