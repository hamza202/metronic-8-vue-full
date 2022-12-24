<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body p-9">
      <ToastComp/>

      <FormValidate
          ref="form"
          v-slot="{ errors }"
          :validation-schema="schema"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
      >
        <TabView @keyup="onInvalidChange(errors)">
          <TabPanel v-for="(item,k,idx) in locales" :key="idx">
            <template #header>
              <span :class="{ 'text-danger': formErrors['title'+k]}">{{ $t(item) }}</span>
            </template>
            <InputWithValidation v-model="form.title[k]" :label="'label.title'" :lang="item" :name="'title'+k"/>
          </TabPanel>
        </TabView>
        <div class="row">
          <div class="col-lg-6">
            <div class="field">
              <label class="d-block">
                Status
              </label>
              <InputSwitch
                  v-model="form.status"
                  class="mb-4"
                  falseValue="inactive"
                  trueValue="active"
              />
            </div>
          </div>
        </div>
        <vue3-icon-picker v-model="form.icon" class="icon"></vue3-icon-picker>
        <button
            id="submit_btn"
            class="btn btn-primary mt-4"
            type="submit"
        >
          <span class="indicator-label"> {{ $t(this.saveBtnText) }} </span>
          <span class="indicator-progress">
              {{ $t('please_wait') }}
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </FormValidate>

    </div>
  </div>
</template>

<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import formMixin from "@/mixins/formMixin";
import Vue3IconPicker from "@/components/Vue3IconPicker";

export default {
  name: "add-category",
  components: {Vue3IconPicker},
  mixins: [formMixin],
  data() {
    return {
      form: {
        title: {
          ar: null,
          en: null
        },
        icon: 'far fa-grin-hearts',
        status: "active",
      },
      formErrors: {},
      image: null,
      errors: null,
      MultipleUploadImgState: false
    };
  },
  watch: {},
  methods: {
    loadData() {
      ApiService.get(`/${this.resource}/${this.resourceId}`).then(res => {
        const {data} = res.data
        const $form = this.form;
        $form.title = data.title_value;
        $form.status = data.status
        $form.icon = data.icon
      })
    },
    onSubmit() {
      let formData = new FormData();

      let $url = `/${this.resource}`;
      if (this.isEdit) {
        $url = `/${this.resource}/${this.resourceId}`
      }
      this.$refs["form"].validate().then((result) => {
        if (result) {
          document.getElementById('submit_btn').setAttribute('data-kt-indicator', 'on');
          let form = this.form;
          this.localeFieldToFormData(formData, "title", this.form.title);
          formData.append("status", form.status);
          formData.append("icon", this.form.icon);
          if (this.isEdit) {
            formData.append('_method', 'put')
          }
          ApiService.post($url, formData).then((response) => {
            document.getElementById('submit_btn').removeAttribute('data-kt-indicator');
            this.afterSubmit(response.data.message, this.resource, {})
          }).catch(({response}) => {
            this.formErrors = response.data.errors;
            this.showErrorsInToastr(response.data.errors)
            document.getElementById('submit_btn').removeAttribute('data-kt-indicator');
          })

        }
      });
    },
    onInvalidChange(e) {
      this.formErrors = e;
    },
    onInvalidSubmit({errors}) {
      this.formErrors = errors;
    }
  },
  computed: {
    schema() {
      return Yup.object().shape({
        titleen: Yup.string().required().label(this.$t('label.title')),
        titlear: Yup.string().required().label(this.$t('label.title')),
        // avatar: Yup.mixed().required('File is required'),

      });
    }
  },
  mounted() {

    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('Category')}`, [this.$t('Category')]);

  },
  created() {
    if (this.isEdit) {
      this.loadData();
    }
  }
};
</script>

<style scoped>
.icon {
  font-size: 70px;
}
</style>
