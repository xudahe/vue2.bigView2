<template>
    <div class="logins">
        <div style="background-size: 100% 100%;height: 1.3rem;">
            <div class="loginTitleDiv">
                <div class="loginTitle">
                    {{ titleWeb }}
                </div>
            </div>
        </div>
        <div style="text-align: center;height: calc(100% - 1.3rem - 25px - 25px);">
            <div style="width: 100%;height: 100%;display: flex;position: relative;">
                <div
                    style="width: 4.56rem;height: 4.96rem; margin: auto;display: flex;position: absolute;left: calc((100% - 4.56rem) / 2);top: calc((100% - 5.16rem) / 2);">
                    <div class="loginBg">
                        <div
                            style="text-align: center;height: 0.63rem;margin: 0 auto;padding-top: 0.3rem;margin-top: 0.14rem;">
                            <span style="color:#02FFFC;font-size: 0.24rem;margin-top: 0rem;letter-spacing: 4px;">账号登录</span>
                        </div>
                        <div style="text-align: center;width: 82%;height: 0.63rem;margin: 0 auto;margin-top: 0.4rem;">
                            <div style="width: 0rem;float: left;height: 100%;line-height: 0.49rem;margin-left: 0rem;">
                                <img src="@/assets/template/004/img/login/皮肤.png"
                                    style="vertical-align: middle;height: 0.38rem;position: absolute;margin: 0.05rem 0.05rem 0;" />
                            </div>

                            <input v-model="inputValue0" class='tableCell' readonly
                                onfocus="this.removeAttribute('readonly');" placeholder="请输入主题编号"
                                style='display: inline-block;' />
                        </div>
                        <div style="text-align: center;width: 82%;height: 0.63rem;margin: 0 auto;margin-top: 0.2rem;">
                            <div style="width: 0rem;float: left;height: 100%;line-height: 0.49rem;margin-left: 0rem;">
                                <img src="@/assets/template/004/img/login/用户1.webp"
                                    style="vertical-align: middle;height: 0.48rem;position: absolute;" />
                            </div>

                            <input v-model="inputValue1" class='tableCell' readonly
                                onfocus="this.removeAttribute('readonly');" placeholder="请输入登录账号" @on-blur='usernameYz'
                                style='display: inline-block;' />
                        </div>
                        <div style="text-align: center;width: 82%;height: 0.63rem;margin: 0 auto;margin-top: 0.2rem;">
                            <div style="width: 0rem;float: left;height: 100%;line-height: 0.49rem;margin-left: 0rem;">
                                <img src="@/assets/template/004/img/login/密码1.webp"
                                    style="vertical-align: middle;height: 0.48rem;position: absolute;" />
                            </div>

                            <input v-model="inputValue2" type="password" class='tableCell' readonly
                                onfocus="this.removeAttribute('readonly');" placeholder="请输入您的密码" @on-blur='passwordYz'
                                style='display: inline-block;' />
                        </div>

                        <div class="checkbox">
                            <Checkbox v-model="checkboxValue1" label="自动登录" style='font-size: 0.16rem;margin-right:0px;'
                                size="small">
                                <span
                                    style="color:#90BCE0;font-size: 0.16rem;letter-spacing: 1.5px;margin-right:0px;">记住密码</span>
                            </Checkbox>
                        </div>

                        <div class="checkDiv" @click="handleSubmit">
                            <span
                                style="font-weight: 600;color:#fff;font-size: 0.24rem;margin-top: 0.14rem;width: 100%;letter-spacing: 8px;">登录</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div id="footer" class="footer">
            <span>技术支持：XXXXXXXXXX</span>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { isNull } from "@/utils/validate.js"

