import Vue from 'vue'

// 引入iview框架
import IviewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(IviewUI);

// iview 中<Select>组件的</Option>不要换行,不然展示下拉数据经常出不来

// vue之iview table展示图片，实现点击放大

//------------------------------多张图片----------------------------------
// {
//     title: '图片',
//     align: "center",
//     width: 150,
//     render: (h, params) => {
//       let devicesArr = [];
//       let devicesArr1 = [];
//       let photos = [];

//       if (params.row.imgurl != "") {
//         let list = params.row.imgurl.split(',');
//         list.forEach(item => {
//           let url = mapconfig.webservices + 'LYG/' + item;
//           photos.push(url);
//           devicesArr1.push(
//             h('img', {
//               attrs: {
//                 src: url,
//                 style: 'width: 30px;margin-right:5px;	cursor:pointer;margin-top: 10px',
//               },
//             })
//           )
//         })
//         devicesArr.push(
//           h('viewer', {
//             props: {
//               images: photos
//             }
//           }, [devicesArr1]
//           )
//         );
//       }
//       return h('div', devicesArr);
//     }
//   },

//------------------------------单张图片----------------------------------
// {
//     title: '检修前照片',
//     key: 'phonebefore',
//     align: 'center',
//     render: (h, params) => {
//         return h('div', [
//             h(
//                 'img', {
//                     attrs: {
//                         src: params.row.beforeurl == '' ? '' : mapconfig.webservices + 'LYG/' + params.row.beforeurl,
//                         'v-viewer': true
//                     },
//                     style: {
//                         width: '40px',
//                         height: '40px',
//                         'margin-top': '10px',
//                         cursor: 'pointer'
//                     },
//                     on: {
//                         click: () => {
//                             this.imgClick(params.row.beforeurl);
//                         }
//                     }
//                 },
//             )
//         ])
//     }
// },