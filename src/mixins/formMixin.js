export default {
    methods: {
        // loadFormData() {
        //     return this._.cloneDeep(this.form)
        // },
    },
    computed: {
        saveBtnText(){
            if(this.isEdit){
                return 'save_changes'
            }
            return 'save'
        },
        editAddText(){
            if(this.isEdit){
                return this.$t('Edit')
            }
            return this.$t('Add')
        },
        isEdit() {
            return !!this.$route.params.resourceId
        },
        resource() {
            return this.$route.meta.resource
        },
        resourceId() {
            return this.$route.params.resourceId
        },
    }
}
