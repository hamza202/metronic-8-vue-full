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

        <TabView class="mb-4">
          <TabPanel v-for="(item,k,idx) in locales" :key="idx">
            <template #header>
              <span >{{ $t(item) }}</span>
            </template>
            <label class="mb-3">{{ `${$t('label.content')} ${$t("in")} ${$t(item)}` }}</label>
            <primeEditor editorStyle="height: 250px" v-model="form.content[k]">
              <template #toolbar>
                <span class="ql-formats">
                  <select class="ql-size">
                    <option value="small">h4</option>
                                    <!-- Note a missing, thus falsy value, is used to reset to default -->
                    <option value="" selected>h3</option>
                    <option value="large">h2</option>
                    <option value="huge">h1</option>
                  </select>
                </span>
                <span class="ql-formats">
                  <button class="ql-bold"></button>
                  <button class="ql-italic"></button>
                  <button class="ql-underline"></button>
                </span>
                <span class="ql-formats">
                  <select class="ql-color"><option selected="selected"></option><option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option value="#ffffff"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option></select>
                  <select class="ql-background"><option value="#000000"></option><option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option selected="selected"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option></select>
                </span>
                <span class="ql-formats">
                  <button class="ql-list">
                    <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line> <line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line> <line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line> <line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line> <path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path> <path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path> <path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path> </svg>
                  </button>
                  <button class="ql-list">
                    <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line> <line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line> <line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line> <line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line> <line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line> <line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line> </svg>
                  </button>
                  <select class="ql-align">
                    <option selected=""></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                  </select>
                </span>
                <span class="ql-formats">
                  <button class="ql-link">
                    <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> <path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg>
                  </button>
                </span>
              </template>
            </primeEditor>
          </TabPanel>
        </TabView>

        <div class="row">
          <div class="col-lg-6">
            <DropdownWithValidation
                v-model="form.type"
                :disabled="true" :label="'label.type'" :options="typeOption"
                name="type" optionLabel="value" optionValue="id"/>
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
  name: "add-feature",
  mixins: [formMixin],
  data() {
    return {
      avatar: null,
      form: {
        title: {
          ar: null,
          en: null
        },
        content: {
          ar: null,
          en: null
        },
        type: null,
      },
      formErrors: {},
      errors: null,
      typeOption: [],
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
        $form.content = data.content_value;
        $form.type = data.type;
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
          this.localeFieldToFormData(formData, "content", this.form.content);
          formData.append("type", form.type);

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
        type: Yup.string().required(),
      });
    }
  },

  mounted() {
    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('Page')}`, [this.$t('Page')]);
  },
  created() {
    ApiService.get("pages/constants").then((response) => {
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
