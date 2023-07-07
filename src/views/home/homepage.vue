<!--综合-->
<template>
	<div id="homepage" class="homepageDiv">
		<component :is="classname"></component>
	</div>
</template>
<script>

import homepage4 from "@/components/homepage/index4.vue"
import homepage3 from "@/components/homepage/index3.vue"
import homepage2 from "@/components/homepage/index2.vue"
import homepage1 from "@/components/homepage/index1.vue"


export default {
	name: "homepage",
	components: {
		homepage4,
		homepage3,
		homepage2,
		homepage1,
	},
	computed: {
		theme() {
			return this.$store.state.theme.themeName;
		}
	},
	watch: {
		theme: {
			handler: function (newVal) {
				this.setCmpt();
			},
			deep: true
		},
	},
	data() {
		return {
			overviewPage: 0,
			classname: "",
			menus: [],
		};
	},
	methods: {
		setCmpt() {
			switch (this.theme) {
				case '001':
					this.classname = 'homepage1';
					break;
				case '002':
					this.classname = 'homepage2';
					break;
				case '003':
					this.classname = 'homepage3';
					break;
				case '004':
					this.classname = 'homepage4';
					break;
				default:
					this.classname = 'homepage1';
					break;
			}
		},
	},
	mounted() {
		this.setCmpt();
	},
	beforeDestroy() {

	},
	created() {

	}
};
</script>

<style lang="less"></style>
