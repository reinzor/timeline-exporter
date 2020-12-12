<template>
  <b-card-body>
    <b-form inline id="data-selection">
      <b-form-group>
        <b-form-radio-group v-model="type">
          <b-form-radio v-for="Type in Types" :value="Type" :key="Type">{{ Type }}</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-form>
    <multiselect v-model="fromNames" :multiple="true" :options="nameOptions"></multiselect>
    <multiselect v-model="toNames" :multiple="true" :options="nameOptions"></multiselect>
    <hr />
    <span class="text-muted" v-if="mileageData.durationSum > 0">
      {{ mileageData.distanceSum | kilometers }} -
      {{ mileageData.durationSum | duration('humanize') }}
      ({{ mileageData.durationSum | duration('asHours') | round(2) }} hours)
    </span>
    <hr />
    <div v-for="data in mileageData.dataArray" :key="data.name">
      <hr />
      <b-table striped hover :items="data.items">
        <template #cell(timeBegin)="data">
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | moment('calendar') }}</span>
        </template>
        <template #cell(timeEnd)="data">
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | moment('calendar') }}</span>
        </template>
        <template #cell(duration)="data">
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | duration('humanize') }}</span>
        </template>
        <template #cell(distance)="data">
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | kilometers }}</span>
        </template>
      </b-table>
    </div>
  </b-card-body>
</template>

<script>
const Types = {
  DRIVING: 'Driving',
  WALKING: 'Walking'
}

export default {
  data() {
    return {
      Types: Types,
      type: Types.DRIVING,
      fromNames: [],
      toNames: [],
      fields: [
        { key: 'name', sortable: true },
        { key: 'timeBegin', sortable: true },
        { key: 'timeEnd', sortable: true },
        { key: 'duration', sortable: true },
        { key: 'category', sortable: true }
      ]
    }
  },
  computed: {
    nameOptions() {
      return Array.from(new Set(this.data.items.map(i => i.name)))
    },
    mileageData() {
      let distanceSum = 0
      let durationSum = 0
      const mileageItems = []
      for (let i = 1; i < this.data.items.length - 1; ++i) {
        const prevItem = this.data.items[i - 1]
        const item = this.data.items[i]
        const nextItem = this.data.items[i + 1]
        if (item.name === this.type) {
          if (this.fromNames.length > 0 && !this.fromNames.includes(prevItem.name)) {
            continue
          }
          if (this.toNames.length > 0 && !this.toNames.includes(nextItem.name)) {
            continue
          }
          mileageItems.push({
            fromName: prevItem.name,
            toName: nextItem.name,
            duration: item.duration,
            timeBegin: item.timeBegin,
            timeEnd: item.timeEnd,
            distance: item.distance
          })
          distanceSum += item.distance
          durationSum += item.duration
        }
      }

      return {
        dataArray: [
          {
            name: 'all',
            items: mileageItems
          }
        ],
        durationSum,
        distanceSum
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
