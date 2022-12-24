<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Mutations } from '@/store/enums/StoreEnums';
import { initializeComponents } from '@/core/plugins/keenthemes';

export default defineComponent({
    name: 'app',
    setup() {
        const store = useStore();

        // const lang = () => {
        //     let htmlEl = document.querySelector('html');
        //     const lang = localStorage.getItem('lang') || 'ar';
        //     if (lang === 'ar') {
        //         htmlEl?.setAttribute('dir', 'rtl');
        //         htmlEl?.setAttribute('lang', 'ar');
        //         htmlEl?.setAttribute('direction', 'rtl');
        //         require(`./assets/css/style.ar.css`);
        //     } else {
        //         require(`./assets/css/style.en.css`);
        //     }
        // };

        onMounted(() => {
            /**
             * this is to override the layout config using saved data from localStorage
             * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
             */
            store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);

            nextTick(() => {
                initializeComponents();
                // lang();
            });
        });
        //import lang css file
    },
});
</script>

<style lang="scss">
@import '~bootstrap-icons/font/bootstrap-icons.css';
@import '~apexcharts/dist/apexcharts.css';
@import '~quill/dist/quill.snow.css';
@import '~animate.css';
@import '~sweetalert2/dist/sweetalert2.css';
@import '~nouislider/distribute/nouislider.css';
@import '../public/css/font-awesome.css';
@import '~socicon/css/socicon.css';
@import '~line-awesome/dist/line-awesome/css/line-awesome.css';
@import '~@vueform/multiselect/themes/default.css';
@import '~prism-themes/themes/prism-shades-of-purple.css';
@import '~element-plus/dist/index.css';

//@import 'primevue/resources/themes/saga-blue/theme.css';       //theme
@import 'primevue/resources/primevue.min.css'; //core css
@import 'primeicons/primeicons.css';

// Main demo style scss
@import 'assets/sass/plugins';
//@import "assets/sass/style";

//RTL version styles
//@import "assets/css/style.rtl.css";
</style>
