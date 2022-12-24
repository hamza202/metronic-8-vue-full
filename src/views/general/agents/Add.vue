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
              <span :class="{ 'text-danger': formErrors['title'+k]}">{{ $t(item) }}</span>
            </template>
            <InputWithValidation v-model="form.title[k]" :label="'label.title'" :lang="item" :name="'title'+k"/>
          </TabPanel>
        </TabView>

        <TabView @keyup="onInvalidChange(errors)">
          <TabPanel v-for="(item,k,idx) in locales" :key="idx">
            <template #header>
              <span :class="{ 'text-danger': formErrors['about'+k]}">{{ $t(item) }}</span>
            </template>
            <InputWithValidation v-model="form.about[k]" :label="'label.about'" :lang="item" :name="'about'+k"/>
          </TabPanel>
        </TabView>

        <div class="row">
          <div class="col-lg-6">
            <DropdownWithValidation
                v-model="form.type"
                :label="'label.type'" :options="typeOption"
                name="type" optionLabel="value" optionValue="id"/>
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
        <div class="row mt-4">
          <div class="col-lg-6">
            <InputWithValidation v-model="form.manager_name" :label="'label.manager_name'" :name="`manager_name`"/>
          </div>
          <div class="col-lg-6">
            <InputWithValidation v-model="form.manager_email" :label="'label.manager_email'" :name="`manager_email`"
                                 type="email"/>
          </div>
          <div class="col-lg-6">
            <InputWithValidation v-model="form.manager_mobile" :label="'label.manager_mobile'" :name="`manager_mobile`"
                                 type="number"/>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <InputWithValidation v-model="form.register_no" :label="'label.register_no'" :name="`register_no`"
                                 type="number"/>
          </div>
          <div class="col-lg-6">
            <CalendarWithValidation v-model="form.register_expire_date" label="label.register_expire_date"
                                    name="register_expire_date"
            />
          </div>

        </div>
        <div class="row">
          <div class="col-lg-6">
            <InputWithValidation v-model="form.vat_no" :label="'label.vat_no'" :name="`vat_no`" type="number"/>
          </div>

          <div class="col-lg-6">
            <CalendarWithValidation v-model="form.vat_expire_date" label="label.vat_expire_date"
                                    name="vat_expire_date"
            />
          </div>

        </div>

        <div class="row">
          <div class="col-lg-6">
            <InputWithValidation v-model="form.license_no" :label="'label.license_no'" :name="`license_no`"/>
          </div>
          <div class="col-lg-6">
            <InputWithValidation v-model="form.website" :label="'label.website'" :name="`website`"/>
          </div>
          <div class="col-lg-6">
            <InputWithValidation v-model="form.email" :label="'label.email'" :name="`email`"/>
          </div>
        </div>

        <ImagePreview class="mt-4" v-model="avatar" name="avatar" :label="'Logo'">

        </ImagePreview>

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
import ImagePreview from "@/components/ImagePreview";
import CalendarWithValidation from "@/components/CalendarWithValidation";
import formMixin from "@/mixins/formMixin";

export default {
  name: "add-feature",
  components: {CalendarWithValidation, ImagePreview},
  mixins: [formMixin],
  data() {
    return {
      avatar: null,
      form: {
        title: {
          ar: null,
          en: null
        },
        about: {
          ar: null,
          en: null
        },
        type: null,
        logo: null,
        status: "active",
        manager_name: null,
        manager_email: null,
        manager_mobile: null,
        register_no: null,
        register_expire_date: null,
        vat_no: null,
        vat_expire_date: null,
        website: null,
        email: null,
        license_no: null,
      },
      formErrors: {},
      image: null,
      errors: null,
      typeOption: [],
      MultipleUploadImgState: false
    };
  },
  watch: {
    avatar(val) {
      if (val) {
        this.form.logo = val
      } else {
        this.form.logo = 'delete'
      }
    },
  },

  methods: {
    loadData() {
      ApiService.get(`/${this.resource}/${this.resourceId}`).then(res => {
        const {data} = res.data
        const $form = this.form;
        $form.title = data.title_value;
        $form.about = data.about_value;
        $form.type = data.type;
        $form.manager_name = data.manager_name;
        $form.manager_email = data.manager_email;
        $form.manager_mobile = data.manager_mobile;
        $form.register_no = data.register_no;
        $form.register_expire_date = data.register_expire_date;
        $form.vat_no = data.vat_no;
        $form.vat_expire_date = data.vat_expire_date;
        $form.website = data.website;
        $form.email = data.email;
        $form.status = data.status
        $form.license_no = data.license_no
        this.avatar = data.logo
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
          this.localeFieldToFormData(formData, "about", this.form.about);
          formData.append("status", form.status);
          formData.append("type", form.type);
          formData.append("manager_name", form.manager_name);
          formData.append("manager_email", form.manager_email);
          formData.append("manager_mobile", form.manager_mobile);
          formData.append("register_no", form.register_no);
          formData.append("register_expire_date", this.dateFormatter(form.register_expire_date));
          formData.append("vat_no", form.vat_no);
          formData.append("vat_expire_date", this.dateFormatter(form.vat_expire_date));
          formData.append("email", form.email);
          formData.append("license_no", form.license_no);
          if (this.form.website) {
            formData.append("website", this.form.website);
          }
          if (this.form.logo instanceof File) {
            formData.append("logo", this.form.logo);
          }
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
        abouten: Yup.string().required().label(this.$t('label.about')),
        aboutar: Yup.string().required().label(this.$t('label.about')),
        type: Yup.string().required(),
        manager_name: Yup.string().required().label(this.$t('label.manager_name')),
        manager_email: Yup.string().required().email().label(this.$t('label.manager_email')),
        manager_mobile: Yup.number().required().label(this.$t('label.manager_mobile')),
        license_no: Yup.number().required().label(this.$t('label.license_no')),
        register_no: Yup.number().required().label(this.$t('label.register_no')),
        register_expire_date: Yup.string().required().label(this.$t('label.register_expire_date')),
        vat_no: Yup.number().required().label(this.$t('label.vat_no')),
        vat_expire_date: Yup.string().required().label(this.$t('label.vat_expire_date')),
        website: Yup.string().notRequired().url().label(this.$t('label.website')),
        email: Yup.string().required().email().label(this.$t('label.email')),
        avatar: Yup.mixed().required('File is required'),

      });
    }
  },

  mounted() {
    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('Agent')}`, [this.$t('Agent')]);
  },
  created() {
    ApiService.get("agents/constants").then((response) => {
      let $data = response.data.data;
      this.typeOption = $data.types;
    });
    if (this.isEdit) {
      this.loadData();
    }
  }
};
</script>

<style scoped></style>
