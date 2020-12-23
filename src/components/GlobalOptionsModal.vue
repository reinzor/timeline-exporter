<template>
  <b-modal id="global-options-modal" hide-footer>
    <template #modal-title>
      <b-icon icon="gear-fill" variant="primary" aria-hidden="true"></b-icon> Global options
    </template>
    <label for="start-weekday" class="mt-2">Week starts at:</label>
    <b-form-select
      id="start-weekday"
      v-model="globalOptions.startWeekDay"
      :options="globalOptions.startWeekDayOptions"
    ></b-form-select>
    <label for="group-mode" class="mt-2">Group mode:</label>
    <b-form-select
      id="group-mode"
      v-model="globalOptions.groupMode"
      :options="globalOptions.groupModeOptions"
    ></b-form-select>
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
