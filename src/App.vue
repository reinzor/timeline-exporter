<template>
  <div>
    <global-options-modal />
    <navbar />
    <b-container>
      <data-selection @data-updated="dataUpdated" />
      <b-tabs>
        <b-tab title="Table" active>
          <data-table :data="data" />
        </b-tab>
        <b-tab title="Timesheet">
          <timesheet-table :data="data" />
        </b-tab>
        <b-tab title="Mileage">
          <mileage-table :data="data" />
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import DataSelection from './components/DataSelection'
import DataTable from './components/DataTable'
import GlobalOptionsModal from './components/GlobalOptionsModal'
import TimesheetTable from './components/TimesheetTable'
import MileageTable from './components/MileageTable'

export default {
  components: {
    Navbar,
    DataSelection,
    DataTable,
    GlobalOptionsModal,
    TimesheetTable,
    MileageTable
  },
  data() {
    return {
      data: {
        name: '',
        items: []
      }
    }
  },
  methods: {
    dataUpdated(data) {
      this.data = data
    }
  }
}
</script>

<style>
@media print {
  .nav-tabs li a:not(.active) {
    display: none !important;
  }
}
</style>