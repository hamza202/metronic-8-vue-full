<template>
  <div class="field">
    <label v-if="lang" for="name">{{ `${$t(label)} ${$t("in")} ${$t(lang)}` }}</label>
    <label v-else for="name">{{ `${$t(label)}` }}</label>

    <InputText
        :autocomplete="`new-${name}`"
        :aria-describedby="`${name}-help`"
        :id="name"
        :class="{ 'p-invalid': !required ? errorMessage:'' }"
        :placeholder="placeHolder"
        :type="type"
        :value="modelValue"
        class="w-100"
        @input="$emit('update:modelValue', $event.target.value)"
    />

    <div class="fv-plugins-message-container" v-if="!required">
      <div class="fv-help-block">
        <p :id="`${name}-help`" class="p-error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {useField} from 'vee-validate';

export default defineComponent({
  props: {
    required:{
      type: Boolean,
      required:false,
    },
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
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {}
  },
  setup(props) {
    const {errorMessage} = useField(props.name);
    return {
      errorMessage,
    }
  },
  computed: {
    placeHolder() {
      if (this.lang) {
        return `${this.$t(this.label)} ${this.$t("in")} ${this.$t(this.lang)}`
      }

      return this.$t(this.label)

    }
  }
})


</script>

<style lang="postcss" scoped>
.field * {
  display: block;
}
</style>
