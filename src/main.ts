import {createApp} from "vue";
import App from "./App.vue";
import sheared from "./mixins/shared";
import lodash from "lodash";
import {ErrorMessage, Field, Form} from "vee-validate";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import {initApexCharts} from "@/core/plugins/apexcharts";
import {initInlineSvg} from "@/core/plugins/inline-svg";
import {initVeeValidate} from "@/core/plugins/vee-validate";
import {globalComponents} from "@/core/plugins/global-components";


// global components
import VueGoogleMaps from '@fawmi/vue-google-maps'



import "@/core/plugins/prismjs";


const app = createApp(App);

app.mixin(sheared);
app.use(store);
app.use(router);
app.use(ElementPlus);

app.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_KEY,
        language: localStorage.getItem("lang") || 'en',
    }
});

app.component("FieldValidate", Field);
app.component("FormValidate", Form);
app.component("ErrorMessage", ErrorMessage);

app.use(lodash);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
globalComponents(app);

initVeeValidate();

app.use(i18n);



app.mount("#app");
