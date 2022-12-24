<template>
  <div class="card">
    <div class="card-body py-5">
      <div class="row border-bottom">
        <div class="col pb-3">
          <div>
            <span class="mb-2 d-block gray-text">Name</span>
            <p class="card-text">{{ details?.name }}</p>
          </div>
        </div>
        <div class="col pb-3">
          <div>
            <span class="mb-2 d-block gray-text">Date</span>
            <p class="card-text">{{ details?.created_at }}</p>
          </div>
        </div>
      </div>
      <div class="row border-bottom">
        <div class="col py-3">
          <div>
            <span class="mb-2 d-block gray-text">Mobile</span>
            <p class="card-text">{{ details?.mobile }}</p>
          </div>
        </div>
        <div class="col py-3">
          <div>
            <span class="mb-2 d-block gray-text">Real Estate</span>
            <p class="card-text">{{ details?.real_estate }}</p>
          </div>
        </div>
      </div>
      <div class="row border-bottom">
        <div class="col-md-6 col-sm-12 py-3 border-bottom-custom">
          <div>
            <span class="mb-2 d-block gray-text">Review Status</span>
            <p
                :class="details?.review_status === 'done' ? 'badge-light-success' : 'badge-light-warning'"
                v-if="details?.review_status != 'not_done'"
                class="badge fs-base card-text"
            >
                {{ details?.review_status_value }}
            </p>
            <div  v-if="details?.review_status === 'not_done'">
              <p class="card-text badge fs-base badge-light-danger mb-2">
                {{ details?.review_status_value }}
              </p>
              <p class="card-text">
                {{ details?.reason_reject_review }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 py-3">
          <div>
            <span class="mb-2 d-block gray-text">Status</span>
            <p class="card-text badge fs-base"
               :class="details?.status === 'active' ? 'badge-light-success' : 'badge-light-danger'"
            >{{ details?.status_value }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col pt-3">
          <span class="mb-2 d-block gray-text">Message</span>
          <p class="card-text">{{ details?.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";

export default {
  name: 'booking-details',
  data() {
    return {
      name: this.$t('name.booking-details'),
      details: null
    }
  },
  mounted() {
    setCurrentPageBreadcrumbs(this.name, ['Booking Details']);
  },
  created() {
    ApiService.get(`/bookings/${this.$route.params.resourceId}`)
      .then((response) => {
        let $res = response.data.data;
        this.details = $res;
      })
      .catch((error) => {
        console.log(error);
    });
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
