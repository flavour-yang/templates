/*
 * @Author: Y
 * @Date: 2022-11-22
 */
/**
 * @description: 处理浏览器路由参数库
 * qs: https://github.com/ljharb/qs
 */

/**
 * @description: querystring: https://github.com/nodejs/node/blob/v16.9.0/lib/querystring.js
 */
import { parse } from 'querystring';
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * @description: 浏览器参数获取实现
 */
//  string 转 object
export const urlToMap = (url) => {
	const preUrl = url.split('?')?.[1];
	if (preUrl) {
		const filters = preUrl
			.split('&')
			.map((i) => i.split('='))
			.reduce((p, n) => {
				p[n[0]] = n[1];
				return p;
			}, {});
		return filters;
	}
	return {};
};

// object 转 string
export const urlToStr = (url) => {
	if (url) {
		let list = [];
		if (obj) {
			for (let [k, v] of Object.entries(obj)) {
				list.push(`${k}=${v}`);
			}
		}
		let str = list.length ? list.join('&') : '';
		return '?' + str;
	}
	return '';
};
