<template>
  <div class="card">
    <div class="card-body py-5">
      <div class="row border-bottom">
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <div>
            <span class="mb-2 d-block gray-text">Name</span>
            <p class="card-text">{{ details?.name }}</p>
          </div>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <div>
            <span class="mb-2 d-block gray-text">Email</span>
            <p class="card-text">{{ details?.email }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <div>
            <span class="mb-2 d-block gray-text">Mobile</span>
            <p class="card-text">{{ details?.mobile }}</p>
          </div>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <div>
            <span class="mb-2 d-block gray-text">Date</span>
            <p class="card-text">{{ details?.created_at }}</p>
          </div>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Deduction Rate</span>
          <p class="card-text">{{ details?.deduction_rate }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Bank Title</span>
          <p class="card-text">{{ details?.bank_title }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Bank Title</span>
          <p class="card-text">{{ details?.bank_title }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Id No</span>
          <p class="card-text">{{ details?.id_no }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Management Fee</span>
          <p class="card-text">{{ details?.management_fee }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Monthly Installment</span>
          <p class="card-text">{{ details?.monthly_installment }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Profit Rate</span>
          <p class="card-text">{{ details?.profit_rate }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Real Estate</span>
          <p class="card-text">{{ details?.real_estate }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Region Name</span>
          <p class="card-text">{{ details?.region_name }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Region Name</span>
          <p class="card-text">{{ details?.region_name }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">TAX</span>
          <p class="card-text">{{ details?.tax }}</p>
        </div>
        <div class="col-lg-4 col-6 py-2 border-bottom">
          <span class="mb-2 d-block gray-text">Total Funding</span>
          <p class="card-text">{{ details?.total_funding }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";

export default {
  name: 'funding-request-details',
  data() {
    return {
      name: this.$t('name.funding-request-details'),
      details: null
    }
  },
  mounted() {
    setCurrentPageBreadcrumbs(this.name, ['Funding Request Details']);
  },
  created() {
    ApiService.get(`/funding-requests/${this.$route.params.resourceId}`)
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
</style>
