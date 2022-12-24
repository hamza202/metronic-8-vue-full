<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body p-9">
      <ToastComp/>
      <FormValidate
          ref="form"
          v-slot="{ errors }"
          :validation-schema="schema"
          autocomplete="off"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
      >
        <TabView @keyup="onInvalidChange(errors)">
          <TabPanel v-for="(item,k,idx) in locales" :key="idx">
            <template #header>
              <span :class="{ 'text-danger': formErrors['question'+k]}">{{ $t(item) }}</span>
            </template>
            <InputWithValidation v-model="form.question[k]" :label="'label.question'" :lang="item" :name="'question'+k"/>
          </TabPanel>
        </TabView>

        <TabView @keyup="onInvalidChange(errors)">
          <TabPanel v-for="(item,k,idx) in locales" :key="idx">
            <template #header>
              <span :class="{ 'text-danger': formErrors['answer'+k]}">{{ $t(item) }}</span>
            </template>
            <text-area-with-validation v-model="form.answer[k]" :label="'label.answer'" :lang="item" :name="'answer'+k"/>
          </TabPanel>
        </TabView>

        <div class="row">
          <div class="col-lg-6">
            <DropdownWithValidation
                v-model="form.category"
                :label="'label.category'" :options="categoryOption"
                name="category" optionLabel="value" optionValue="id"/>
          </div>
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

export default {
  name: "add-faq",

  mixins: [formMixin],
  data() {
    return {
      avatar: null,
      form: {
        question: {
          ar: null,
          en: null
        },
        answer: {
          ar: null,
          en: null
        },
        category: null,
        status: "active",
      },
      formErrors: {},
      errors: null,
      categoryOption: [],
      MultipleUploadImgState: false
    };
  },
  watch: {

  },

  methods: {
    loadData() {
      ApiService.get(`/${this.resource}/${this.resourceId}`).then(res => {
        const {data} = res.data
        const $form = this.form;
        $form.question = data.question_value;
        $form.answer = data.answer_value;
        $form.category = data.category;
        $form.status = data.status
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
          this.localeFieldToFormData(formData, "question", this.form.question);
          this.localeFieldToFormData(formData, "answer", this.form.answer);
          formData.append("status", form.status);
          formData.append("category", form.category);
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
        questionen: Yup.string().required().label(this.$t('label.question')),
        questionar: Yup.string().required().label(this.$t('label.question')),
        answeren: Yup.string().required().label(this.$t('label.answer')),
        answerar: Yup.string().required().label(this.$t('label.answer')),
        category: Yup.string().required().label(this.$t('label.category')),
      });
    }
  },

  mounted() {
    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('FAQ')}`, [this.$t('FAQ')]);
  },
  created() {
    ApiService.get("faqs/constants").then((response) => {
      let $data = response.data.data;
      this.categoryOption = $data.categories;
    });
    if (this.isEdit) {
      this.loadData();
    }
  }
};
</script>

<style scoped></style>
