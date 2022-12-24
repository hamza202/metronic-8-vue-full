<template>
  <div class="position-relative">
    <label :label="label" class="d-block img-prev-label" :class="{ 'p-invalid': errorMessage }">
      <div
          class="custom-img dropzone dropzone-default dropzone-brand dz-clickable"
          :class="modelValue ? 'show-img' : ''"
      >
        <div class="dropzone-msg dz-message needsclick">
          <p class="dropzone-msg-title">
            {{ title }}
          </p>
          <span class="dropzone-msg-desc">{{ text }}</span>
        </div>

        <input
            type="file"
            class="input-file"
            accept=".jpg,.jpeg,.png"
            @input="onFileChange"
        >
        <img
            v-if="imgPreview"
            :src="imgPreview"
            class="img"
            alt="image"
        >
      </div>
    </label>
    <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="delete-icon"
        @click="deleteImage"
    >
      <path
          d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
      />
    </svg>
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <p :id="`${name}-help`" class="p-error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import {useField} from "vee-validate";

export default {
  props: {
    modelValue: {},
    name: {
      type: String,
    },
    label: {
      default: 'Image',
    },
    title: {
      default: 'Drop files here or click to upload.',
    },
    text: {
      default: '',
    },
  },
  data() {
    return {
      imgPreview: this.modelValue,
    }
  },
  watch: {
    modelValue($val) {
     this.imgPreview = this.testIfImage($val)
    },
  },
  setup(props) {
    const {errorMessage} = useField(props.name);
    return {
      errorMessage,
    }
  },
  methods: {
    testIfImage($val){
      if($val instanceof File){
        return this.createInput($val)
      }else {
       return  typeof($val) === 'string' ? $val : null
      }
      // this.imgPreview = $val instanceof File ? this.createInput($val) : typeof($val) === 'string' ? $val : null
    },
    deleteImage() {
      this.$emit('update:modelValue', null)
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const $file = files[0]
      this.$emit('update:modelValue', $file)
      this.createInput($file)
    },
    createInput(file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.imgPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>

<style lang="scss" scoped>
.img-prev-label.p-invalid{
  .custom-img{
    border-color: var(--kt-danger);
  }
}
.custom-img {
  position: relative;
  border: 1px dashed #767676;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;

  p {
    margin-bottom: 0;
  }

  .input-file {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    z-index: 3;
  }

  .img {
    margin: 0 auto;
    max-width: 100%;
    height: 180px;
    display: none;
  }
.dropzone{
  background-color: var(--kt-input-solid-bg);
}
  &.show-img {
    padding: 0;

    .dropzone-msg {
      display: none;
    }

    .img {
      display: block;
    }
  }


}
.delete-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 8;
  cursor: pointer;
  width: 18px;

  path {
    fill: var(--kt-danger);
  }
}
</style>
