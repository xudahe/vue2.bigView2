<template>
	<div class="homeMiddleTop" style="width: 100%;height: 100%;position: relative;overflow: hidden;">
		<div class="mapBg1">
			<img src="@/assets/template/004/img/home/地图背景环（倾斜放倒做逆时针更加缓慢旋转效果）.png" style="width: 100%;height: 100%;"
				class="imgAllGifAnti" />
		</div>

		<div class="mapBg2">
			<img src="@/assets/template/004/img/home/地图背景环（倾斜放倒做顺时针缓慢旋转效果）.png" style="width: 100%;height: 100%;"
				class="imgAllGifWise" />
		</div>

		<div class="mapBg">
			<img src="@/assets/template/004/img/maphome/底部地图.png" style="width: 100%;height: 100%;" class="mapClass" />
			<img v-show="floatFlag == item.name" :key="'float' + index" :src="item.url" v-for="(item, index) in titleImg"
				style="width: 100%;height: 100%;" class="mapClass floatimg" />

			<!-- 镇的名称 -->
			<label :key="'lab' + index" v-for="(item, index) in titleImg" :class="[item.classname, 'labelAll']"
				:style="{ color: currentIndex == index ? '#08f5f5' : '#75BDBC' }" style="z-index: 2;"
				@click="labelclick(item.name, index)">{{ item.name }}</label>

			<!-- 地图弹窗 -->
			<div v-show="!isshowTitle" class="modelDiv">
				<div
					:class="['imgAll', titleImg[currentIndex].classname, (currentIndex <= 6 ? 'modelLine1' : 'modelLine2')]">
				</div>
				<div class="modelDivmain"
					:class="['imgAll', titleImg[currentIndex].classname, (currentIndex <= 6 ? 'modelM1' : 'modelM2')]">
					<div
						style="margin-top: 0.2rem;margin-left: 0.2rem;font-size: 0.2rem;font-family: hxbnst;color: rgb(123,248,254);letter-spacing: 2px;">
						{{ titleImg[currentIndex].name }}</div>
					<Row style="margin-top: 0rem;padding: 0.1rem;">
						<Col span="8" class="modelCol">
						<div class="modelValmain">{{ Facilities.ys }}</div>
						<div class="modelLabelmain">雨水管(公里)</div>
						</Col>
						<Col span="8" class="modelCol">
						<div class="modelValmain">{{ Facilities.ws }}</div>
						<div class="modelLabelmain">污水管(公里)</div>
						</Col>
						<Col span="8" class="modelCol">
						<div class="modelValmain">{{ Facilities.qx }}</div>
						<div class="modelLabelmain">缺陷数(个)</div>
						</Col>
						<Col span="8" class="modelCol">
						<div class="modelValmain">{{ Facilities.bz }}</div>
						<div class="modelLabelmain">篦子(个)</div>
						</Col>
						<Col span="8" class="modelCol">
						<div class="modelValmain">{{ Facilities.yj }}</div>
						<div class="modelLabelmain">窨井(个)</div>
						</Col>
						<Col span="8" class="modelCol">
						<div class="modelValmain">{{ Facilities.jcj }}</div>
						<div class="modelLabelmain">检查井(个)</div>
						</Col>
					</Row>

				</div>
			</div>


		</div>


	</div>
</template>

<script>
import bus from "@/eventBus.js";

