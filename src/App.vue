<template>
  <div>
    <navbar />
    <b-container>
      <data-selection @data-updated="dataUpdated" />
        <b-tabs>
          <b-tab title="Table" active>
            <data-table :data="data" />
          </b-tab>
        </b-tabs>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import DataSelection from "./components/DataSelection"
import DataTable from "./components/DataTable"

export default {
  components: {
    Navbar,
    DataSelection,
    DataTable
  },
  data() {
    return {
      data: {
        name: '',
        items: []
      }
    };
  },
  methods: {
    dataUpdated(data) {
      this.data = data
    }
  }
};
</script>