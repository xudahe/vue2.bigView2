<template>
	<div class="homeRight">
		<div class="rightBg homebg">
			<div class="homeTitle">缺陷统计</div>
			<div style="height: calc(100% - 0.4rem);"></div>
		</div>
		<div class="rightBg homebg">
			<div class="homeTitle">管材统计</div>
			<div style="height: calc(100% - 0.4rem);"></div>
		</div>
		<div class="rightBg homebg">
			<div class="homeTitle">CCTV统计</div>
			<div style="height: calc(100% - 0.4rem);"></div>
		</div>
	</div>
</template>

<script>
import bus from "@/eventBus.js";
import apiSetting from "@/api/axios/apiSetting.js";

export default {
	components: {

	},
	data() {
		return {
			noticeListsb: [],
			isActivesb: true, // 是否显示transitionTop动画
			timersb: [],
			noticeTopsb: 0,
			clength: ""
		};
	},
	methods: {

	},
	mounted() {

	},
	beforeDestroy() { },
};
</script>

<style lang="less" scoped="scoped"></style>