export default {
	components: {

	},
	data() {
		return {
			Facilities: {
				ys: '--',
				ws: '--',
				qx: '--',
				bz: '--',
				yj: '--',
				jcj: '--',
			},
			timer: [],

			titleImg: [{
				url: require("@/assets/template/004/img/maphome/汤沟镇.png"),
				name: "汤沟镇",
				classname: "label_title1",
			}, {
				url: require("@/assets/template/004/img/maphome/孟兴庄镇.png"),
				name: "孟兴庄镇",
				classname: "label_title2",
			}, {
				url: require("@/assets/template/004/img/maphome/张店镇.png"),
				name: "张店镇",
				classname: "label_title3",
			}, {
				url: require("@/assets/template/004/img/maphome/北陈集镇.png"),
				name: "北陈集镇",
				classname: "label_title4",
			}, {
				url: require("@/assets/template/004/img/maphome/李集乡.png"),
				name: "李集乡",
				classname: "label_title7",
			}, {
				url: require("@/assets/template/004/img/maphome/新安镇.png"),
				name: "新安镇",
				classname: "label_title8",
			}, {
				url: require("@/assets/template/004/img/maphome/三口镇.png"),
				name: "三口镇",
				classname: "label_title9",
			}, {
				url: require("@/assets/template/004/img/maphome/田楼镇.png"),
				name: "田楼镇",
				classname: "label_title5",
			}, {
				url: require("@/assets/template/004/img/maphome/堆沟港镇.png"),
				name: "堆沟港镇",
				classname: "label_title6",
			}, {
				url: require("@/assets/template/004/img/maphome/新集乡.png"),
				name: "新集乡",
				classname: "label_title10",
			}, {
				url: require("@/assets/template/004/img/maphome/百禄镇.png"),
				name: "百禄镇",
				classname: "label_title11",
			}],
			titleFlag: "北陈集镇",
			currentIndex: 3,
			mapfloatImg: [],
			floatFlag: null,
			isshowTitle: true,
			oldflag: null,
			titleold: null
		};
	},
	methods: {
		titlemouseover(name) {
			this.titleFlag = name;
		},
		titlemouseout() {
			this.titleFlag = null;
		},
		labelclick(name, num) {
			for (let a = 0; a < this.timer.length; a++) {
				clearInterval(this.timer[a]);
				this.timer[a] = null;
			}
			this.timer = [];

			var _this = this;
			if (_this.oldflag == name) {
				return;
			}

			_this.titleclick(name, num, false)

			setTimeout(() => {
				// 10秒后看是否有点击操作
				if (_this.oldflag == name) {
					_this.timer.push(setInterval(() => {
						// var num1 = num;
						num++;
						if (num == _this.titleImg.length) {
							num = 0;
						}

						try {
							_this.titleclick(_this.titleImg[num].name, num, false)
						} catch (error) {

						}

					}, 8000))
				}

			}, 10000)
		},
		titleclick(name, num, flag) {
			var _this = this;
			_this.titleFlag = null;
			_this.currentIndex = num;
			_this.isshowTitle = true;
			_this.oldflag = name

			let dom = document.getElementsByClassName('modelDivmain');
			if (dom == undefined || dom.length == 0) return;

			dom[0].classList.remove('rotate-in-y');
			let domf = document.getElementsByClassName('floatimg');
			for (let i = 0; i < domf.length; i++) {
				domf[i].classList.remove('fade-in-upnew');
				domf[i].classList.remove('fade-out-down');
			}
			setTimeout(() => {
				if (flag) {
					domf[num].classList.add('fade-out-down');
				} else {
					if (num == 0) {
						domf[_this.titleImg.length - 1].classList.add('fade-out-down');
					} else {
						domf[num - 1].classList.add('fade-out-down');
					}
				}
				setTimeout(() => {
					_this.floatFlag = null;
					setTimeout(() => {
						dom[0].classList.add('rotate-in-x');
						domf[num].classList.add('fade-in-upnew');
						setTimeout(() => {
							_this.isshowTitle = false;
							_this.floatFlag = name;
							_this.titleFlag = name;
						}, 500)
					}, 100)
				}, 500)
			}, 0)
		},
	},
	mounted() {
		var _this = this;
		var num = 6;

		try {
			_this.titleclick(_this.titleImg[num].name, num, true)
			_this.timer.push(setInterval(() => {
				num++;
				if (num == _this.titleImg.length) {
					num = 0;
				}
				_this.titleclick(_this.titleImg[num].name, num, false)
			}, 8000))
		} catch (error) {

		}
	},
	beforeDestroy() {
		for (let a = 0; a < this.timer.length; a++) {
			clearInterval(this.timer[a]);
			this.timer[a] = null;
		}
		this.timer = [];
	},
};
</script>

