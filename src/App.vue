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

<style lang="scss">
@media print {
  .nav-tabs li a:not(.active) {
    display: none !important;
  }
}

$body-color: #00203fff;
$theme-colors: (
  'primary': #3db2dcff
);
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';

.multiselect__tag {
  background-color: #3db2dcff !important;
}
.multiselect__option--highlight {
  background-color: #3db2dcff !important;
}
.multiselect__option--selected.multiselect__option--highlight {
  background-color: #3db2dcff !important;
}
</style>
