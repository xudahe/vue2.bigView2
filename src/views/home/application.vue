<!--运营-->
<template>
	<div id="application" class="applicationDiv">
		<component :is="classname"></component>
	</div>
</template>


<script>

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
			classname: "application1",
		};
	},
	methods: {
		setCmpt() {
			switch (this.theme) {
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
					this.classname = 'application1';
					break;
			}
		}
	},
	mounted() {
		this.setCmpt();
	},
	created() {

	},
	beforeDestroy() {
	},
}
</script>

<style lang="less"></style>
