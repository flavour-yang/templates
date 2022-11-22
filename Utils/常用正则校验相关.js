/*
 * @Author: Y
 * @Date: 2022-11-22
 */
/**
 * @description: 手机号码校验,电话
 * 1开头 接3456789 任意数字结尾9位
 */
const phoneReg = /^1[3456789]\d{9}$/;

/**
 * @description: ✉️验证邮箱,Email,email
 */
const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

/**
 * @description: 📨验证邮编
 */
const postcodeReg = /^[0-9]{6}$/;

/**
 * @description: 大于0的数值
 */
const numberReg = /^[1-9][0-9]*|[0-9]*[1-9]$/;

/**
 * @description: 正整数
 */
const number1Reg = /^[1-9]\d*$/;

/**
 * @description: 验证年份
 */
const yearReg = /^[0-9]{4}$/;

/**
 * @description: 验证月份
 */
const monthReg = /^0?[1-9]$|^1[0-2]$/;

/**
 * @description: 验证电话
 */
const telReg = /^0\d{2,3}-\d{7,8}/;

/**
 * @description: 电验证话与手机号
 */
const telPhoneReg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;

/**
 * @description: 图书 ISBN 校验
 * 0-9开头 8位数值 0-9xX结尾 或 0-9开头 11位数 0-9xX结尾
 */
const ISBNReg = /^[0-9]\d{8}[0-9Xx]$|^[0-9]\d{11}[0-9Xx]$/;

/**
 * @description: 检验 汉字 中文
 */
const chineseReg = /^[\u4e00-\u9fa5]+$/;

/**
 * @description: 正数与保留两位小数的数值
 */
const numberFixedReg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;

/**
 * @description: 校验是否是url
 */
const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
