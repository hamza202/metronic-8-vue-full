import { createStore } from 'vuex';
import { config } from 'vuex-module-decorators';

import DetailsModule from '@/store/modules/DetailsModule';
import AuthModule from '@/store/modules/AuthModule';
import BodyModule from '@/store/modules/BodyModule';
import BreadcrumbsModule from '@/store/modules/BreadcrumbsModule';
import ConfigModule from '@/store/modules/ConfigModule';
import ThemeModeModule from '@/store/modules/ThemeModeModule';

config.rawError = true;

const store = createStore({
    modules: {
        DetailsModule,
        AuthModule,
        BodyModule,
        BreadcrumbsModule,
        ConfigModule,
        ThemeModeModule,
    },
});

export default store;
