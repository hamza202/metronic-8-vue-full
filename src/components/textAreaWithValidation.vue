<template>
  <div class="field">
    <label v-if="lang" for="name">{{ `${$t(label)} ${$t("in")} ${$t(lang)}` }}</label>
    <label v-else for="name">{{ `${$t(label)}` }}</label>

    <TextArea
        :style="`max-height: ${maxHeight}px`"
        :autocomplete="`new-${name}`"
        :aria-describedby="`${name}-help`"
        :id="name"
        :class="{ 'p-invalid': errorMessage }"
        :placeholder="placeHolder"
        :value="modelValue"
        class="w-100"
        :autoResize="resize"
        :rows="rows"
        @input="$emit('update:modelValue', $event.target.value)"
    />

    <div class="fv-plugins-message-container">
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
    maxHeight:{},
    resize:{
      default: false
    },
    rows:{},
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
    // const emit = defineEmits(['update:modelValue'])
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
