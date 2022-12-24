<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <div class="card-header border-0 px-0">
        <!--begin::Card title-->
        <div class="card-title">
          <h2>{{ name }}</h2>
        </div>
        <!--end::Card title-->
        <div class="row g-4 row-cols-auto align-items-center">
          <div class="col">
            <div class="show-header-select">
              <MultiSelect
                  v-model="shownHeaders"
                  :options="tableHeader"
                  class="mw-800px"
                  optionLabel="text"
                  placeholder="Custom Header"
                  @update:modelValue="onHeaderToggle"
              />
            </div>
          </div>
          <div v-show="currentActions.can_import || currentActions.can_export" class="col">
            <!--begin::Action menu-->
            <div class="nav-item">
              <button
                  class="btn btn-light-primary ps-7 py-3"
                  data-kt-menu-attach="parent"
                  data-kt-menu-placement="bottom-end"
                  data-kt-menu-trigger="click"
              >
                {{ $t('actions') }}
                <span class="svg-icon svg-icon-2 me-0">
                                    <inline-svg src="media/icons/duotune/arrows/arr072.svg"/>
                                </span>
              </button>
              <div
                  class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-250px fs-6"
                  data-kt-menu="true"
              >
                <div v-if="currentActions.can_import" class="menu-item px-5">
                  <a class="menu-link px-5" href="#"> Import </a>
                </div>
                <div v-if="currentActions.can_export" class="menu-item px-5">
                  <span class="menu-link px-5" @click.prevent="exportTable"> Export </span>
                </div>

              </div>
            </div>
            <!--end::Menu-->
          </div>
          <div class="col">
            <!--begin::Card toolbar-->
            <div class="card-toolbar">
              <!--begin::Filter-->
              <router-link v-if="permissions[permission]?.can_create" :to="addRoute" class="btn btn-sm btn-flex btn-success" type="button">
                                <span class="svg-icon svg-icon-3">
                                    <svg
                                        fill="none"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            fill="currentColor"
                                            height="20"
                                            opacity="0.3"
                                            rx="5"
                                            width="20"
                                            x="2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            y="2"
                                        ></rect>
                                        <rect
                                            fill="currentColor"
                                            height="2"
                                            rx="1"
                                            transform="rotate(-90 10.8891 17.8033)"
                                            width="12"
                                            x="10.8891"
                                            xmlns="http://www.w3.org/2000/svg"
                                            y="17.8033"
                                        ></rect>
                                        <rect
                                            fill="currentColor"
                                            height="2"
                                            rx="1"
                                            width="12"
                                            x="6.01041"
                                            xmlns="http://www.w3.org/2000/svg"
                                            y="10.9247"
                                        ></rect>
                                    </svg>
                                </span>
                {{ $t('add') }} {{ $t('name.' + singularName) }}
              </router-link>
              <!--end::Filter-->
            </div>
            <!--end::Card toolbar-->
          </div>
        </div>
      </div>
      <DataTable
          ref="dt"
          v-model:selection="selectedItems"
          :lazy="true"
          :loading="loading"
          :paginator="true"
          :rowHover="true"
          :rows="pagination.rows"
          :rowsPerPageOptions="[5, 10, 15, 25, 50]"
          :showFilterOperator="false"
          :totalRecords="totalItems"
          :value="tData"
          class="my-datatable"
          columnResizeMode="fit"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          dataKey="id"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll"
          @page="onPage($event)"
      >
        <template #header>
          <div class="card-title">
            <div class="row row-cols-1 row-cols-sm-auto align-items-center justify-content-between mt-3">
              <div class="col">
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative my-1">
                  <span class="svg-icon svg-icon-1 position-absolute ms-6">
                      <inline-svg src="media/icons/duotune/general/gen021.svg"/>
                  </span>
                  <input

                      :placeholder="`${$t('search')}...`"
                      class="form-control form-control-solid mw-400px ps-15"
                      type="text"
                      @input="inputChange($event, 'search')"
                  />
                </div>
                <!--end::Search-->
              </div>
              <div class="col"></div>
            </div>
          </div>
        </template>
        <template #empty>
          {{ $t('dataTableEmpty') }}
        </template>
        <template #loading> Loading customers data. Please wait.</template>
        <Column headerStyle="width: 3em" selectionMode="multiple"></Column>
        <Column v-for="col of shown_Headers" :key="col.value" :field="col.value" :header="col.text">
          <template v-if="col.value === 'status'" #body="{ data }">
              <span
                  :class="data[col.value] === (this.trueVal || 'active') ? 'badge-light-success' : 'badge-light-danger'"
                  class="badge fs-base"
              >
                  {{ data.status_value }}
              </span>
          </template>
          <template v-else-if="isImage(col.value)" #body="{ data }">
            <span class="symbol symbol-50px">
                <img :src="data[col.value]" alt="img" @error="imgNotFound($event)"/>
            </span>
          </template>
          <template v-else-if="col.value === 'fontIcon'" #body="{ data }">
            <span class="symbol symbol-50px">
                <em :class="data[col.value]" class="fa-icon"></em>
            </span>
          </template>
          <template v-else-if="col.value === 'actions'" #body="{ data }">
            <div class="d-flex align-items-center">
              <!-- Delete -->
              <button
                  v-if="data.actions?.can_delete"
                  v-tooltip.top="$t('delete')"
                  class="btn btn-icon btn-active-light-danger w-30px h-30px me-3"
                  @click.prevent="deleteItem(data)"
              >
                  <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/general/gen027.svg"/>
                  </span>
              </button>

              <router-link
                  v-if="data.actions?.can_view_details"
                  :to="{ name: detailsRoute, params: { resourceId: data.id } }"
                  class="btn btn-success btn-sm btn-hover-rise me-3 sm-padding"
              >
                Details
              </router-link>

              <button
                  @click="duplicate(data.id)"
                  v-if="data.actions?.can_duplicate"
                  class="btn btn-success btn-sm btn-hover-rise me-3 sm-padding"
              >
