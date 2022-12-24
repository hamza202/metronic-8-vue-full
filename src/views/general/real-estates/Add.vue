<template>
  <div>
    <ToastComp/>
    <FormValidate
        ref="form"
        v-slot="{ errors }"
        :validation-schema="schema"
        autocomplete="off"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
    >
      <div class="card mb-5 mb-xl-10">
        <div class="card-header">
          <div class="card-title m-0">
            <h5 class="fw-bold m-0">{{ $t('general_info') }}</h5>
          </div>
        </div>
        <div class="card-body p-9">

          <div class="row">
            <div class="col-xl-6 order-1">
              <div class="row">
                <div class="col-12">
                  <TabView @keyup="onInvalidChange(errors)">
                    <TabPanel v-for="(item,k,idx) in locales" :key="idx">
                      <template #header>
                        <span :class="{ 'text-danger': formErrors['title'+k]}">{{ $t(item) }}</span>
                      </template>
                      <input-with-validation v-model="form.title[k]" :label="'label.title'" :lang="item"
                                             :name="'title'+k"/>
                    </TabPanel>
                  </TabView>
                </div>
                <div class="col-6">
                  <dropdown-with-validation
                      v-model="form.estate_status"
                      :label="'label.estate_status'" :options="estateStatusOption"
                      name="estate_status" optionLabel="value" optionValue="id"/>
                </div>
                <div class="col-6">
                  <multiple-select-with-validation
                      v-model="form.type_of_sales"
                      :options="typeOfSaleOption"
                      label="label.type_of_sales"
                      name="type_of_sales"
                      optionLabel="value"
                      optionValue="id"
                      :ifImages="!ifImages"
                  />
                </div>
                <div class="col-6">
                  <dropdown-with-validation
                      v-model="form.category_id"
                      :label="'label.category_id'" :options="categoryList"
                      name="category_id" optionLabel="title" optionValue="id"/>
                </div>
                <div class="col-6">
                  <dropdown-with-validation
                      v-model="form.agent_id"
                      :label="'label.agent_id'" :options="agentList"
                      name="agent_id" optionLabel="title" optionValue="id"/>
                </div>
                <div class="col-6">
                  <input-with-validation v-model="form.price" :label="'label.price'" :name="`price`"/>
                </div>
                <div class="col-6">
                <CalendarWithValidation v-model="form.publish_date"
                                        label="label.publish_date"
                                        name="publish_date"/>
              </div>
              </div>
            </div>
            <div class="col-xl-6 order-0 order-xl-2">
              <TabView @keyup="onInvalidChange(errors)">
                <TabPanel v-for="(item,k,idx) in locales" :key="idx">
                  <template #header>
                    <span :class="{ 'text-danger': formErrors['about'+k]}">{{ $t(item) }}</span>
                  </template>
                  <text-area-with-validation v-model="form.about[k]" :label="'label.about'" :lang="item"
                                             :max-height="289"
                                             :name="'about'+k" rows="14"/>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-5 mb-xl-10">
        <div class="card-header">
          <div class="card-title m-0">
            <h5 class="fw-bold m-0">{{ $t('location') }}</h5>
          </div>
        </div>
        <div class="card-body p-9">
          <div class="row">
            <div class="col-12 mb-6">
              <label class="mb-3">{{ $t('label.real_estate_location') }}</label>
              <GMapMap

                  :center="center"
                  :zoom="5"
                  map-type-id="roadmap"
                  style="width: 100%; height: 350px; border-radius: 0.475rem"
              >
                <GMapMarker
                    v-for="(m, index) in markers"
                    :key="index"
                    ref="mapRef"
                    :clickable="true"
                    :draggable="true"
                    :position="m.position"
                    @click="center=m.position"
                    @drag="getLatLng($event)"
                />
              </GMapMap>
            </div>
            <div class="col-6">
              <dropdown-with-validation
                  v-model="form.region_id"
                  :label="'label.region_id'" :options="regionList"
                  name="region_id" optionLabel="name" optionValue="id"/>
            </div>
            <div class="col-6">
              <dropdown-with-validation
                  v-model="form.city_id"
                  :label="'label.city_id'" :options="cityList"
                  name="city_id" optionLabel="name" optionValue="id"/>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-5 mb-xl-10">
        <div class="card-header">
          <div class="card-title m-0">
            <h5 class="fw-bold m-0">{{ $t('real_estate_info') }}</h5>
          </div>
        </div>
        <div class="card-body p-9">
          <div class="row">
            <div class="col-lg-4 col-6">
              <input-with-validation
                   v-model="form.bedroom_no"
                   label="label.bedroom_no" name="bedroom_no" type="number"
                 />
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation
                  v-model="form.total_floors"
                  :label="'label.total_floors'"
                  :name="`total_floors`"
                   type="number"
              />
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.bathroom_no" :label="'label.bathroom_no'" :name="`bathroom_no`"
                                     type="number"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.parking_no" :label="'label.parking_no'" :name="`parking_no`"
                                     type="number"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.living_rooms_no" :label="'label.living_rooms_no'"
                                     :name="`living_rooms_no`"
                                     type="number"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.apartments_no" :label="'label.apartments_no'"
                                     :name="`apartments_no`"
                                     type="number"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.land_area" :label="'label.land_area'" name="land_area"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.built_up_area" :label="'label.built_up_area'"
                                     :name="`built_up_area`"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.property_type" :label="'label.property_type'"
                                     :name="`property_type`"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.length" :label="'label.length'" :name="`length`"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.width" :label="'label.width'" :name="`width`"/>
            </div>
            <div class="col-lg-4 col-6">
              <input-with-validation v-model="form.age" :label="'label.age'" :name="`age`"/>
            </div>
            <div class="col-lg-4 col-6">
              <dropdown-with-validation
                  v-model="form.facade"
                  :label="'label.facade'" :options="facadeOption"
                  name="facade" optionLabel="value" optionValue="id"/>
            </div>
            <div class="col-lg-4 col-6">
              <multiple-select-with-validation
                  v-model="form.features"
                  :options="featureList"
                  label="label.features"
                  name="features"
                  optionLabel="title"
                  optionValue="id"
                  :ifImages="ifImages"
              />
            </div>
            <div class="col-lg-4 col-6">
              <multiple-select-with-validation
                  v-model="form.preparations"
                  :options="preparationList"
                  label="label.preparations"
                  name="preparations"
                  optionLabel="title"
                  optionValue="id"
                  :ifImages="ifImages"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-2 col-6">
              <div class="field mb-5">
                <label class="d-block">
                  {{ this.$t('label.has_electricity') }}
                </label>
                <InputSwitch
                    v-model="form.has_electricity"
                    class="mb-4"
                    falseValue="false"
                    trueValue="true"
                />
              </div>
            </div>
            <div class="col-lg-2 col-6">
              <div class="field mb-5">
                <label class="d-block">
                  {{ this.$t('label.has_water') }}
                </label>
                <InputSwitch
                    v-model="form.has_water"
                    class="mb-4"
                    falseValue="false"
                    trueValue="true"
                />
              </div>
            </div>
            <div class="col-lg-2 col-6">
              <div class="field mb-5">
                <label class="d-block">
                  {{ this.$t('label.has_furniture') }}
                </label>
                <InputSwitch
                    v-model="form.has_furniture"
                    class="mb-4"
                    falseValue="false"
                    trueValue="true"
                />
              </div>
            </div>
            <div class="col-lg-2 col-6">
              <div class="field mb-5">
                <label class="d-block">
                  {{ this.$t('label.is_feature') }}
                </label>
                <InputSwitch
                    v-model="form.is_feature"
                    class="mb-4"
                    falseValue="false"
                    trueValue="true"
                />
              </div>
            </div>
            <div class="col-lg-2 col-6">
              <div class="field mb-5">
                <label class="d-block">
                  {{ this.$t('label.status') }}
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
        </div>
      </div>
      <div class="card mb-5 mb-xl-10">
        <div class="card-header">
          <div class="card-title m-0">
            <h5 class="fw-bold m-0">{{ $t('document') }}</h5>
          </div>
        </div>
        <div class="card-body p-9">
          <div class="row">
            <div class="col-lg-4">
              <div class="mb-2 d-flex justify-content-between">
                <label class="d-block">
                  {{ this.$t('label.building_completion_certificate') }}
                </label>
                <button @click="deleteDocument('building_completion_certificate')" type="button"
                        class="btn btn-danger w-24px h-24px">X
                </button>
              </div>
              <FileUpload ref="building_completion_certificate" :maxFileSize="10000000" accept="application/pdf" class="mb-4"
                          mode="basic" name="building_completion_certificate"
                          @select="imgSelect($event, 'building_completion_certificate')"
                          @upload="imgSelect($event, 'building_completion_certificate')"/>
              <CalendarWithValidation v-model="form.building_completion_certificate_expire_date"
                                      label="label.building_completion_certificate"
                                      name="building_completion_certificate"/>
            </div>
            <div class="col-lg-4">
              <div class="mb-2 d-flex justify-content-between">
                <label class="d-block">
                  {{ this.$t('label.digital_building_permit') }}
                </label>
                <button @click="deleteDocument('digital_building_permit')" type="button" class="btn btn-danger w-24px h-24px">
                  X
                </button>
              </div>
              <FileUpload ref="digital_building_permit" :maxFileSize="10000000" accept="application/pdf" class="mb-4"
                          mode="basic" name="digital_building_permit"
                          @select="imgSelect($event, 'digital_building_permit')"
                          @upload="imgSelect($event, 'digital_building_permit')"/>
              <CalendarWithValidation v-model="form.digital_building_permit_expire_date"
                                      label="label.digital_building_permit"
                                      name="digital_building_permit"/>
            </div>
            <div class="col-lg-4">
              <div class="mb-2 d-flex justify-content-between">
                <label class="d-block">
                  {{ this.$t('label.electronic_instrument_pictures') }}
                </label>
                <button @click="deleteDocument('electronic_instrument_pictures')" type="button" class="btn btn-danger w-24px h-24px">
                  X
                </button>
              </div>
              <FileUpload ref="electronic_instrument_pictures" :maxFileSize="10000000" accept="application/pdf" class="mb-4"
                          mode="basic" name="electronic_instrument_pictures"
                          @select="imgSelect($event, 'electronic_instrument_pictures')"
                          @upload="imgSelect($event, 'electronic_instrument_pictures')"/>
              <CalendarWithValidation v-model="form.electronic_instrument_pictures_expire_date"
                                      label="label.electronic_instrument_pictures_expire_date"
                                      name="electronic_instrument_pictures_expire_date"/>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-5 mb-xl-10">
        <div class="card-header">
          <div class="card-title m-0">
            <h5 class="fw-bold m-0">{{ $t('images') }}</h5>
          </div>
        </div>
        <div class="card-body p-9">
          <div class="row">
            <div class="col-lg-5">
              <label class="mb-3 mt-4">{{ $t('label.real_estate_main_img') }}</label>
              <ImagePreview v-model="avatar" :label="'Main Image'" name="avatar"></ImagePreview>
            </div>
            <div class="col-lg-7">
              <label class="mb-3 mt-4">{{ $t('label.real_estate_more_img') }}</label>
              <FileUpload :maxFileSize="1000000" :multiple="true" :showUploadButton="false" accept="image/*"
                          name="images" @clear="imgClear" @remove="multipleImgSelect($event, 'images')"
                          @select="multipleImgSelect($event, 'images')">
                <template #empty>
                  <p>{{ $t("drag_and_drop") }}</p>
                </template>
              </FileUpload>
              <div class="mt-4">
                <div v-if="old_images" class="row g-4">
                  <div v-for="(img, idx) in old_images" :key="idx" class="col-auto">
                    <div class="img-prev-box">
                    <span class="btn btn-icon btn-circle w-25px h-25px bg-danger delete-img-prev shadow"
                          title="Remove avatar"
                          @click="deletePrevImg(idx)"><i class="bi bi-x fs-2 text-white"></i></span>
                      <img :src="img" alt="">
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="row" v-if="isChangeMainImage">
                <div class="col-8">
                  <label class="mb-3 mt-4"> Cropped </label>
                  <div class="img-box">
                    <vue-cropper
                        ref="cropper"
                        :src="imgSrc"
                        preview=".preview"
                        alt="Source Image"
                    />
                    <div class="d-flex gap-2">
                      <a
                          href="#"
                          role="button"
                          @click.prevent="cropImage"
                          class="btn btn-info d-table"
                      >
                        Crop
                      </a>
                      <button type="button" class="btn btn-info d-table" @click="reset">reset</button>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <label class="mb-3 mt-4">Cropped Main Image</label>
                  <div class="img-box">
                    <img :src="cropImg" v-if="cropImg" alt="Cropped Image"/>
                    <div v-if="!cropImg" class="placeholder-cropped">
                      <p> Placeholder cropped</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-5 mb-xl-10">
        <div class="card-body p-9 py-6">
          <button
              id="submit_btn"
              class="btn btn-success"
              type="submit"
          >
            <span class="indicator-label"> {{ $t(this.saveBtnText) }} </span>
            <span class="indicator-progress">
                    {{ $t('please_wait') }}
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
          </button>
        </div>
      </div>
    </FormValidate>
  </div>
