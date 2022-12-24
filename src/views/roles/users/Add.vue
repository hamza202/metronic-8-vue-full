<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body p-9">
      <ToastComp/>

      <FormValidate
          ref="form"
          :validation-schema="schema"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
      >

        <div class="row">
          <div class="col-12">
            <input-with-validation v-model="form.name" :label="'label.name'" name="name"/>
          </div>
          <div class="col-lg-6">
            <input-with-validation v-model="form.email" :label="'label.email'" type="email" name="email"/>
          </div>
          <div class="col-lg-6">
            <input-with-validation v-model="form.mobile" :label="'label.mobile'" type="number" name="mobile"/>
          </div>
          <div class="col-lg-6">
            <input-with-validation v-model="form.password" :label="'label.password'" type="password" name="password"/>
          </div>
          <div class="col-lg-6">
            <input-with-validation v-model="form.password_confirmation" :label="'label.password_confirmation'" type="password" name="password_confirmation"/>
          </div>
          <div class="col-12">
            <multiple-select-with-validation
                v-model="form.roles"
                :options="roleList"
                label="name.roles"
                name="roles"
                optionLabel="name"
                optionValue="id"/>
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
  name: "add-user",
  mixins: [formMixin],
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        mobile: null,
        roles: [],
        status: "active",
      },
      formErrors: {},
      roleList:[],
      errors: null,
    };
  },
  methods: {
    loadData() {
      ApiService.get(`/${this.resource}/${this.resourceId}`).then(res => {
        const {data} = res.data
        const $form = this.form;
        $form.name = data.name;
        $form.email = data.email;
        $form.password = data.password;
        $form.password_confirmation = data.password_confirmation;
        $form.mobile = data.mobile;
        $form.roles = data.roles_ids;
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
          formData.append("name", form.name);
          formData.append("email", form.email);
          if (this.form.password) {
            formData.append("password", form.password);
          }
          if (this.form.password_confirmation) {
            formData.append("password_confirmation", form.password_confirmation);
          }
          formData.append("mobile", form.mobile);
          formData.append("status", form.status);
          if (this.form.roles && this.form.roles.length) {
            this.form.roles.forEach((x, i) => {
              formData.append(`roles[${i}]`, x);
            });
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
    },
    getRoleList() {
      ApiService.get("roles/list").then((response) => {
        let $data = response.data.data;
         this.roleList = $data;
      });
    },
  },
  computed: {
    schema() {
      const yupString = Yup.string();
      const hasValueInPassword = !!this.form.password;
      const requiredOrOptional = this.isEdit ? (hasValueInPassword ? yupString.required() : yupString.notRequired()) : yupString.required();

      return Yup.object().shape({
        name: Yup.string().required().label(this.$t('label.name')),
        email: Yup.string().required().email().label(this.$t('label.email')),
        mobile: Yup.number().required().label(this.$t('label.mobile')),
        password: requiredOrOptional.min(6).label(this.$t('label.password')),
        password_confirmation: requiredOrOptional.oneOf([Yup.ref('password')], this.$t('password_match')).label(this.$t('label.password_confirmation')),
        roles: Yup.array().required().label(this.$t('label.features')).test('test-name', function (value) {
          return value?.length > 0;
        }),

      });
    }
  },
  mounted() {

    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('User')}`, [this.$t('User')]);

  },
  created() {
    this.getRoleList()
    if (this.isEdit) {
      this.loadData();
    }
  }
};
</script>

<style scoped></style>