<!--                :to="{ name: editRoute, params: { resourceId: data.id } }"-->
                Duplicate
              </button>

              <a v-if="data.actions?.can_open_file" :href="data.certificate"
                 class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                 target="_blank">
                <span class="svg-icon svg-icon-3">
                   <inline-svg src="media/icons/duotune/files/fil003.svg"/>
                </span>
              </a>

              <!-- End Delete -->
              <!--begin::Edit-->
              <router-link
                  v-if="data.actions?.can_update && permissions[permission]?.can_update"
                  v-tooltip.top="$t('edit')"
                  :to="{ name: editRoute, params: { resourceId: data.id } }"
                  class="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
              >
                <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg"/>
                </span>
              </router-link>
              <!--end::Edit-->
              <!--Start Send login info-->
              <button v-if="data.actions?.can_send_login_info"
                      v-tooltip.top="$t('send_login_info')"
                      class="btn btn-icon btn-active-light-success w-30px h-30px me-3"
                      @click.prevent="sendLoginInfo(data.id)">
                <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/general/gen016.svg"/>
                  </span>
              </button>
              <!--End Send login info-->
              <!-- begin::change status -->
              <div v-if="data.actions?.can_change_status" class="switch-wrap position-relative">
                <InputSwitch
                    :key="data.id"
                    v-model="data.status"
                    :falseValue="falseVal || 'inactive'"
                    :trueValue="trueVal || 'active'"
                ></InputSwitch>
                <div
                    v-tooltip.top="$t('changeStatus')"
                    class="switch-layer z-index-2 position-absolute"
                    @click="changeStatus(data)"
                ></div>
              </div>
              <!--end::change status-->

              <slot
                  v-if="slotCustomActions"
                  :item="data"
                  name="custom_actions"
              />


            </div>
          </template>
        </Column>

      </DataTable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputSwitch from 'primevue/inputswitch';
import {mapGetters} from 'vuex';
import ApiService from '@/core/services/ApiService';
import Swal from 'sweetalert2/dist/sweetalert2.min.js';
import JwtService from "@/core/services/JwtService";

