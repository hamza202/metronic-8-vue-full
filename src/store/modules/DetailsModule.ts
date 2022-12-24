import ApiService from "@/core/services/ApiService";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module
export default class DetailsModule extends VuexModule {
    details = {};

    get getDetailsObject(){
        return this.details;
    }

    @Mutation
    [Mutations.SET_DETAILS](details) {
        this.details = details;
    }

    @Action
    [Actions.GET_DETAILS](payload) {
        ApiService.get(`/real-estates/${payload}?for_show_details`)
        .then((response) => {
            const res = response.data.data;
            this.context.commit(Mutations.SET_DETAILS, res);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
