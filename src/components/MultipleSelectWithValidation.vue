<template>
  <div class="field">
    <label v-if="lang" for="name">{{ `${$t(label)} ${$t("in")} ${$t(lang)}` }}</label>
    <label v-else for="name">{{ `${$t(label)}` }}</label>
    <MultiSelect v-model="valModel"
                 :aria-describedby="`${name}-help`"
                 :class="{ 'p-invalid': errorMessage }"
                 :optionLabel="optionLabel" :optionValue="optionValue"
                 :options="options"
                 :placeholder="placeHolder"
                 class="w-100"
    >
      <template v-if="ifImages" #option="slotProps">
        <div class="p-multiselect-car-option">
          <i class="size-icon" :class="slotProps.option.icon"></i>
          <span>{{slotProps.option.title}}</span>
        </div>
      </template>

    </MultiSelect>
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <p :id="`${name}-help`" class="p-error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {useField} from 'vee-validate';

export default defineComponent({
  props: {
    ifImages:{
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
    },
    options: {},
    label: {
      type: String,
      required: true,
    },
    modelValue: {},
    optionLabel: {},
    optionValue: {},
  },
  setup(props, {emit}) {
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
      return `${this.$t(this.label)}`
    }
  }
})


</script>

<style scoped>
.size-icon{
  /*font-size: 16px;*/
  width: 20px;
  color: #2196F3;
}
</style>