export default {
  name: 'prime-data-table',
  components: {
    DataTable,
    Column,
    InputSwitch,
  },
  props: {
    slotCustomActions: {
      default: false
    },
    falseVal:{
      type: String
    },
    trueVal:{
      type: String
    },
    detailsRoute: {
      type: String,
      default(props) {
        return `details-${props.singularName.toLocaleLowerCase()}`
      },
    },
    editRoute: {
      type: String,
      default(props) {
        return `edit-${props.singularName.toLocaleLowerCase()}`
      },
    },
    addRoute: {
      type: Object,
      default(props) {
        return {
          name: `add-${props.singularName.toLocaleLowerCase()}`,
        }
      },
    },
    name: {
      required: true,
    },
    params: {},
    singularName: {
      required: true,
    },
    routeLink: {
      type: String,
      default: '',
    },
    filterFields: {
      default: function () {
        return '';
      },
    },
  },
  data() {
    return {
      shownHeaders: [],
      permissions:{},
      formHeader: {
        table: null,
        header: [],
      },
      totalItems: 0,
      tableHeader: [],
      pagination: {
        page: 1,
        rows: 15,
      },
      currentActions: {
        can_export: false,
        can_import: false,
        can_log: false,
      },
      imgPlaceholder: 'media/icons/duotune/general/defultimg.svg',
      tData: [],
      selectedItems: null,
      loading: true,
      status: true,
      searchQuery: {
        search: ''
      },
    };
  },
  watch: {
    shownHeaders: function (val) {
      this.formHeader.header = val;
    },
    filterFields: {
      deep: true,
      handler() {
        this.getData(this.pagination);
      },
    },

  },
  computed: {
    permission(){
      return this.routeLink.toLocaleLowerCase()
    },
    getParams() {

      const paramsWithSearchQuery = {
        ...this.searchQuery,
        ...this.params
      }

      if (paramsWithSearchQuery) {
        let key = Object.keys(paramsWithSearchQuery)
        let parArray = [];
        parArray = key.map(k => {
          return k + '=' + paramsWithSearchQuery[k]
        })
        let params = ''
        parArray.forEach((item, index, arr) => {
          params += '&' + arr[index]
        })
        return params
      }
      return false
    },
    shown_Headers() {
      return this.tableHeader.filter((object1) => {
        return this.shownHeaders.some((object2) => {
          return object1.value === object2.value;
        });
      });
    },
    // themeMode: {
    //   get: function() {
    //     return this.$store.getters.getThemeMode;
    //   }
    // },
    ...mapGetters({
      themeMode: 'getThemeMode',
    }),
  },
  methods: {
    duplicate(id) {
      ApiService.get(`real-estates/${id}/duplicate`).then((res) => {
        const $data = res.data.data;
        this.$router.push({
          name: this.editRoute,
          params: { resourceId: $data.id }
        })
      })
    },
    inputChange: window._.debounce(function (e) {
      this.searchQuery['search'] = e.target.value;
      this.getData(this.pagination)
    }, 500),
    exportTable() {
      let $link = `/${this.routeLink}/export`;
      ApiService.get($link).then((res) => {
        window.open(res.data.data.file, '_blank').focus();
      });
    },
    //Change status
    onHeaderToggle: window._.debounce(function () {
      this.saveHeader(this.formHeader);
    }, 1500),

    changeStatus($item) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'want to change status?',
        // icon: "success",
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Change',
        customClass: {
          confirmButton: 'btn fw-semobold btn-light-success',
          cancelButton: 'btn fw-semobold btn-secondary',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const $idx = this.tData.indexOf($item);
          let $form = {
            status: $item.status !== (this.trueVal || 'active') ? (this.trueVal || 'active') : (this.falseVal || 'inactive'),
          };
          let $link = `/${this.routeLink}/${$item.id}/status`;
          this.axios
              .patch($link, $form)
              .then((res) => {
                const $res = res.data.data;
                this.tData[$idx].status = $res.status;
                this.tData[$idx].status_value = $res.status_value;
                Swal.fire('Status Changed', '', 'success');
              })
              .catch(({error}) => {
                console.log(error);
              });
        }
      });
    },

    //Delete item
    deleteItem($item) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'want to delete this item?',
        // icon: "success",
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Delete',
        customClass: {
          confirmButton: 'btn fw-semobold btn-light-danger',
          cancelButton: 'btn fw-semobold btn-secondary',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let $link = `/${this.routeLink}/${$item.id}`;
          ApiService.delete($link)
              .then(() => {
                const $idx = this.tData.indexOf($item);
                this.tData.splice($idx, 1);
                Swal.fire('Item Deleted', '', 'success');
              })
              .catch(({error}) => {
                console.log(error);
              });
        }
      });
    },
    //Send LogIn Info
    sendLoginInfo($item){
      Swal.fire({
        title: 'Are you sure',
        text: 'want to send login information?',
        // icon: "success",
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Send',
        customClass: {
          confirmButton: 'btn fw-semobold btn-light-success',
          cancelButton: 'btn fw-semobold btn-secondary',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let $link = `/${this.routeLink}/${$item}/send-login-info`;
          ApiService.get($link)
              .then(() => {
                Swal.fire('login information has been sent', '', 'success');
              })
              .catch(({error}) => {
                console.log(error);
              });
        }
      });
    },
    // axios get data
    getData(pagination) {
      let params = this.getParams;
      let $link = `/${this.routeLink}?page=${pagination.page}&per_page=${pagination.rows}${this.filterFields}${params ? params : ''}`;
      this.loading = true;
      ApiService.get($link)
          .then((response) => {
            let $res = response.data;
            this.tData = $res.data;
            this.tableHeader = $res.header;
            this.shownHeaders = $res.shownHeader.length ? $res.shownHeader : this.tableHeader;
            this.formHeader.header = this.shownHeaders;
            const $actions = {
              text: this.$t('actions'),
              value: 'actions',
              sortable: false,
            };
            this.tableHeader.push($actions);
            if (this.hasKey($res, 'actions')) {
              this.currentActions = $res.actions;
            }
            this.totalItems = $res.meta.total;
            this.loading = false;
            console.log($res)
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
    },
    onPage(e) {
      this.pagination.page = e.page + 1;
      this.pagination.rows = e.rows;
      this.getData(this.pagination);
    },
    isImage(field) {
      return field === 'image' || field === 'icon';
    },

    imgNotFound(e) {
      e.target.src = this.imgPlaceholder;
    },
    // filter data
    filterData(value) {
      this.selectedItems = this.customers.filter((customer) => {
        return customer.name.toLowerCase().includes(value.toLowerCase());
      });
    },
    saveHeader(header) {
      let $link = `/headers`;
      ApiService.post($link, header);
    },
  },
  mounted() {
    this.loading = false;
  },
  created() {
    this.getData(this.pagination);
    this.permissions =  JSON.parse(JwtService.getPermissions()) || {};
    this.formHeader.table = this.name.toLocaleLowerCase().replace(/ /g, '_');
  },
};
</script>
<style lang="scss">
.switch-layer {
  inset: 0;
  cursor: pointer;
}

.fa-icon {
  font-size: 30px;
}
</style>
