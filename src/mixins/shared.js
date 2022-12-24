import JwtService from "@/core/services/JwtService";
import moment from "moment/moment";

let getSlug = require("speakingurl");

let _ = require("lodash");

export default {
  methods: {
    afterSubmit(message, routeName, params = {}) {
      this.$toast.add({severity:'success', summary: 'Success', detail:message, life: 3000});
      setTimeout(() => this.$router.push({ name: routeName, params }), 1000)
    },
    hasKey(object, key) {
      return _.has(object, key);
    },
    $slugify(text, glue) {
      return getSlug(text, {
        separator: glue || "-"
      });
    },
    localeFieldToFormData(formData, k, fields) {
      return _.tap(formData, formData => {
        _.each(fields, (field, key) => {
          if (field) {
            formData.append(`${k}[${key}]`, field);
          }
        });
      });
    },
    showErrorsInToastr($errors) {
      // let jsonOp = JSON.parse($errors);
      let $key_errors = Object.keys($errors);
      // console.log($key_errors);
      $key_errors.forEach((x) => {
        console.log($errors[x]);
        let $x = $errors[x];
        if ($x) {
          this.$toast.add({severity:'error', summary: 'Error Message', detail:`${$x}`, life: 3000});
        }
      });
    },

    moduleFilter(searchFields, $val) {
      let $filters = ``;
      let $fields = [];
      Object.keys(searchFields).forEach((x) => {
        if ($fields.indexOf(x) < 0) {
          $fields.push(x);
        }
      });
      $fields.forEach((x) => {
        $filters += $val[x] ? `&${x}=${$val[x]}` : "";
      });
      return $filters;
    },
    dateFormatter($date){
      return moment($date).format('YYYY-MM-DD');
    }
  },
  computed: {
    locales() {
      let locales = JwtService.getLocalesServer();
      return JSON.parse(locales);
    }
  }
};
