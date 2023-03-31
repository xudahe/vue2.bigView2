<!--运营-->
<template>
	<div id="application" class="applicationDiv">
		<component :is="classname"></component>
	</div>
</template>


<script>
import { mapGetters } from "vuex";
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
        ...mapGetters(["templates"])
    },
	data() {
		return {
			classname: "application1",
		};
	},
	methods: {

	},
	mounted() {
		switch (this.templates) {
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
	},
	created() {
		this._getLess("/view/application.less");
	},
	beforeDestroy() {
	},
}
</script>

<style lang="less"></style>
