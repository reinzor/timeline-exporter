<template>
  <b-form inline id="data-selection">
    <b-form-group>
      <b-form-radio-group v-model="type" @input="fetchData()">
        <b-form-radio v-for="Type in Types" :value="Type" :key="Type">{{ Type }}</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <label class="sr-only" for="from-date">From</label>
    <b-form-datepicker id="from-date" class="mb-2 mr-sm-2 mb-sm-0"
      @input="fetchData()"
      :value-as-date="true"
      v-model="from"
      :hide-header="true">
    </b-form-datepicker>
    <label class="sr-only" for="to-date">To</label>
    <b-form-datepicker id="to-date" class="mb-2 mr-sm-2 mb-sm-0"
      @input="fetchData()"
      :disabled="type != Types.RANGE"
      :value-as-date="true"
      v-model="to"
      :hide-header="true">
    </b-form-datepicker>
    <span v-if="fetching">
      <small class="text-muted"><b-spinner small></b-spinner> Fetching {{ from }} to {{ to }}</small>
    </span>
  </b-form>
</template>

<script>
const Types = {
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  RANGE: 'Range',
};

export default {
  data() {
    return {
      type: Types.DAY,
      Types: Types,
      from: new Date(),
      to: new Date(),
      fetching: false,
    };
  },
  computed: {
    fromDate() {
      switch (this.type) {
        case Types.DAY:
          return new Date(this.from)
        case Types.WEEK:
          return this.getFirstDayOfWeek();
        case Types.MONTH:
          return this.getFirstDayOfMonth();
        case Types.RANGE:
          return new Date(this.from)
      }
    },
    toDate() {
      switch (this.type) {
        case Types.DAY:
          return new Date(this.from)
        case Types.WEEK:
          return this.getLastDayOfWeek();
        case Types.MONTH:
          return this.getLastDayOfMonth();
        case Types.RANGE:
          return new Date(this.to)
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    getFirstDayOfWeek() {
      let date = new Date(this.from);
      let first = date.getDate() - date.getDay();
      return new Date(date.setDate(first)).toUTCString();
    },
    getLastDayOfWeek() {
      let date = new Date(this.from);
      let first = date.getDate() - date.getDay();
      let last = first + 6;
      return new Date(date.setDate(last)).toUTCString();
    },
    getFirstDayOfMonth() {
      return new Date(this.from.getFullYear(), this.from.getMonth(), 1);
    },
    getLastDayOfMonth() {
      return new Date(this.from.getFullYear(), this.from.getMonth() + 1, 0);
    },
    fetchData() {
      this.fetching = true
      chrome.runtime.sendMessage({from: this.fromDate, to: this.toDate}, data => {
        this.$emit('data-updated', data);
        this.fetching = false;
      })
    },
  },
};
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