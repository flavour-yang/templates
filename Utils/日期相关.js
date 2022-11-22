/*
 * @Author: Y
 * @Date: 2022-11-22
 * @Description:
 */
/**
 * @description: moment.js使用相关
 */
// 获取当前日期
const time = moment();

// 一天的起始到结束
const startEnd = [moment().startOf('day'), moment().endOf('day')];

// 常用日期格式
const formate = moment().format('YYYY-MM-DD HH:mm:ss');

// 获取近一周, 一个月, 一年, 90天
const limitWeek = moment().subtract(7, 'days');
const limitMonth = moment().subtract(30, 'days');
const limitYear = moment().subtract(1, 'year');
const limit90 = moment().subtract(90, 'days');
