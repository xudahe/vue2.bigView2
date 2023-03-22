<!--运营-->
<template>
	<div id="appComponts" class="appDiv">
		<component :is="classname"></component>
	</div>
</template>


<script>
import bus from "@/eventBus.js";
import application4 from "@/components/application/index4.vue"
import application3 from "@/components/application/index3.vue"
import application2 from "@/components/application/index2.vue"
import application1 from "@/components/application/index1.vue"

export default {
	name: "application",
	components: {
		application4,
		application3,
		application2,
		application1
	},
	watch: {
		$route(to, from) {

		}
	},
	props: {},
	data() {
		return {
			classname: "application1",
		};
	},
	methods: {
		getMenus(val) {
		},
	},
	mounted() {
		let theme = this.$store.getters.templates;
		switch (theme) {
			case '001':
				this.classname = 'application1';
				break;
			case '002':
				this.classname = 'application2';
				break;
			case '003':
				this.classname = 'application3';
				break;
			case '004':
				this.classname = 'application4';
				break;
			default:
			case '001':
				this.classname = 'application1';
				break;
		}
	},
	created() {
		this._getLess("/view/application.less");
	},
	beforeDestroy() {
	},
}
</script>

<style lang="less"></style>
