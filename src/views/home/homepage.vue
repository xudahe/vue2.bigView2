<!--综合-->
<template>
	<div id="appComponts" class="appDiv">
		<component :is="classname"></component>

	<!-- <div style="height: 100%;position: relative;overflow-y: hidden;width: 100%;">
			<Carousel v-model="overviewPage">
				<CarouselItem :key="inde" v-for="(item, inde) in menus">
					<component :is="item.classname"></component>
				</CarouselItem>
			</Carousel>
							</div> -->
	</div>
</template>
<script>
import bus from "@/eventBus.js";
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
	watch: {
		// 监测路由变化,只要变化了就获取路由参数重新加载菜单
		$route(to, from) {
			var _this = this;
			// to为跳转之后的路由
			var menuid = this.$route.query.id
			_this.getMenus(menuid);
		}
	},
	data() {
		return {
			overviewPage: 0,
			classname: "",
			menus: [],
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
			case '001':
				this.classname = 'homepage1';
				break;
		}

		var _this = this;
		this.$nextTick(() => {
			var menuid = _this.$route.query.id; //序号（id）
			_this.getMenus(menuid);
		})
	},
	beforeDestroy() {

	},
	created() {
		this._getLess('/view/homepage.less');
	}
};
</script>

<style lang="less">
#appComponts {
	.ivu-carousel {
		height: 100% !important;
	}

	.ivu-carousel-list {
		height: 100% !important;
	}

	.ivu-carousel-track {
		height: 100% !important;
	}

	.ivu-carousel-item {
		height: 100% !important;
	}

	.ivu-carousel-arrow {
		background-color: rgb(83, 133, 152) !important;
	}

	.ivu-carousel-arrow :hover {
		background-color: rgb(83, 133, 152) !important;
	}
}
</style>
