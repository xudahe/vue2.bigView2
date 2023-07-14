<template>
    <Modal title="主题" transfer footer-hide v-model="box" width="50%">
        <Row>
            <Col span="24" style="padding: 10px;text-align: center;color: #fff;">
            <Checkbox v-model="gray">灰色网页</Checkbox>
            </Col>
        </Row>

        <RadioGroup v-model="text" style="width: 100%;">
            <Row>
                <Col span="6" v-for="(item, index) in list" :key="index"
                    style="padding: 10px;text-align: center;color: #fff;">
                <Radio :label="item.value">{{ item.name }} </Radio>
                </Col>
            </Row>
        </RadioGroup>
    </Modal>
</template>
  
<script>
export default {
    data() {
        return {
            box: false,
            gray: false,
            text: "",
            list: [
                {
                    name: "默认主题",
                    value: "001"
                },
                {
                    name: "白色主题",
                    value: "002"
                },
                {
                    name: "黑色主题",
                    value: "003"
                },
                {
                    name: "炫彩主题",
                    value: "004"
                },
                {
                    name: "智能主题",
                    value: "005"
                },
                {
                    name: "蓝色主题",
                    value: "006"
                },
                {
                    name: "暗色主题",
                    value: "007"
                },
                {
                    name: "护眼主题",
                    value: "008"
                },
            ]
        };
    },
    watch: {
        text: function (val) {
            this.$store.commit("SET_THEME_NAME", val);
        },
        gray: function (val) {
            this.$store.commit("SET_THEME_GRAY", val);
        },
    },
    mounted() {
        this.box = false;
    },
    methods: {

    }
};
</script>
  
<style lang="scss" scoped></style>
  
  