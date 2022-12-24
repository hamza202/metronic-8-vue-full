import { App } from 'vue';
import primeDataTable from "@/components/table/PrimeDataTable.vue";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import TabView from "primevue/tabview";
import TabPanel from 'primevue/tabpanel';
import InputSwitch from 'primevue/inputswitch';
import Toast from 'primevue/toast';
import ImagePreview from "@/components/ImagePreview.vue"
import InputWithValidation from '@/components/inputWithValidation.vue'
import InputWithNoValidation from '@/components/inputWithNoValidation.vue'
import MultipleSelectWithValidation from '@/components/MultipleSelectWithValidation.vue'
import Calendar from 'primevue/calendar';
import DropdownWithValidation from '@/components/DropdownWithValidation.vue'
import CalendarWithValidation from '@/components/CalendarWithValidation.vue'
import TextAreaWithValidation from "@/components/textAreaWithValidation.vue";
import vue3IconPicker from "@/components/Vue3IconPicker.vue";
import Editor from 'primevue/editor';
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';



/**
 * Initialize Inline-Svg component
 * @param app vue instance
 */
export function globalComponents(app: App<Element>) {
    app.component('CheckBox', Checkbox);
    app.component('primeEditor',Editor);
    app.component("MultiSelect", MultiSelect);
    app.component("InputText", InputText);
    app.component("DropdownSelect", Dropdown);
    app.component("FileUpload", FileUpload);
    app.component("TabView", TabView);
    app.component('TabPanel',TabPanel);
    app.component('InputSwitch', InputSwitch)
    app.component('ToastComp', Toast)
    app.component('ImagePreview', ImagePreview)
    app.component('InputCalendar', Calendar)
    app.component('InputWithValidation', InputWithValidation);
    app.component('InputWithNoValidation', InputWithNoValidation);
    app.component('DropdownWithValidation', DropdownWithValidation)
    app.component('CalendarWithValidation', CalendarWithValidation)
    app.component('MultipleSelectWithValidation', MultipleSelectWithValidation)
    app.component("primeDataTable", primeDataTable);
    app.component('TextAreaWithValidation',TextAreaWithValidation)
    app.component("TextArea", Textarea);
    app.directive("tooltip", Tooltip);
    app.component('vue3IconPicker',vue3IconPicker)
    app.use(ToastService);
    app.use(PrimeVue);
}
