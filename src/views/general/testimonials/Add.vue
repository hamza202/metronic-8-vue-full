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
              <span :class="{ 'text-danger': formErrors['name'+k]}">{{ $t(item) }}</span>
            </template>
            <InputWithValidation v-model="form.name[k]" :label="'label.name'" :lang="item" :name="'name'+k"/>
          </TabPanel>
        </TabView>

        <TabView @keyup="onInvalidChange(errors)">
          <TabPanel v-for="(item,k,idx) in locales" :key="idx">
            <template #header>
              <span :class="{ 'text-danger': formErrors['details'+k]}">{{ $t(item) }}</span>
            </template>
            <InputWithValidation v-model="form.details[k]" :label="'label.details'" :lang="item" :name="'details'+k"/>
          </TabPanel>
        </TabView>

        <div class="row">
          <div class="col-lg-6">
            <DropdownWithValidation
                v-model="form.rating"
                :label="'label.rating'" :options="ratingOptions"
                name="rating" optionLabel="value" optionValue="id"/>
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
        <ImagePreview class="mt-4" v-model="avatar" name="avatar" :label="'Image'">

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
import formMixin from "@/mixins/formMixin";

export default {
  name: "add-feature",
  components: { ImagePreview},
  mixins: [formMixin],
  data() {
    return {
      avatar: null,
      form: {
        name: {
          ar: null,
          en: null
        },
        details: {
          ar: null,
          en: null
        },
        rating: null,
        image: null,
        status: "active",
      },
      formErrors: {},
      image: null,
      errors: null,
      ratingOptions: [],
      MultipleUploadImgState: false
    };
  },
  watch: {
    avatar(val) {
      if (val) {
        this.form.image = val
      } else {
        this.form.image = 'delete'
      }
    },
  },

  methods: {
    loadData() {
      ApiService.get(`/${this.resource}/${this.resourceId}`).then(res => {
        const {data} = res.data
        const $form = this.form;
        $form.name = data.name_value;
        $form.details = data.details_value;
        $form.rating = data.rating;
        $form.status = data.status
        this.avatar = data.image
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
          this.localeFieldToFormData(formData, "name", this.form.name);
          this.localeFieldToFormData(formData, "details", this.form.details);
          formData.append("status", form.status);
          formData.append("rating", form.rating);

          if (this.form.image instanceof File) {
            formData.append("image", this.form.image);
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
        nameen: Yup.string().required().label(this.$t('label.name')),
        namear: Yup.string().required().label(this.$t('label.name')),
        detailsen: Yup.string().required().label(this.$t('label.details')),
        detailsar: Yup.string().required().label(this.$t('label.details')),
        rating: Yup.number().required().label(this.$t('label.rating')),
        avatar: Yup.mixed().required('File is required'),
      });
    }
  },

  mounted() {
    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('Testimonial')}`, [this.$t('Testimonial')]);
  },
  created() {
    ApiService.get("testimonials/constants").then((response) => {
      let $data = response.data.data;
      this.ratingOptions = $data.ratings;
    });
    if (this.isEdit) {
      this.loadData();
    }
  }
};
</script>

<style scoped></style>
