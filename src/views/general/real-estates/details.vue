<template>
  <div>
    <div class="card mb-5">
      <div class="card-header">
        <div class="card-title m-0">
          <h5 class="fw-bold m-0">{{ $t('general_info') }}</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-6 order-1">
            <div class="row">
              <div class="col-12 border-bottom py-2">
                <span class="mb-2 d-block gray-text">Title</span>
                <p class="card-text">{{ details?.title }}</p>
              </div>
              <div class="col-6 border-bottom py-2">
                <span class="mb-2 d-block gray-text">Estate Status</span>
                <p class="card-text">{{ details?.estate_status_value }}</p>
              </div>
              <div class="col-6 border-bottom py-2">
                <span class="mb-3 d-block gray-text">Type Of Sales</span>
                <p class="custom-padding badge fs-base badge-light-info d-inline mx-1" v-for="item in details?.type_of_sales" :key="item">
                  {{ item }}
                </p>
              </div>
              <div class="col-6 border-bottom py-2">
                <span class="mb-2 d-block gray-text">Category</span>
                <p class="card-text">{{ details?.category || '----' }}</p>
              </div>
              <div class="col-6 border-bottom py-2">
                <span class="mb-2 d-block gray-text">Agent</span>
                <p class="card-text">{{ details?.agent || '----' }}</p>
              </div>
              <div class="col-6 border-bottom py-2">
                <span class="mb-2 d-block gray-text">Price</span>
                <p class="card-text">{{ details?.price || '----' }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-6 order-0 order-xl-2">
            <span class="mb-2 d-block gray-text">About</span>
            <p class="card-text">{{ details?.about }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-5">
      <div class="card-header">
        <div class="card-title m-0">
          <h5 class="fw-bold m-0">{{ $t('location') }}</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6 ">
            <span class="mb-2 d-block gray-text">Region</span>
            <p class="card-text">{{ details?.region || '----' }}</p>
          </div>
          <div class="col-6">
            <span class="mb-2 d-block gray-text">City</span>
            <p class="card-text">{{ details?.city || '----' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-5">
      <div class="card-header">
        <div class="card-title m-0">
          <h5 class="fw-bold m-0">{{ $t('real_estate_info') }}</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Bedroom Number</span>
            <p class="card-text">{{ details?.bedroom_no }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Total Floors</span>
            <p class="card-text">{{ details?.total_floors }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Bathroom Number</span>
            <p class="card-text">{{ details?.bathroom_no }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Parking Number</span>
            <p class="card-text">{{ details?.parking_no }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Living Rooms Number</span>
            <p class="card-text">{{ details?.living_rooms_no }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Apartments Number</span>
            <p class="card-text">{{ details?.apartments_no }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Land Area</span>
            <p class="card-text">{{ details?.land_area || '---' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Built Up Area</span>
            <p class="card-text">{{ details?.built_up_area || '---' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Property Type</span>
            <p class="card-text">{{ details?.property_type || '---' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Length</span>
            <p class="card-text">{{ details?.length || '---' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Width</span>
            <p class="card-text">{{ details?.width || '---' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Age</span>
            <p class="card-text">{{ details?.age }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Facade</span>
            <p class="card-text">{{ details?.facade_value || '---' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Has Electricity</span>
            <p class="card-text">{{ details?.has_electricity ? 'Yes':'No' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Has Water</span>
            <p class="card-text">{{ details?.has_water ? 'Yes':'No' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Has Furniture</span>
            <p class="card-text">{{ details?.has_furniture ? 'Yes':'No' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Is Feature</span>
            <p class="card-text">{{ details?.is_feature ? 'Yes':'No' }}</p>
          </div>
          <div class="col-lg-4 col-6 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Status</span>
            <p class="card-text">{{ details?.status_value }}</p>
          </div>
          <div class="col-12 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Features</span>
            <span class="py-2 badge fs-base badge-info d-inline-block mx-1 mb-2 " v-for="item in details?.features" :key="item.id">
              {{item.feature}}
            </span>
          </div>
          <div class="col-12 border-bottom py-2">
            <span class="mb-2 d-block gray-text">Preparations</span>
            <span class="py-2 badge fs-base badge-info d-inline-block mx-1 mb-2 " v-for="item in details?.preparations" :key="item.id">
              {{item.feature}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title m-0">
          <h5 class="fw-bold m-0">{{ $t('images') }}</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6 py-2">
            <span class="mb-2 d-block gray-text">Main Image</span>
            <div class="img-box">
              <img :src="details?.main_image" class="w-100 h-250px rounded" alt="img"/>
            </div>
          </div>
<!--          <div class="col-lg-6 py-2" v-if="details?.images.pSBA">-->
<!--            <span class="mb-2 d-block gray-text">pSBA</span>-->
<!--            <div class="img-box">-->
<!--              <img :src="details?.images.pSBA" class="w-100 h-250px rounded" alt="img"/>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import { useRoute } from 'vue-router';

export default {
  name: 'real-estates-details',
  data() {
    return {
      name: this.$t('name.real-estates-details'),
      // details: null
    }
  },
  setup(){
    const store = useStore();
    const route = useRoute();
    onMounted(() => {
      store.dispatch(Actions.GET_DETAILS, route.params.resourceId);
    });
    const details = computed(() => store.getters.getDetailsObject) || {};
    return {
      details
    }
  },
  mounted() {
    setCurrentPageBreadcrumbs(this.name, ['Real Estates Details']);
  },
  created() {
    // ApiService.get(`/real-estates/${this.$route.params.resourceId}?for_show_details`)
    //     .then((response) => {
    //       let $res = response.data.data;
    //       this.details = $res;
    //       console.log(this.details)
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  },
}
</script>

<style scoped>
.gray-text {
  color: #9899ac;
}
.custom-padding{
  padding: 2px 8px !important;
}
</style>
