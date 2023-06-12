/*
 * @Author: Y
 * @Date: 2023-01-13
 * @Description: 馆藏清单
 */
import { request } from '@umijs/max';

// 所属馆
export async function getLibraryInfos(data?: API.ParamsData) {
  return request<API.PromiseResponse>('/catalogue-backend/dropDownChoice/getLibraryInfos', {
    method: 'GET',
    params: data,
  });
}

// 所属馆藏地/所在馆藏地
export async function getLocations(data: API.ParamsData) {
  return request('/catalogue-backend/redis/getLocations', {
    method: 'GET',
    params: data,
  });
}

// 文献流通类型
export async function getLoanTypes(data: API.ParamsData) {
  return request('/catalogue-backend/redis/getLoanTypes', {
    method: 'GET',
    params: data,
  });
}

// 馆藏状态
export async function getItemStatus(data: API.ParamsData) {
  return request('/catalogue-backend/dropDownChoice/getItemStatus', {
    method: 'GET',
    params: data,
  });
}

// 文献来源
export async function getLiteratureSources(data: API.ParamsData) {
  return request('/catalogue-backend/redis/getLiteratureSources', {
    method: 'GET',
    params: data,
  });
}

// 供货商
export async function getOrganizations(data: API.ParamsData) {
  return request('/catalogue-backend/redis/getOrganizations', {
    method: 'GET',
    params: data,
  });
}

// 导出馆藏清单列表
export async function exportCollectionListing(data: API.ParamsData) {
  return request('/catalogue-backend/collectionListing/exportCollectionListing', {
    method: 'POST',
    data,
  });
}

// 馆藏清单列表
export async function getCollectionListing(data: API.ParamsData) {
  return request('/catalogue-backend/collectionListing/getCollectionListing', {
    method: 'POST',
    data,
  });
}

// 种数,册数,总码洋
export async function getStatisticsInfo(data: API.ParamsData) {
  return request('/catalogue-backend/collectionListing/getStatisticsInfo', {
    method: 'POST',
    data,
  });
}

// 获取用户导出模板
export async function getUserExportTemplates(data: API.ParamsData) {
  return request('/catalogue-backend/outPutExcelSetting/getOutPutExcelTemplates', {
    method: 'GET',
    params: data,
  });
}

// 新增/更新导出模板
export async function upsertExportTemplate(data: API.ParamsData) {
  return request('/catalogue-backend/outPutExcelSetting/upsertOutPutExcelTemplate', {
    method: 'POST',
    data,
  });
}

// 获取操作人
export async function getOperateUsers() {
  return request('/api/users?limit=1000&offset=0&query=(cql.allRecords=1)', {
    method: 'GET',
  });
}
