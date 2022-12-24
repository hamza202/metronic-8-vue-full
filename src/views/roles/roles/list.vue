<template>
  <div>
    <!--begin::Sign-in Method-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div
          class="card-header border-0 cursor-pointer align-items-center"
          data-bs-target="#kt_account_signin_method"
          data-bs-toggle="collapse"
          role="button"
      >
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">{{ $t('filters') }}</h3>
        </div>
        <span class="svg-icon svg-icon-2 accordion-arrow-icon">
                    <inline-svg src="media/icons/duotune/arrows/arr081.svg"/>
                </span>
      </div>
      <!--end::Card header-->

      <!--begin::Content-->
      <div id="kt_account_signin_method" class="collapse">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!-- Start Filters-->
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="field">
                <label class="d-block" for="title">{{ $t('label.title') }}</label>
                <InputText
                    id="title"
                    :placeholder="$t('label.title')"
                    class="w-100"
                    type="text"
                    @input="inputChange($event, 'title')"
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="field">
                <label class="d-block" for="status">{{ $t('label.status') }}</label>
                <DropdownSelect
                    id="status"
                    v-model="searchFields.status"
                    :options="statusOption"
                    :placeholder="$t('label.status')"
                    :showClear="true"
                    class="w-100"
                    optionLabel="value"
                    optionValue="id"
                />
              </div>
            </div>

          </div>
          <!-- End Filters-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Sign-in Method-->
    <primeDataTable
        :filterFields="filterFields"
        :name="name"
        :route-link="routLink"
        :singularName="singularName"
    ></primeDataTable>
  </div>
</template>
<script>
import {setCurrentPageBreadcrumbs} from '@/core/helpers/breadcrumb';
import ApiService from "@/core/services/ApiService";

export default {
  name: '-categories',
  data() {
    return {
      name: this.$t('name.roles'),
      singularName: 'roles',
      routLink: 'roles',
      statusOption: [],
      filterFields: '',
      searchFields: {
        title: null,
        status: null,
      },
    };
  },
  watch: {
    searchFields: {
      deep: true,
      handler($val) {
        let $filters = ``;
        if ($val.title) $filters += `&title=${$val.title}`;
        if ($val.status) $filters += `&status=${$val.status}`;

        this.filterFields = $filters;
      },
    },
  },
  methods: {
    inputChange: window._.debounce(function (e, field) {
      this.searchFields[field] = e.target.value;
      console.log(this.searchFields[field]);
    }, 500),
  },
  mounted() {
    setCurrentPageBreadcrumbs(this.name, []);
  },
  created() {
    ApiService.get("categories/constants").then((response) => {
      let $data = response.data.data;
      this.statusOption = $data.statuses;
    });
  }
};
</script>
