<template>
    <div class="logins">
        <div style="position: relative;top: 50%;">
            <div
                style="width: max-content;background-color: rgba(130,174,210,0.4);margin: 0 auto;padding: 0.1rem;border-radius: 5px;">
                <div style="display: inline-block;background-color: #ffffff;border-radius: 5px;position: relative;">
                    <img src="@/assets/template/002/img/login/用户名.png" style="vertical-align: middle;height: 0.25rem;" />
                    <input v-model="inputValue1" class='tableCell' readonly onfocus="this.removeAttribute('readonly');"
                        placeholder="请输入登录账号" @on-focus='usernameYz' @on-blur='codeYz' style='display: inline-block;' />
                </div>
                <div
                    style="display: inline-block;background-color: #ffffff;border-radius: 5px;margin-left: 10px;position: relative;">
                    <img src="@/assets/template/002/img/login/密码.png" style="vertical-align: middle;height: 0.25rem;" />
                    <input v-model="inputValue2" type="password" class='tableCell' readonly
                        onfocus="this.removeAttribute('readonly');" placeholder="请输入您的密码" @on-blur='passwordYz'
                        style='display: inline-block;' />
                </div>
                <div style="display: inline-block;margin-left: 10px;">
                    <Button type="info"
                        style="height: 0.5rem;padding: 0 0.3rem;background-color: rgb(31,139,227);border-color: rgb(31,139,227);font-size: 0.16rem;letter-spacing:4px;font-weight: 600;"
                        @click="handleSubmit">登录</Button>
                </div>
            </div>

        </div>
        <div id="bottom" class="bottoms">
            <!-- <span style="font-size: 14px;color:#BFD7F0;">技术支持：武汉市勘察设计有限公司</span> -->
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { isNull } from "@/utils/validate.js"

export default {
    components: {

    },
    data() {
        return {
            inputValue1: '',
            inputValue2: '',
        }
    },
    methods: {
        cookies() {
            let name = Cookies.get('code');
            let psw = Cookies.get('password');
            if (name && name != "null") {
                this.inputValue1 = name;
            }
            if (psw && psw != "null") {
                this.inputValue2 = psw;
                this.checkboxValue1 = true;
            }
            if (name == undefined || psw == undefined) {
                this.$router.push({
                    name: 'login'
                })
            }
        },
        handleSubmit() {
            var username = this.inputValue1;
            var password = this.inputValue2;

            if (this.inputValue1 != '' && this.inputValue2 != '') {

                if (isNull(this.inputValue2))
                    return this.$Message.warning({
                        content: '密码不少于6位，且不能是6位以上连续重复的数字',
                        duration: 3
                    })

                this.$router.push({
                    name: 'loading',
                    params: {
                        themename: '',
                        username: username,
                        password: password
                    }
                });
            } else if (this.inputValue1 == "") {

            } else if (this.inputValue2 == "") {

            }
        },
        resetSubmit() {
            this.inputValue1 = "";
            this.inputValue2 = "";
            this.checkboxValue1 = false;
        }, //重置
        codeYz() { //用户名验证
            var username = this.inputValue1;
            var password = this.inputValue2;
            if (this.inputValue1 != '') {

            } else {

            }
        },
        usernameYz() {
        },
        passwordYz() {

        },
    },
    mounted() {
        this.cookies();

    },
    beforeDestroy() {

    }
};
</script>
<style lang="less" scoped="scoped">
.tableCell {
    display: table-cell;
    border: none;
    font-size: 0.18rem;
    height: 0.5rem;
    width: 80%;
    outline: none;
    background-color: transparent;
    position: relative;
    left: 10px;
}

.tableCell::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
}

.logins {
    background: url(~@/assets/template/002/img/login/张家港排水管网GIS平台.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    width: 100%;
    height: 100%;
}

.bottoms {
    text-align: center;
    width: 100%;
    height: 25px;
    line-height: 25px;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 25px;
    color: #fcfcfc;
    font-size: 14px;
}
</style>
