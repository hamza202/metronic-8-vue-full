<template>
  <FormValidate
      ref="form"
      :validation-schema="schema"
      @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
  >
    <div class="card mb-5 mb-xl-10">
      <div class="card-body p-9">
        <ToastComp/>

        <div class="row">
          <div class="col-12">
            <InputWithValidation v-model="form.name" :label="'label.role_name'" name="name"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cols-3 g-xl-5 g-4">
      <div class="col"
           v-for="(item,index) in permissionsList"
           :key="index"
      >
        <div class="card mb-5 mb-xl-10 h-100">
          <div class="card-header pt-5">
            <div class="card-title d-flex align-items-center">
              <CheckBox
                  v-model="selectedAll"
                  :value="index"
                  :inputId="index"
                  class="mb-1 me-2"
                  @change="onChangeSelect(index)"
              ></CheckBox>
              <label :for="index" class="card-label fw-bold text-dark text-capitalize">
                 {{ indexLabel(index) }}
              </label>
            </div>
          </div>
          <div class="card-body p-9 pb-0">
            <div v-for="child in item" class="d-flex  mb-3" :key="child.id">
              <CheckBox
                  v-model="selected"
                  :value="child.id"
                  :inputId="child.name+'_'+child.id"
                  class="mb-1 me-2"
              ></CheckBox>
              <label :for="child.name+'_'+child.id">
                <span class="d-block text-gray-800 text-hover-primary fs-6 fw-bold">{{ indexLabel(child.name) }}</span>
                <small class="d-block text-muted d-block fw-semobold">{{ indexLabel(child.description) }}</small>
              </label>
            </div>
          </div>
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
</template>

<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import formMixin from "@/mixins/formMixin";

export default {
  name: "add-category",
  mixins: [formMixin],
  data() {
    return {
      selected:[],
      selectedAll:[],
      form: {
        name: null,
        permissions: [],
      },
      formErrors: {},
      errors: null,
      permissionsList: []
    };
  },
  watch: {
    selected($val) {
      this.form.permissions = $val
      this.checkAllSelected()
    },
  },
  methods: {
    onChangeSelect(item) {
      if (this.selectedAll.includes(item)) {
        const list = window._.map(this.permissionsList[item], 'id')
        list.forEach(x => {
          if (this.selected.indexOf(x) < 0) {
            this.selected.push(x)
          }
        })
      } else {
        const list = window._.map(this.permissionsList[item], 'id')
        list.forEach(x => {
          this.selected.splice(this.selected.indexOf(x), 1)
        })
      }
    },
    checkForSelectAll(item) {
      const arr1 = this.form.permissions
      const arr2 = window._.map(this.permissionsList[item], 'id')
      const allFounded = window._.every(arr2, ai => arr1.includes(ai))
      if (allFounded) {
        if (!this.selectedAll.includes(item)) {
          this.selectedAll.push(item)
        }
      } else {
        this.selectedAll.splice(this.selectedAll.indexOf(item), 1)
      }
    },
    checkAllSelected() {
      const arr1 = this.form.permissions
      Object.keys(this.permissionsList)
          .forEach(item => {
            const arr2 = window._.map(this.permissionsList[item], 'id')
            const allFounded = window._.every(arr2, ai => arr1.includes(ai))

            if (allFounded && !this.selectedAll.includes(item)) {
              this.selectedAll.push(item)
            }
            if (!allFounded && this.selectedAll.includes(item)) {
              this.selectedAll.splice(this.selectedAll.indexOf(item), 1)
            }
          })
    },
    indexLabel(text) {
      return text?.replace(/-/g, ' ')
    },
    loadPermissions() {
      ApiService.get(`/permissions?guard_name=api`).then(res => {
        const $data = res.data.data
        this.permissionsList = window._.groupBy($data, 'group');
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

          if (this.selected && this.selected.length) {
            this.selected.forEach((x, i) => {
              formData.append(`permissions[${i}]`, x);
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
    loadRole() {
      this.axios.get(`/${this.resource}/${this.resourceId}`)
          .then(res => {
            const $data = res.data.data
            this.selected = $data.permissions.map(x => x.id)
            this.form = {
              name: $data.name,
              permissions: this.selected,
            }
          })
    },
  },
  computed: {
    schema() {
      return Yup.object().shape({
        name: Yup.string().required().label(this.$t('label.role_name')),
      });
    }
  },
  mounted() {
    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('name.roles')}`, [this.$t('name.roles')]);
  },
  created() {
    this.loadPermissions();
    if (this.isEdit) {
      this.loadRole()
    }
  }
};
</script>

<style scoped></style>
