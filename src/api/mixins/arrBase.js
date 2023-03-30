import Vue from 'vue'

//对象数组基本操作
export default {
    data() {},
    methods: {
        //排序
        compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },
        //去重
        unique(arr, name) {
            var hash = {};
            return arr.reduce(function(item, next) {
                hash[next[name]] ? "" : (hash[next[name]] = true && item.push(next));
                return item;
            }, []);
        },
        //查找树最大深度和最大广度
        levelMax(tree) {
            let maxInfo = {
                maxFloor: 0,
                maxNum: 0
            };

            function each(data, num, floor) {
                data.forEach(e => {
                    e.num = num;
                    e.floor = floor;
                    if (num > maxInfo.maxNum) {
                        maxInfo.maxNum = num;
                    }
                    if (floor > maxInfo.maxFloor) {
                        maxInfo.maxFloor = floor;
                    }
                    if (e.children != undefined && e.children.length > 0) {
                        each(e.children, e.children.length, floor + 1);
                    }
                })
            }
            each(tree, tree.length, 1);
            return maxInfo;
        },
        //根据id获取对应节点
        getNode(tree, id) {
            let node = null;

            function each(data, id) {
                data.forEach(e => {
                    if (e.FEATUREID == id) {
                        node = e;
                        return node;
                    }
                    if (e.children != undefined && e.children.length > 0) {
                        each(e.children, id);
                    }
                })
            }
            each(tree, id);
            return node;
        }
    }
}


// WEBPACK FOOTER //
// ./src/share/mixins/arrBase.js