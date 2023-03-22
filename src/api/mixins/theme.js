import { mapState, mapGetters, mapMutations } from 'vuex'

/**
 * 动态引用该组件的样式，在组件的 created函数中写 this._getLess("/components/popup/popupbig.less");
 * 以此达到 项目换皮肤
 */
const mixin = {
    computed: {
        ...mapGetters([
            'templates'
        ]),
    },
    created() {
        // var theme = localStorage.theme;
        // if(theme) {
        //     this.templatesMu(theme);
        // }
    },
    methods: {
        ...mapMutations([
            'templatesMu'
        ]),
        _getLess(filename) {
            console.log(this.templates + filename)
            return require("@/assets/template/" + this.templates + filename);
        },
    },
}

export default mixin