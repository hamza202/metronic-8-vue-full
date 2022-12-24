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
            <span class="mb-2 d-block gray-text">Email</span>
            <p class="card-text">{{ details?.email }}</p>
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
            <span class="mb-2 d-block gray-text">Date</span>
            <p class="card-text">{{ details?.created_at }}</p>
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
  name: 'contact-details',
  data() {
    return {
      name: this.$t('name.contact-details'),
      details: null
    }
  },
  mounted() {
    setCurrentPageBreadcrumbs(this.name, ['Contact Details']);
  },
  created() {
    ApiService.get(`/contact-us/${this.$route.params.resourceId}`)
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
