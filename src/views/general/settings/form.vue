<template>
  <div class="card">
    <div class="card-body">
      <FormValidate
          ref="form"
          v-slot="{ errors }"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
      >
        <TabView @keyup="onInvalidChange(errors)">
          <TabPanel
              v-for="(value, propertyName,index) in form"
              :key="index"
              :header="filterText(propertyName, true)"
          >
<!--            <template #header>-->
<!--              <span :class="{ 'text-danger': formErrors[propertyName]}">{{ $t(propertyName) }}</span>-->
<!--            </template>-->
            <div class="row justify-content-center">
              <div
                  class="col-12"
              >
                <div
                    v-for="(item,name,i) in value"
                    :key="i"
                >
                  <InputWithValidation
                      :label="item.key"
                      :name="item.key"
                      :type="item.data_type==='float'?'number':'text'"
                      v-if="(item.data_type==='string' || item.data_type==='float')"
                      :placeholder="filterText(item.key, false, propertyName)"
                      v-model="item.value"
                      :value="item.value"
                  />
                  <div class="row" v-if="item.data_type==='image'">
                    <div class="col-12">
                      <label class="mb-3 mt-4">{{filterText(item.key, false, propertyName)}}</label>
                      <ImagePreview v-model="item.value" :label="'Main Image'" name="avatar"></ImagePreview>
                    </div>
                  </div>
                </div>
                <button
                    id="submit_btn"
                    class="btn btn-primary mt-4"
                    type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </FormValidate>
    </div>
  </div>
</template>
<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputWithValidation from "@/components/inputWithValidation";
import formMixin from "@/mixins/formMixin";
import Swal from 'sweetalert2/dist/sweetalert2.min.js';
export default {
  name: '-settings',
  mixins: [formMixin],
  components:{
    InputWithValidation,
    TabView,
    TabPanel
  },
  data() {
    return {
      name: this.$t('name.settings'),
      form: [],
      formErrors: null,
      avatar: null,
      errors: null,
    }
  },
  methods: {
    getData() {
      ApiService.get(`/settings`)
        .then((response) => {
          let $res = response.data.data;
          this.form = $res;
      }).catch((error) => {
        console.log(error);
      });
    },
    onSubmit() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          const $url = '/settings';
          let formData = new FormData();
          const isFile = input => 'File' in window && input instanceof File;
          if (isFile(this.form.general.website_logo.value)) {
            formData.append("website_logo", this.form.general.website_logo.value);
          }
          if (this.form.social_media.social_media_facebook.value
              || this.form.social_media.social_media_instagram.value
              || this.form.social_media.social_media_linkedin.value
              ||this.form.social_media.social_media_twitter.value) {
            formData.append("social_media_facebook", this.form.social_media.social_media_facebook.value);
            formData.append("social_media_instagram", this.form.social_media.social_media_instagram.value);
            formData.append("social_media_linkedin", this.form.social_media.social_media_linkedin.value);
            formData.append("social_media_twitter", this.form.social_media.social_media_twitter.value);
          }

          formData.append("_method", "put");
          formData.append("website_title_arabic", this.form.general.website_title_arabic.value);
          formData.append("website_title_english", this.form.general.website_title_english.value);
          formData.append("website_description_english", this.form.general.website_description_english.value);
          formData.append("website_description_arabic", this.form.general.website_description_arabic.value);
          formData.append("website_copyright_english", this.form.general.website_copyright_english.value);
          formData.append("website_copyright_arabic", this.form.general.website_copyright_arabic.value);
          formData.append("contact_address_english", this.form.contact.contact_address_english.value);
          formData.append("contact_address_arabic", this.form.contact.contact_address_arabic.value);
          formData.append("contact_email", this.form.contact.contact_email.value);
          formData.append("contact_phone", this.form.contact.contact_phone.value);
          formData.append("agents_and_agency", this.form.stats_and_numbers.agents_and_agency.value);
          formData.append("happy_customers_every_year", this.form.stats_and_numbers.happy_customers_every_year.value);
          formData.append("total_real_estate", this.form.stats_and_numbers.total_real_estate.value);
          formData.append("total_sales", this.form.stats_and_numbers.total_sales.value);
          ApiService.post($url, formData).then((response) => {
            console.log();
            if(response.status === 200) {
              Swal.fire({
                text: 'You have successfully update settings',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Ok',
                customClass: {
                  confirmButton: 'btn fw-semobold btn-light-primary',
                },
              });
            }
          }).catch(({response}) => {
            this.$refs.form.setErrors(response.data.errors)
            this.errors = response.data.errors;
          });
        }
      })
    },
    onInvalidChange(e) {
      this.formErrors = e;
    },
    onInvalidSubmit({errors}) {
      this.formErrors = errors;
    },
    imgClear() {
      this.avatar = null;
    },
    filterText(text, isMain = false, group = null) {
      const str = text
      if (isMain) {
        return this.toUpperWord(this.toKebabCase(str).replace('-', ' '))
      }
      if (group) {
        const groupName = this.toKebabCase(group).replace('-', '_')
        return this.toUpperWord(this.removeKeywords(str).replace(`${groupName}_`, '').replace(/_/g, ' '))
      }
      return str.replace(/_/g, ' ')
    },
    toKebabCase(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    },
    toUpperWord(str) {
      return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    },
    removeKeywords(str) {
      const keywords = ['homepage_social_', 'contact_', 'homepage_']
      keywords.forEach(keyword => {
        str = str.replace(keyword, '')
      })
      return str
    },
  },
  mounted() {
    setCurrentPageBreadcrumbs(this.name, ['Settings']);
  },
  created() {
    this.getData();
  }
}
</script>
<style lang="scss">
.gray-text {
  color: #9899ac;
}
.border-bottom-custom{
  @media (max-width: 768px) {
    border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
  }
}
</style>
