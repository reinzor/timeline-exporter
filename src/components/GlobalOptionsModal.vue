<template>
  <b-modal id="global-options-modal" hide-footer>
    <template #modal-title>
      <b-icon icon="gear-fill" variant="primary" aria-hidden="true"></b-icon> Global options
    </template>
    <b-tabs>
      <b-tab title="General" active>
        <label for="group-mode" class="mt-2">Group mode:</label>
        <b-form-select
          id="group-mode"
          v-model="globalOptions.groupMode"
          :options="globalOptions.groupModeOptions"
        ></b-form-select>
        <label for="distance-mode" class="mt-2">Distance mode:</label>
        <b-form-select
          id="distance-mode"
          v-model="globalOptions.distanceMode"
          :options="globalOptions.distanceModeOptions"
        ></b-form-select>
        <label for="auto-fetch" class="mt-2">Auto fetch data:</label>
        <b-form-checkbox id="auto-fetch" v-model="globalOptions.autoFetch" name="check-button" switch>
          <small class="text-muted">On page load &amp; date input change</small>
        </b-form-checkbox>
      </b-tab>
      <b-tab title="CSV export">
        <label for="csv-export-processed-distance" class="mt-2">Export processed distance:</label>
        <b-form-checkbox
          id="csv-export-processed-distance"
          v-model="globalOptions.csvExportProcessedDistance"
          name="check-button"
          switch
        >
          <b-badge variant="secondary">meters</b-badge><small class="text-muted"> vs </small
          ><b-badge variant="primary">kilometers / miles</b-badge>
        </b-form-checkbox>
        <label for="csv-export-processed-duration" class="mt-2">Export processed duration:</label>
        <b-form-checkbox
          id="csv-export-processed-duration"
          v-model="globalOptions.csvExportProcessedDuration"
          name="check-button"
          switch
        >
          <b-badge variant="secondary">milliseconds</b-badge><small class="text-muted"> vs </small
          ><b-badge variant="primary">hh:mm:ss</b-badge>
        </b-form-checkbox>
        <label for="csv-export-local-timezone" class="mt-2">Export dates in local timezone:</label>
        <b-form-checkbox
          id="csv-export-local-timezone"
          v-model="globalOptions.csvExportDatesInLocalTimezone"
          name="check-button"
          switch
        >
        </b-form-checkbox>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import globalOptions from '../services/global_options'

export default {
  data() {
    return {
      globalOptions
    }
  },
  watch: {
    globalOptions: {
      handler() {
        globalOptions.store()
      },
      deep: true
    }
  }
}
</script>
