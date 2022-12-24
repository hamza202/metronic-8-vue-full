<template>
  <div class="field">
    <label v-if="lang" for="name">{{ `${$t(label)} ${$t("in")} ${$t(lang)}` }}</label>
    <label v-else for="name">{{ `${$t(label)}` }}</label>

    <InputCalendar :aria-describedby="`${name}-help`" :class="{ 'p-invalid': errorMessage }" :placeholder="$t(label)"  v-model="valModel" class="w-100" />

    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <p :id="`${name}-help`" class="p-error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent,computed} from 'vue';
import {useField} from 'vee-validate';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {},
  },
  setup(props,{ emit }) {
    const {errorMessage} = useField(props.name);
    function useModelWrapper(props, emit) {
      return computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value)
      })
    }
    return {
      errorMessage,
      valModel: useModelWrapper(props, emit),
    }
  },
  computed: {
    placeHolder() {
      if (this.lang) {
        return `${this.$t(this.label)} ${this.$t("in")} ${this.$t(this.lang)}`
      }
      return  `${this.$t(this.label)}`
    }
  }
})


</script>

