<template>
  <div>
    <b-card-body style="padding-bottom: 0">
      <b-form inline id="data-selection">
        <b-form-group>
          <b-form-radio-group v-model="type">
            <b-form-radio v-for="Type in Types" :value="Type" :key="Type">{{ Type }}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-form>
      <b-row>
        <b-col sm="4"><multiselect v-model="fromNames" :multiple="true" :options="nameOptions"></multiselect></b-col>
        <b-col sm="4"><multiselect v-model="toNames" :multiple="true" :options="nameOptions"></multiselect></b-col>
        <b-col sm="2" style="margin-top: -2px">
          <b-form-checkbox v-model="wayBack">
            <small class="text-muted">Way back</small>
          </b-form-checkbox>
          <b-form-checkbox v-model="overwriteDistance">
            <small class="text-muted">Overwrite distance</small>
          </b-form-checkbox>
        </b-col>
        <b-col sm="2" v-if="overwriteDistance">
          <b-input-group append="km">
            <b-form-input v-model.number="overwrittenDistance" type="number"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-card-body>
    <data-table :data="mileageData" />
  </div>
</template>

<script>
import DataTable from './DataTable'

function show(fromNames, toNames, from, to, wayBack) {
  if ((fromNames.length === 0 || fromNames.includes(from)) && (toNames.length === 0 || toNames.includes(to))) {
    return true
  }
  if (
    wayBack &&
    (fromNames.length === 0 || fromNames.includes(to)) &&
    (toNames.length === 0 || toNames.includes(from))
  ) {
    return true
  }
  return false
}

const Types = {
  DRIVING: 'Driving',
  WALKING: 'Walking',
  CYCLING: 'Cycling'
}

export default {
  components: {
    DataTable
  },
  data() {
    return {
      Types: Types,
      type: Types.DRIVING,
      fromNames: [],
      toNames: [],
      wayBack: false,
      overwriteDistance: false,
      overwrittenDistance: 0,
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
      const mileageItems = []
      for (let i = 1; i < this.data.items.length - 1; ++i) {
        const prevItem = this.data.items[i - 1]
        const item = this.data.items[i]
        const nextItem = this.data.items[i + 1]
        if (item.name === this.type && show(this.fromNames, this.toNames, prevItem.name, nextItem.name, this.wayBack)) {
          mileageItems.push({
            fromName: prevItem.name,
            fromAddress: prevItem.address,
            toName: nextItem.name,
            toAddress: nextItem.address,
            duration: item.duration,
            timeBegin: item.timeBegin,
            timeEnd: item.timeEnd,
            distance: this.overwriteDistance ? this.overwrittenDistance * 1e3 : item.distance
          })
        }
      }

      return {
        name: `mileage_${this.data.name}`,
        items: mileageItems
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
