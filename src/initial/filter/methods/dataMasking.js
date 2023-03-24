/**
 * @description  根据身份证号码判断男女
 * <td>{{dateStr | sexIdcard}}</td>
 */
export function sexIdcard(value) {
    return !value ? '' : value.substr(16, 1) % 2 === 1 ? '男' : '女';
}

/**
 * @description  身份证号脱敏('331082199708094687' 转换成 '33108219********87') 第8位开始替换8个
 */
export function IDcardHide(value) {
    return value.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
}

/**
 * @description  手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
 */
export function telHide(value) {
    return value.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
}

/**
 * @description  姓名脱敏(小明 转换成 *明  ; 李小明 转换成 李*明  ; 欧阳小明 转换成 欧**明)
 */
export function nameHide(value) {
    if (value.length === 2) {
        return new Array(value.length).join('*') + value.substr(-1)
    } else {
        return (
            value.substr(0, 1) + new Array(value.length - 1).join('*') + value.substr(-1)
        )
    }
}