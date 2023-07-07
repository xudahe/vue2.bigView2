<template>
	<div class="homepageDiv4" style="width:100%;height: 100%;margin-top: 0.05rem;">
		<div class="circleLeft fade-in-right">
			<homeLeft></homeLeft>
		</div>

		<div class="circleMiddle">
			<div style="height: calc(100%/3*2 - 0.1rem); margin-bottom: 0.1rem;width:100%;" class="scale-in">
				<homeMiddleTop></homeMiddleTop>
			</div>
			<div style="height: calc(100%/3*1 - 0.1rem); margin-bottom: 0.1rem;width:100%;" class="fade-in-up">
				<homeMiddleBot></homeMiddleBot>
			</div>
		</div>

		<div class="circleRight fade-in-left">
			<homeRight></homeRight>
		</div>
	</div>
</template>

<script>
import homeLeft from "./homepage4/homeLeft.vue";
import homeMiddleBot from "./homepage4/homeMiddleBot.vue";
import homeMiddleTop from "./homepage4/homeMiddleTop.vue";
import homeRight from "./homepage4/homeRight.vue";
export default {
	name: "homepage4",
	components: {
		homeLeft,
		homeMiddleBot,
		homeMiddleTop,
		homeRight,
	},
	data() {
		return {};
	},
	methods: {},
	mounted() { },
	beforeDestroy() { },
};
</script>

<style></style>