export default {
    name: "login",
    components: {

    },

    data() {
        return {
            titleWeb: '灌南县排水管网GIS平台',
            inputValue0: '001',
            inputValue1: '',
            inputValue2: '',
            checkboxValue1: false,
            title: '',
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
            var themename = this.inputValue0;
            var username = this.inputValue1;
            var password = this.inputValue2;

            if (this.inputValue1 != '' && this.inputValue2 != '') {
                if (isNull(this.inputValue2)) {
                    return this.$Message.warning({
                        content: '密码不少于6位，且不能是6位以上连续重复的数字',
                        duration: 3
                    })
                }
                this.$router.push({
                    name: 'loading',
                    params: {
                        themename: themename,
                        username: username,
                        password: password
                    }
                });
            } else if (this.inputValue1 == "") {
                this.$Message.warning("用户名不能为空")
            } else if (this.inputValue2 == "") {
                this.$Message.warning("密码不能为空")
            }
        },
        resetSubmit() {
            this.inputValue0 = "001"
            this.inputValue1 = "";
            this.inputValue2 = "";
            this.checkboxValue1 = false;
        },
        usernameYz() { //用户名验证

        },
        passwordYz() { //密码验证

        },
    },
    mounted() {
        this.$store.commit("SET_THEME_NAME", "");
        this.$store.commit("SET_THEME_GRAY", "");
    },
    beforeDestroy() {

    }
};
</script>
<style lang="less" scoped>
.loginTitle {
    font-family: 'ruizizhenyan';
    text-align: left;
    background-image: linear-gradient(to bottom, #ffffff 0%, #e6fbff 35%, #00cfff 68%, #04282e 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 0.42rem;
    line-height: 0.80rem;
    text-align: center;
    top: 0.05rem;
    position: relative;
    letter-spacing: 5px;
}

.checkDiv {
    background: linear-gradient(270deg, #1FCECA 0%, #198E8D 100%);
    text-align: center;
    width: 3.76rem;
    height: 0.6rem;
    margin: 0 auto;
    background-size: 100% 100%;
    margin-top: 0.30rem;
    display: flex;
    cursor: pointer;
}

.tableCell {
    display: table-cell;
    border: none;
    border-bottom: 2px solid #188589;
    font-size: 0.18rem;
    height: 0.49rem;
    width: 82%;
    outline: none;
    background-color: transparent;
    color: #ffffff;
    position: absolute;
    left: 0.4rem;
    padding-left: 0.6rem;
}

.tableCell::-webkit-input-placeholder {
    color: #aab2bd;
}

body {
    margin: 0px;
    padding: 0px;
}

.logins {
    background: url(~@/assets/template/004/img/login/背景.webp) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    width: 100%;
    height: 100%;
}

.loginBg {
    background: url(~@/assets/template/004/img/login/登录框.webp) no-repeat;
    width: 100%;
    height: 100%;
    margin: auto;
    background-size: 100% 100%;
}

.loginTitleDiv {
    background: url(~@/assets/template/004/img/login/标题.webp) no-repeat;
    background-size: 100% 100%;
    height: 0.8rem;
    width: 19.2rem;
}


.checkbox .at-checkbox__label {
    font-size: 18px;
    padding-left: 8px;
    color: #403e3f;
    vertical-align: middle;
}

.btn {
    background: #099cf9;
    outline: none;
    border: 1px solid #057ec7;
    height: 45px;
    line-height: 45px;
    padding: 0px;
    border-radius: 8px;
    font-size: 20px;
    width: 100px;
    cursor: pointer;
    color: #fff;
}

.bottom span {
    color: #8fbafe;
}

.at-input {
    position: relative;
    font-size: 0;
    line-height: 1.5;
    outline: 0;
}

/*复选框*/

.checkbox .at-checkbox__label {
    font-size: 18px;
    padding-left: 8px;
    color: #403e3f;
    vertical-align: middle;
}

.checkbox {
    text-align: right;
    width: 82%;
    margin: 0 auto;
    margin-top: 0rem;
}


.footer {
    text-align: center;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    font-size: 0.16rem;

    height: 0.7rem;
    width: 19.2rem;
}

.footer span {
    font-size: 14px;
    color: #6494c7;
    line-height: 0.7rem
}
</style>
