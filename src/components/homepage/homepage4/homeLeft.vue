<template>
	<div class="homeLeft">
		<div class="leftBg homebg">
			<div class="homeTitle">资产统计</div>
			<div style="height: calc(100% - 0.4rem);"></div>
		</div>
		<div class="leftBg homebg">
			<div class="homeTitle">设施统计</div>
			<div style="height: calc(100% - 0.4rem);"></div>
		</div>
		<div class="leftBg homebg">
			<div class="homeTitle">管线类型统计</div>
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
		};
	},
	methods: {

	},
	mounted() {

	},
	beforeDestroy() { },
};
</script>

<style lang="less"></style>
