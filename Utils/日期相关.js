/*
 * @Author: Y
 * @Date: 2022-11-22
 * @Description:
 */
import moment from 'moment'
/**
 * @description: moment.js使用相关
 */
// 获取当前日期
export const time = moment()

// 一天的起始到结束
export const startEnd = [moment().startOf('day'), moment().endOf('day')]

// 常用日期格式
export const formate = moment().format('YYYY-MM-DD HH:mm:ss')

// 获取近一周, 一个月, 一年, 90天
export const limitWeek = moment().subtract(7, 'days')
export const limitMonth = moment().subtract(30, 'days')
export const limitYear = moment().subtract(1, 'year')
export const limit90 = moment().subtract(90, 'days')