<style lang="less" scoped="scoped">
.homeMiddleTop {
	.mapBg1 {
		width: calc(~"9.07rem * 0.9");
		height: calc(~"9.07rem * 0.9");
		-webkit-transform-origin: center center;
		transform-origin: center center;
		-webkit-transform: rotateX(40deg) scaleX(1.1);
		transform: rotateX(40deg) scaleX(1.1);
		position: absolute;
		left: calc(~"(100% - 9.07rem * 0.9) / 2");
		top: calc(~"(100% - 9.07rem * 0.9) / 2");
	}

	.mapBg2 {
		width: calc(~"8.48rem * 0.9");
		height: calc(~"8.48rem * 0.9");
		-webkit-transform-origin: center center;
		transform-origin: center center;
		-webkit-transform: rotateX(40deg) scaleX(1.1);
		transform: rotateX(40deg) scaleX(1.1);
		position: absolute;
		left: calc(~"(100% - 8.48rem * 0.9) / 2");
		top: calc(~"(100% - 8.48rem * 0.9) / 2");
	}

	.mapBg {
		width: calc(~"8.81rem * 0.9");
		height: calc(~"5.85rem * 0.9");
		position: absolute;
		left: calc(~"(100% - 8.81rem * 0.9) / 2");
		top: calc(~"(100% - 5.85rem * 0.9) / 2");
	}

	.mapClass {
		position: absolute;
	}

	.labelAll {
		position: absolute;
		cursor: pointer;
		font-size: 0.18rem;
	}

	.label_title1 {
		top: 3.1rem;
		left: 0.2rem;
	}

	.label_title2 {
		top: 2.9rem;
		left: 0.8rem;
	}

	.label_title3 {
		top: 2.6rem;
		left: 1.9rem;
	}

	.label_title4 {
		top: 2.5rem;
		left: 3.0rem;
	}

	.label_title5 {
		top: 1.9rem;
		left: 4.9rem;
	}

	.label_title6 {
		top: 1.0rem;
		left: 6.4rem;
	}

	.label_title7 {
		top: 3.7rem;
		left: 1.2rem;
	}

	.label_title8 {
		top: 3.6rem;
		left: 2.3rem;
	}

	.label_title9 {
		top: 2.8rem;
		left: 3.8rem;
	}

	.label_title10 {
		top: 4.1rem;
		left: 3.4rem;
	}

	.label_title11 {
		top: 3.8rem;
		left: 4.4rem;
	}


	.imgAll {
		position: absolute;
		cursor: pointer;
	}


	.modelDiv {
		position: relative;
		z-index: 2;
	}

	.modelLine1 {
		width: calc(~"0.83rem * 1");
		height: calc(~"0.34rem * 1");
		background: url(~@/assets/template/004/img/home/弹窗连接线1.png) no-repeat;
		background-size: 100% 100%;
		margin-left: 0.4rem;
		margin-top: -0.25rem;
	}

	.modelLine2 {
		width: calc(~"0.83rem * 1");
		height: calc(~"0.34rem * 1");
		background: url(~@/assets/template/004/img/home/弹窗连接线.png) no-repeat;
		background-size: 100% 100%;
		margin-left: -0.3rem;
		margin-top: -0.25rem;
	}

	.modelDivmain {
		width: calc(~"3.93rem * 1");
		height: calc(~"2.02rem * 1");
		background: url(~@/assets/template/004/img/home/弹窗.png) no-repeat;
		background-size: 100% 100%;
	}

	.modelM1 {
		margin-left: 1.2rem;
		margin-top: -0.5rem;
	}

	.modelM2 {
		margin-left: -4.2rem;
		margin-top: -0.7rem;
	}

	.modelCol {
		text-align: left;
		padding-left: 3%;
	}

	.modelVal {
		color: #75b2da;
		font-size: 0.16rem;
		font-weight: 600;
	}

	.modelLabel {
		color: #008fff;
		font-size: 0.16rem;
		font-weight: 600;
	}

	.modelValmain {
		color: #ffee2a;
		font-size: 0.25rem;
		font-weight: 600;
	}

	.modelLabelmain {
		color: #94dfff;
		font-size: 0.17rem;
		font-weight: 600;
	}
}
</style>
