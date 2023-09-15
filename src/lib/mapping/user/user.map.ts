import { MapType } from '../type.map';

export const ApplicationMap: MapType = {
  1: { id: 1, value: '未申请' },
  2: { id: 2, value: '审批中' },
  3: { id: 3, value: '被驳回' },
  4: { id: 4, value: '已通过' },
};

export const ApplicationStatusMap: MapType = {
  1: { id: 1, value: '无需转正' },
  2: { id: 2, value: '待转正' },
  3: { id: 3, value: '已转正' },
};

export const CancelOnboardingReasonMap: MapType = {
  1: { id: 1, value: '个人原因' },
  2: { id: 2, value: '原单位留职' },
  3: { id: 3, value: '接受其他 Offer' },
  4: { id: 4, value: '其他' },
};

export const EmployeeFormStatusMap: MapType = {
  1: { id: 1, value: '未发送' },
  2: { id: 2, value: '待提交' },
  3: { id: 3, value: '已提交' },
};

export const EmployeeTypeMap: MapType = {
  1: { id: 1, value: '正式' },
  2: { id: 2, value: '实习' },
  3: { id: 3, value: '顾问' },
  4: { id: 4, value: '外包' },
  5: { id: 5, value: '劳务' },
};

export const EthnicityMap: MapType = {
  1: { id: 1, value: '汉族' },
  2: { id: 2, value: '蒙古族' },
  3: { id: 3, value: '回族' },
  4: { id: 4, value: '藏族' },
  5: { id: 5, value: '维吾尔族' },
  10: { id: 10, value: '朝鲜族' },
  57: { id: 57, value: '其他' },
};

export const GenderMap: MapType = {
  0: { id: 0, value: '保密' },
  1: { id: 1, value: '男' },
  2: { id: 2, value: '女' },
};

export const HukouTypeMap: MapType = {
  1: { id: 1, value: '本市城镇' },
  2: { id: 2, value: '外埠城镇' },
  3: { id: 3, value: '本市农村' },
  4: { id: 3, value: '外埠农村' },
};

export const IdTypeMap: MapType = {
  1: { id: 1, value: '居民身份证' },
  2: { id: 2, value: '港澳居民来往内地通行证' },
  3: { id: 3, value: '台湾居民来往大陆通行证' },
  4: { id: 4, value: '护照' },
  5: { id: 5, value: '其他' },
};

export const MartialStatusMap: MapType = {
  1: { id: 1, value: '未婚' },
  2: { id: 2, value: '已婚' },
  3: { id: 3, value: '离异' },
  4: { id: 4, value: '其他' },
};

export const StatusMap: MapType = {
  1: { id: 1, value: '待入职' },
  2: { id: 2, value: '在职' },
  3: { id: 3, value: '已取消入职' },
  4: { id: 4, value: '待离职' },
  5: { id: 5, value: '已离职' },
};

export const userAttachmentIsMulti = {
  health_card_image: false,
  id_photo: false,
  id_photo_em_side: false,
  id_photo_po_side: false,
  education_photo: true,
  diploma_photo: true,
  customField_1662357201897: true,
  customField_1662357177496: true,
  customField_1662357051814: true,
  customField_1662357008224: true,
  custom_7239232061806020134: true,
  customField_1662357222887: true,
  customField_1662357152436: true,
  customField_1662357127001: true,
  customField_1662357100065: true,
};

export const UserAttachmentMap = {
  health_card_image: {
    id: 1,
    kind: 'health_card_image',
    value: '健康证图片',
    isMulti: false,
  },
  id_photo: { id: 2, kind: 'id_photo', value: '证件照', isMulti: false },
  id_photo_em_side: {
    id: 3,
    kind: 'id_photo_em_side',
    value: '身份证照片（国徽面）',
    isMulti: false,
  },
  id_photo_po_side: {
    id: 4,
    kind: 'id_photo_po_side',
    value: '身份证照片（人像面）',
    isMulti: false,
  },
  education_photo: {
    id: 5,
    kind: 'education_photo',
    value: '毕业证书',
    isMulti: true,
  },
  diploma_photo: {
    id: 6,
    kind: 'diploma_photo',
    value: '学位证书',
    isMulti: true,
  },
  customField_1662357201897: {
    id: 7,
    kind: 'customField_1662357201897',
    value: '保密协议第二页',
    isMulti: true,
  },
  customField_1662357177496: {
    id: 8,
    kind: 'customField_1662357177496',
    value: '保密协议第一页',
    isMulti: true,
  },
  customField_1662357051814: {
    id: 9,
    kind: 'customField_1662357051814',
    value: '上传劳动合同第一页',
    isMulti: true,
  },
  customField_1662357008224: {
    id: 10,
    kind: 'customField_1662357008224',
    value: '上传劳动合同首页',
    isMulti: true,
  },
  custom_7239232061806020134: {
    id: 11,
    kind: 'custom_7239232061806020134',
    value: '假期工协议第二页',
    isMulti: true,
  },
  customField_1662357222887: {
    id: 12,
    kind: 'customField_1662357222887',
    value: '假期工协议第一页',
    isMulti: true,
  },
  customField_1662357152436: {
    id: 13,
    kind: 'customField_1662357152436',
    value: '个人征信报告',
    isMulti: true,
  },
  customField_1662357127001: {
    id: 14,
    kind: 'customField_1662357127001',
    value: '入职登记表',
    isMulti: true,
  },
  customField_1662357100065: {
    id: 15,
    kind: 'customField_1662357100065',
    value: '上传劳动合同第七页',
    isMulti: true,
  },
};