</template>

<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import * as Yup from "yup";
import ApiService from "@/core/services/ApiService";
import ImagePreview from "@/components/ImagePreview";
import formMixin from "@/mixins/formMixin";
import MultipleSelectWithValidation from "@/components/MultipleSelectWithValidation";
import DropdownWithValidation from "@/components/DropdownWithValidation";
import InputWithValidation from "@/components/inputWithValidation";
import moment from "moment/moment";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  name: "add-real-estate",
  components: {
    InputWithValidation, DropdownWithValidation, MultipleSelectWithValidation, ImagePreview,
    VueCropper,
  },
  mixins: [formMixin],
  data() {
    return {
      cropImg: null,
      imgSrc: null,
      isChangeMainImage: false,

      ifImages: true,
      center: {lat: 24.713272, lng: 46.673880},
      markers: [
        {
          position: {
            lat: 24.713272, lng: 46.673880
          },
        }
        , // Along list of clusters
      ],

      avatar: null,
      old_images: [],
      form: {
        title: {
          ar: null,
          en: null
        },
        about: {
          ar: null,
          en: null
        },
        images: [],
        category_id: null,
        agent_id: null,
        region_id: null,
        city_id: null,
        price: null,
        bedroom_no: null,
        bathroom_no: null,
        living_rooms_no: null,
        land_area: null,
        built_up_area: null,
        property_type: null,
        length: null,
        width: null,
        total_floors: null,
        age: null,
        parking_no: null,
        apartments_no: null,
        facade: null,
        has_electricity: "true",
        has_water: "true",
        has_furniture: "true",
        status: "active",
        main_image: null,
        features: [],
        preparations: [],
        lat: null,
        log: null,
        is_feature: "true",
        estate_status: null,
        type_of_sales: [],
        building_completion_certificate: null,
        building_completion_certificate_id: null,
        building_completion_certificate_expire_date: null,
        digital_building_permit: null,
        digital_building_permit_id: null,
        digital_building_permit_expire_date: null,
        electronic_instrument_pictures: null,
        electronic_instrument_pictures_id: null,
        electronic_instrument_pictures_expire_date: null,
        publish_date: null,
      },
      formErrors: {},
      image: null,
      errors: null,
      facadeOption: [],
      estateStatusOption: [],
      typeOfSaleOption: [],
      categoryList: [],
      agentList: [],
      regionList: [],
      cityList: [],
      featureList: [],
      preparationList: [],

      documentKeys: [
        'building_completion_certificate',
        'building_completion_certificate_id',
        'building_completion_certificate_expire_date',
        'digital_building_permit',
        'digital_building_permit_id',
        'digital_building_permit_expire_date',
        'electronic_instrument_pictures',
        'electronic_instrument_pictures_id',
        'electronic_instrument_pictures_expire_date',
      ],
      fieldNotRequiredKeys: [
        'bedroom_no',
        'bathroom_no',
        'living_rooms_no',
        'land_area',
        'built_up_area',
        'length',
        'width',
        'total_floors',
        'age',
        'parking_no',
        'apartments_no',
      ],
    };
  },

  watch: {
    "form.region_id": function (val) {
      this.getCityList(val);
    },
    avatar(val) {
      if (val) {
        this.form.main_image = val;
        let reader = new FileReader();
        let src = null;
        reader.readAsDataURL(val);
        src = URL.createObjectURL(val);
        this.isChangeMainImage = true;
        reader.onload = (event) => {
          this.cropImg = null;
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };

      } else {
        this.form.main_image = 'delete'
      }
    },
  },

  methods: {
    reset() {
      this.$refs.cropper.reset();
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    deleteDocument(document) {

      this.$refs[document].clear();
      this.form[document] = null;
      this.form[document + '_expire_date'] = null;

      if (this.form[document + '_id']) {
        this.requestDeleteDocument(this.form[document + '_id'])
      }

    },
    requestDeleteDocument(documentId) {
      ApiService.delete(`real-estates/${documentId}/delete-document`).then((response) => {
        this.$toast.add({severity:'success', summary: 'Success', detail:response.data.message, life: 3000});
      });
    },
    deletePrevImg(item) {
      delete this.old_images[item];
      ApiService.delete(`real-estates/${this.resourceId}/delete-image/${item}`)
    },
    imgClear() {
      this.avatar = null;
    },
    loadData() {
      ApiService.get(`/${this.resource}/${this.resourceId}`).then(res => {

        const {data} = res.data
        const $form = this.form;
        $form.title = data.title_value;
        $form.about = data.about_value;
        this.avatar = data.main_image
        $form.category_id = data.category_id;
        $form.agent_id = data.agent_id;
        $form.region_id = data.region_id;
        $form.city_id = data.city_id;
        $form.price = data.price;
        $form.bedroom_no = data.bedroom_no;
        $form.bathroom_no = data.bathroom_no;
        $form.living_rooms_no = data.living_rooms_no;
        $form.land_area = data.land_area;
        $form.built_up_area = data.built_up_area;
        $form.property_type = data.property_type;
        $form.length = data.length;
        $form.width = data.width;
        $form.total_floors = data.total_floors;
        $form.age = data.age;
        $form.parking_no = data.parking_no;
        $form.apartments_no = data.apartments_no;
        $form.facade = data.facade;
        $form.has_electricity = `${data.has_electricity}`;
        $form.has_water = `${data.has_water}`;
        $form.has_furniture = `${data.has_furniture}`;
        $form.is_feature = `${data.is_feature}`;
        $form.status = data.status;
        $form.features = data.features_ids;
        $form.preparations = data.preparations_ids;
        $form.estate_status = data.estate_status;
        $form.type_of_sales = data.type_of_sales;
        $form.publish_date = data.publish_date;
        $form.lat = data.lat;
        $form.lng = data.lng;
        this.markers[0].position.lat = data.lat;
        this.markers[0].position.lng = data.lng;
        this.center.lat = data.lat;
        this.center.lng = data.lng;
        this.old_images = data.images
        data.documents.forEach((document) => {
          for (const [key1, value] of Object.entries(document)) {
            $form[key1] = value
          }
        })
      })
    },
    multipleImgSelect(e, target) {
      let $files = [];
      e.files.map(f => {
        $files.push(f);
      });
      if (e.files.length === 0) {
        this.form[target] = null
      } else {
        this.form[target] = $files;
      }
    },
    imgSelect(e, target) {
      this.form[target] = e.files[0];
    },
    getLatLng($event) {
      this.form.lat = $event.latLng.lat();
      this.form.lng = $event.latLng.lng();
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
          formData.append("category_id", form.category_id);
          formData.append("agent_id", form.agent_id);
          formData.append("region_id", form.region_id);
          formData.append("city_id", form.city_id);
          formData.append("price", form.price);
          formData.append("facade", form.facade);
          formData.append("has_electricity", form.has_electricity);
          formData.append("has_water", form.has_water);
          formData.append("has_furniture", form.has_furniture);
          formData.append("is_feature", form.is_feature);
          formData.append("status", form.status);
          formData.append("lat", form.lat);
          formData.append("lng", form.lng);
          formData.append("estate_status", form.estate_status);
          formData.append("property_type", form.property_type);

          if(this.form.publish_date){
            formData.append("publish_date", moment(form.publish_date).format('YYYY-MM-DD'));
          }
          if (this.form.images.length) {
            this.form.images.forEach((x, i) => {
              formData.append(`images[${i}]`, x);
            });
          }
          this.fieldNotRequiredKeys.forEach(function (value) {
            if (form[value]) {
              formData.append(`${value}`, form[value]);
            }
          });


          this.documentKeys.forEach(function (document) {
            if (form[document]) {
              let value;
              if (document.includes('_expire_date')) {
                value = moment(form[document]).format('YYYY-MM-DD');
              } else {
                value = form[document];
              }

              formData.append(`${document}`, value);
            }
          });
          if (this.form.type_of_sales && this.form.type_of_sales.length) {
            this.form.type_of_sales.forEach((x, i) => {
              formData.append(`type_of_sales[${i}]`, x);
            });
          }
          if (this.form.features && this.form.features.length) {
            this.form.features.forEach((x, i) => {
              formData.append(`features[${i}]`, x);
            });
          }
          if (this.form.preparations && this.form.preparations.length) {
            this.form.preparations.forEach((x, i) => {
              formData.append(`preparations[${i}]`, x);
            });
          }

          if (this.form.main_image instanceof File) {
            formData.append("main_image", this.form.main_image);
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
    getCategoryList() {
      ApiService.get("categories/list").then((response) => {
        let $data = response.data.data;
        this.categoryList = $data;
      });
    },
    getAgentList() {
      ApiService.get("agents/list").then((response) => {
        let $data = response.data.data;
        this.agentList = $data;
      });
    },
    getRegionList() {
      ApiService.get("regions/list?saudi_arabia").then((response) => {
        let $data = response.data.data;
        this.regionList = $data;
      });
    },
    getCityList($regionId) {
      ApiService.get(`cities/list?region_id=${$regionId}`).then((response) => {
        let $data = response.data.data;
        this.cityList = $data;
      });
    },
    getFeatureList() {
      ApiService.get("features/list").then((response) => {
        let $data = response.data.data;
        this.featureList = $data.filter(function (item) {
          return item.type === 'feature'
        });
        this.preparationList = $data.filter(function (item) {
          return item.type === 'preparation'
        });
      });
    },
  },

  computed: {
    schema() {
      // const multipleSelect =
      return Yup.object().shape({
        titleen: Yup.string().required().label(this.$t('label.title')),
        titlear: Yup.string().required().label(this.$t('label.title')),
        abouten: Yup.string().required().label(this.$t('label.about')),
        aboutar: Yup.string().required().label(this.$t('label.about')),
        category_id: Yup.number().min(0).required().label(this.$t('label.category_id')),
        agent_id: Yup.number().min(0).required().label(this.$t('label.agent_id')),
        region_id: Yup.number().min(0).required().label(this.$t('label.region_id')),
        city_id: Yup.number().min(0).required().label(this.$t('label.city_id')),
        price: Yup.number().min(0).required().label(this.$t('label.price')),
        bedroom_no: Yup.number().min(0).notRequired().label(this.$t('label.bedroom_no')),
        bathroom_no: Yup.number().min(0).notRequired().label(this.$t('label.bathroom_no')),
        living_rooms_no: Yup.number().min(0).notRequired().label(this.$t('label.living_rooms_no')),
        land_area: Yup.number().min(0).notRequired().label(this.$t('label.land_area')),
        built_up_area: Yup.number().min(0).notRequired().label(this.$t('label.built_up_area')),
        property_type: Yup.string().notRequired().label(this.$t('label.property_type')),
        length: Yup.number().min(0).notRequired().label(this.$t('label.length')),
        width: Yup.number().min(0).notRequired().label(this.$t('label.width')),
        total_floors: Yup.number().min(0).notRequired().label(this.$t('label.total_floors')),
        age: Yup.number().min(0).notRequired().label(this.$t('label.age')),
        parking_no: Yup.number().min(0).notRequired().label(this.$t('label.parking_no')),
        apartments_no: Yup.number().min(0).notRequired().label(this.$t('label.apartments_no')),
        facade: Yup.string().notRequired().label(this.$t('label.facade')),
        estate_status: Yup.string().required().label(this.$t('label.estate_status')),
        type_of_sales: Yup.array().required().label(this.$t('label.type_of_sales')),
        avatar: Yup.mixed().required('File is required'),
        features: Yup.array().notRequired().label(this.$t('label.features')),
        preparations: Yup.array().notRequired().label(this.$t('label.preparations')),
      });
    }
  },
  mounted() {
    setCurrentPageBreadcrumbs(`${this.editAddText} ${this.$t('real_estates')}`, [this.$t('real_estates')]);
  },
  created() {
    ApiService.get("real-estates/constants").then((response) => {
      let $data = response.data.data;
      this.facadeOption = $data.facades;
      this.estateStatusOption = $data.estate_statuses;
      this.typeOfSaleOption = $data.type_of_sales;
    });
    this.getCategoryList();
    this.getAgentList();
    this.getRegionList();
    this.getFeatureList();
    if (this.isEdit) {
      this.loadData();
    }
  }
};
</script>

<style scoped>
.w-24px {
  width: 24px;
  padding: 0 !important;
}

.h-24px {
  height: 24px;
}
.img-box{
  position: relative;
  border: 1px dashed #767676;
  display: flex;
  justify-content: center;
  /*height: 530px;*/
  padding: 20px;
  border-radius: 0.475rem !important;
  flex-direction: column;
  gap: 20px;
}
.placeholder-cropped p{
  margin: 0 auto;
  text-align:center;
}
.img-box img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}
.d-table{
  display: table;
  width: fit-content;
}
</style>
