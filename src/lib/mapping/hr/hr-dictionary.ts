export interface TranslationDictionary {
  [key: string]: {
    label: string;
    values: {
      [key: string]: string;
    };
  };
}

export const hrDictionary: TranslationDictionary = {
  status: {
    label: '人员状态',
    values: {
      '1': '待入职',
      '2': '在职',
      '3': '已取消入职',
      '4': '待离职',
      '5': '已离职',
    },
  },
  employee_type: {
    label: '人员类型',
    values: {
      '1': '正式',
      '2': '实习',
      '3': '顾问',
      '4': '外包',
      '5': '劳务',
    },
  },
  gender_id: {
    label: '性别',
    values: {
      '0': '保密',
      '1': '男',
      '2': '女',
    },
  },
  hire_dates: {
    label: '入职日期',
    values: {},
  },
  birthday_months: {
    label: '生日月份',
    values: {
      '1': '1月',
      '2': '2月',
      '3': '3月',
      '4': '4月',
      '5': '5月',
      '6': '6月',
      '7': '7月',
      '8': '8月',
      '9': '9月',
      '10': '10月',
      '11': '11月',
      '12': '12月',
    },
  },
  departure_type: {
    label: '离职类型',
    values: {
      '1': '主动',
      '2': '被动',
      '3': '其他',
    },
  },
  // Manager && department id are fetched from DB
  // Add more key-value translations as needed
};

export const hrKeyReverse: Record<string, string> = {
  人员状态: 'status',
  人员类型: 'employee_type',
  性别: 'gender_id',
  入职日期: 'hire_dates',
  直属上级: 'manager',
  部门: 'department_id',
  生日月份: 'birthday_months',
};
