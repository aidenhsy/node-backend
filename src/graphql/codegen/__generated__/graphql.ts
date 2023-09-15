import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ApplicationScalar: any;
  DateScalar: any;
};

export type AttGroup = {
  __typename?: 'AttGroup';
  /** 是否允许外勤打卡 */
  allow_out_punch?: Maybe<Scalars['Boolean']>;
  /** 是否允许 PC 端打卡 */
  allow_pc_punch?: Maybe<Scalars['Boolean']>;
  /** 需要打卡部门 */
  bind_departments?: Maybe<Array<Maybe<Department>>>;
  /** 需要打卡员工 */
  bind_employees?: Maybe<Array<Maybe<User>>>;
  /** 考勤组人数 */
  bind_head_count?: Maybe<Scalars['Int']>;
  /** 国家日历 ID，0：不根据国家日历排休，1：中国大陆，2：美国，3：日本，4：印度，5：新加坡，默认 1 */
  calendar_id?: Maybe<Scalars['Int']>;
  /** 每次打卡均需拍照 */
  clockIn_need_photo?: Maybe<Scalars['Boolean']>;
  /** 生效时间 */
  effect_time?: Maybe<Scalars['DateScalar']>;
  /** 是否开启人脸识别打卡 */
  face_punch?: Maybe<Scalars['Boolean']>;
  /** GPS 打卡的有效范围（ */
  gps_range?: Maybe<Scalars['Int']>;
  /** 考勤类型，0：固定班制，2：排班制， 3：自由班制 */
  group_type?: Maybe<Scalars['Int']>;
  /** 是否隐藏员工打卡详情 */
  hide_staff_punch_time?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  /** 考勤 主负责人 列表 */
  leaders?: Maybe<Array<Maybe<User>>>;
  /** 考勤地点 */
  locations?: Maybe<Array<Maybe<AttLocation>>>;
  /** 考勤组所有人员 */
  members?: Maybe<Array<Maybe<User>>>;
  /** 考勤组名称 */
  name?: Maybe<Scalars['String']>;
  /** 外勤打卡允许员工隐藏详细地址（需要允许外勤打卡才能设置生效） */
  out_punch_allowed_hide_addr?: Maybe<Scalars['Boolean']>;
  /** 外勤打卡需审批（需要允许外勤打卡才能设置生效） */
  out_punch_need_approval?: Maybe<Scalars['Boolean']>;
  /** 外勤打卡需拍照（需要允许外勤打卡才能设置生效） */
  out_punch_need_photo?: Maybe<Scalars['Boolean']>;
  /** 外勤打卡需填写备注（需要允许外勤打卡才能设置生效） */
  out_punch_need_remark?: Maybe<Scalars['Boolean']>;
  /** 打卡类型，位运算。1：GPS 打卡，2：Wi-Fi 打卡，4：考勤机打卡，8：IP 打卡 */
  punch_type?: Maybe<Scalars['Int']>;
  /** 休息日打卡需审批 */
  rest_clockIn_need_approval?: Maybe<Scalars['Boolean']>;
  /** 含有班次 */
  shift_lists?: Maybe<Array<Maybe<ShiftList>>>;
  /** 是否展示累计时长 */
  show_cumulative_time?: Maybe<Scalars['Boolean']>;
  /** 是否展示加班时长 */
  show_over_time?: Maybe<Scalars['Boolean']>;
  /** 考勤子负责人 ID 列表 */
  sub_group_leaders?: Maybe<Array<Maybe<User>>>;
  /** 考勤 子负责人 列表 */
  sub_leaders?: Maybe<Array<Maybe<User>>>;
  /** 时区 */
  time_zone?: Maybe<Scalars['String']>;
};

export type AttGroupFilter = {
  /** 考勤组名称 */
  attendance_group_name?: InputMaybe<Scalars['String']>;
  /** 人员id */
  employee_id?: InputMaybe<Scalars['String']>;
  /** 排序方式 */
  sort_by?: InputMaybe<SortOption>;
};

export type AttGroupRes = {
  __typename?: 'AttGroupRes';
  items: Array<AttGroup>;
  totalCount: Scalars['Int'];
};

export type AttLocation = {
  __typename?: 'AttLocation';
  address?: Maybe<Scalars['String']>;
  bssid?: Maybe<Scalars['String']>;
  feature?: Maybe<Scalars['String']>;
  gps_range?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  ip?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  map_type?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  ssid?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};

export type AttLocationInput = {
  address?: InputMaybe<Scalars['String']>;
  bssid?: InputMaybe<Scalars['String']>;
  feature?: InputMaybe<Scalars['String']>;
  gps_range?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  ip?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  map_type?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  ssid?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['Int']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  attendance_location?: Maybe<AttendanceLocation>;
  attendance_location_id?: Maybe<Scalars['String']>;
  clock_in_location?: Maybe<AttendanceLocation>;
  clock_in_location_id?: Maybe<Scalars['String']>;
  clock_in_result?: Maybe<Scalars['Int']>;
  clock_in_time?: Maybe<Scalars['String']>;
  clock_out_location?: Maybe<AttendanceLocation>;
  clock_out_location_id?: Maybe<Scalars['String']>;
  clock_out_result?: Maybe<Scalars['Int']>;
  clock_out_time?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateScalar']>;
  employee?: Maybe<User>;
  employee_id?: Maybe<Scalars['String']>;
  hours_of_attendance?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  shift?: Maybe<ShiftList>;
  shift_id?: Maybe<Scalars['String']>;
};

export type AttendanceLocation = {
  __typename?: 'AttendanceLocation';
  address?: Maybe<Scalars['String']>;
  attendance_group?: Maybe<AttGroup>;
  attendance_group_id?: Maybe<Scalars['String']>;
  attendances?: Maybe<Array<Maybe<Attendance>>>;
  bssid?: Maybe<Scalars['String']>;
  feature?: Maybe<Scalars['String']>;
  gps_range?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  ip?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  map_type?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  ssid?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};

/** 角色筛选选择 */
export enum AvailableRoles {
  /** 考勤组管理员 */
  AttManager = 'AttManager',
  /** 人事管理员 */
  HrManager = 'HrManager',
  /** 超级管理员 */
  SuperManager = 'SuperManager'
}

export type BirthdayStats = {
  __typename?: 'BirthdayStats';
  lastMonthCount?: Maybe<Scalars['Int']>;
  nextMonthCount?: Maybe<Scalars['Int']>;
  thisMonthCount?: Maybe<Scalars['Int']>;
  thisWeekCount?: Maybe<Scalars['Int']>;
  todayCount?: Maybe<Scalars['Int']>;
};

export type Brand = {
  __typename?: 'Brand';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  stores?: Maybe<Array<Maybe<Store>>>;
};

export type ChildSalesData = {
  __typename?: 'ChildSalesData';
  amount?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateAttendanceGroupInput = {
  /** 是否允许外勤打卡 */
  allow_out_punch?: InputMaybe<Scalars['Boolean']>;
  /** 是否允许 PC 端打卡 */
  allow_pc_punch?: InputMaybe<Scalars['Boolean']>;
  /** 国家日历 ID，0：不根据国家日历排休，1：中国大陆，2：美国，3：日本，4：印度，5：新加坡，默认 1 */
  calendar_id?: InputMaybe<Scalars['Int']>;
  /** 每次打卡均需拍照 */
  clockIn_need_photo?: InputMaybe<Scalars['Boolean']>;
  /** 生效时间 */
  effect_time?: InputMaybe<Scalars['DateScalar']>;
  /** 是否开启人脸识别打卡 */
  face_punch?: InputMaybe<Scalars['Boolean']>;
  /** GPS 打卡的有效范围（ */
  gps_range?: InputMaybe<Scalars['Int']>;
  /** 考勤类型，0：固定班制，2：排班制， 3：自由班制 */
  group_type?: InputMaybe<Scalars['Int']>;
  /** 是否隐藏员工打卡详情 */
  hide_staff_punch_time?: InputMaybe<Scalars['Boolean']>;
  /** 考勤 主负责人 列表 */
  leader_ids: Array<Scalars['String']>;
  /** 考勤地点 */
  locations?: InputMaybe<Array<InputMaybe<AttLocationInput>>>;
  /** 需要考勤的人员 */
  members?: InputMaybe<Array<InputMaybe<MembersInput>>>;
  /** 考勤组名称 */
  name: Scalars['String'];
  /** 外勤打卡允许员工隐藏详细地址（需要允许外勤打卡才能设置生效） */
  out_punch_allowed_hide_addr?: InputMaybe<Scalars['Boolean']>;
  /** 外勤打卡需审批（需要允许外勤打卡才能设置生效） */
  out_punch_need_approval?: InputMaybe<Scalars['Boolean']>;
  /** 外勤打卡需拍照（需要允许外勤打卡才能设置生效） */
  out_punch_need_photo?: InputMaybe<Scalars['Boolean']>;
  /** 外勤打卡需填写备注（需要允许外勤打卡才能设置生效） */
  out_punch_need_remark?: InputMaybe<Scalars['Boolean']>;
  /** 打卡类型，位运算。1：GPS 打卡，2：Wi-Fi 打卡，4：考勤机打卡，8：IP 打卡 */
  punch_type?: InputMaybe<Scalars['Int']>;
  /** 休息日打卡需审批 */
  rest_clockIn_need_approval?: InputMaybe<Scalars['Boolean']>;
  /** 是否展示累计时长 */
  show_cumulative_time?: InputMaybe<Scalars['Boolean']>;
  /** 是否展示加班时长 */
  show_over_time?: InputMaybe<Scalars['Boolean']>;
  /** 考勤子负责人 ID 列表 */
  sub_leader_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 时区 */
  time_zone?: InputMaybe<Scalars['String']>;
};

export type CreateAttendanceInput = {
  date?: InputMaybe<Scalars['DateScalar']>;
  employee_id?: InputMaybe<Scalars['String']>;
  shift_id?: InputMaybe<Scalars['String']>;
};

export type CreateShiftInput = {
  /** 关联考勤组ID */
  attendance_group_id?: InputMaybe<Scalars['String']>;
  /** 早退多久记为早退 */
  early_minutes_as_early: Scalars['Int'];
  /** 早退多久记为缺卡 */
  early_minutes_as_lack: Scalars['Int'];
  /** 晚到多久记为缺卡 */
  late_minutes_as_lack?: InputMaybe<Scalars['Int']>;
  /** 晚到多久记为迟到 */
  late_minutes_as_late?: InputMaybe<Scalars['Int']>;
  /** 不需要打下班卡 */
  no_need_off?: InputMaybe<Scalars['Boolean']>;
  /** 最晚多久可打下班卡 */
  off_delay_minutes?: InputMaybe<Scalars['Int']>;
  /** 下班时间 */
  off_time: Scalars['DateScalar'];
  /** 最早多久可打上班卡 */
  on_advance_minutes?: InputMaybe<Scalars['Int']>;
  /** 上班时间 */
  on_time: Scalars['DateScalar'];
  /** 班次名称 */
  shift_name: Scalars['String'];
};

export type CreateUserInput = {
  department_id?: InputMaybe<Scalars['ID']>;
  hire_date?: InputMaybe<Scalars['DateScalar']>;
  mobile?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
};

export type Department = {
  __typename?: 'Department';
  /** 所有子部门成员 */
  all_employees?: Maybe<UsersList>;
  /** 所有子部门 */
  child_departments?: Maybe<Array<Maybe<Department>>>;
  /** 该部门成员 */
  employees?: Maybe<Array<Maybe<User>>>;
  /** 部门ID */
  id: Scalars['ID'];
  /** 部门直属领导 */
  manager_id?: Maybe<Scalars['ID']>;
  /** 部门名称 */
  name?: Maybe<Scalars['String']>;
  /** 父部门 */
  parent_department?: Maybe<Department>;
  /** 父部门ID */
  parent_department_id?: Maybe<Scalars['ID']>;
  /** 小部门名称（eg：前厅，后厨。。。） */
  small_department_name?: Maybe<Scalars['String']>;
};

export type DepartmentFilter = {
  /** 模糊搜索部门名字 */
  name?: InputMaybe<Scalars['String']>;
};

export type DepartmentRes = {
  __typename?: 'DepartmentRes';
  /** 该查询返回的部门 */
  items?: Maybe<Array<Maybe<Department>>>;
  /** 该查询返回所有items的数量 */
  totalCount: Scalars['Int'];
};

export enum EmployeeSort {
  RoleRankingAsc = 'ROLE_RANKING_ASC',
  RoleRankingDesc = 'ROLE_RANKING_DESC'
}

export enum FieldEnums {
  /** 转正申请 */
  Application = 'APPLICATION',
  /** 转正状态 */
  ApplicationStatus = 'APPLICATION_STATUS',
  /** 取消入职原因 */
  CancelOnboardingReason = 'CANCEL_ONBOARDING_REASON',
  /** 入职登记表状态 */
  EmployeeFormStatus = 'EMPLOYEE_FORM_STATUS',
  /** 人员类型 */
  EmployeeType = 'EMPLOYEE_TYPE',
  /** 民族 */
  Ethnicity = 'ETHNICITY',
  /** 性别 */
  Gender = 'GENDER',
  /** 户口类型 */
  HukouType = 'HUKOU_TYPE',
  /** 证件类型 */
  IdType = 'ID_TYPE',
  /** 婚姻状况 */
  MartialStatus = 'MARTIAL_STATUS',
  /** 员工状态 */
  Status = 'STATUS'
}

export type FieldInput = {
  fields: Array<FieldEnums>;
};

export type FilterInput = {
  name?: InputMaybe<Scalars['String']>;
};

/** 本日，本周，本月，下月，上月 的员工入职周年的数量 */
export type HireDateStats = {
  __typename?: 'HireDateStats';
  /** 历年下月入职的员工数量(下月1号到下月最后1天) */
  lastMonthCount?: Maybe<Scalars['Int']>;
  /** 历年上月入职的员工数量(上月1号到上月最后1天) */
  nextMonthCount?: Maybe<Scalars['Int']>;
  /** 历年本月入职的员工数量(本月1号到本月最后1天) */
  thisMonthCount?: Maybe<Scalars['Int']>;
  /** 历年本周入职的员工数量(本周一到本周日) */
  thisWeekCount?: Maybe<Scalars['Int']>;
  /** 历年今天入职的员工数量 */
  todayCount?: Maybe<Scalars['Int']>;
};

export type HrConversionStats = {
  __typename?: 'HrConversionStats';
  /** 全部待转正数量 */
  awaitRegularizedCount?: Maybe<Scalars['Int']>;
  /** 下月待转正数量 */
  nextMonthAwaitRegularizedCount?: Maybe<Scalars['Int']>;
  /** 超期未转正数量 */
  overdueRegularizedCount?: Maybe<Scalars['Int']>;
  /** 本月待转正数量 */
  thisMonthAwaitRegularizedCount?: Maybe<Scalars['Int']>;
};

export type HrOnboardingStats = {
  __typename?: 'HrOnboardingStats';
  /** 全部待入职数量 */
  awaitOnboardingCount?: Maybe<Scalars['Int']>;
  /** 本月待入职数量 */
  thisMonthAwaitOnboardingCount?: Maybe<Scalars['Int']>;
  /** 今日待入职数量 */
  todayAwaitOnboardingCount?: Maybe<Scalars['Int']>;
};

export type HrResignStats = {
  __typename?: 'HrResignStats';
  /** 全部待离职数量 */
  awaitHiredCount?: Maybe<Scalars['Int']>;
};

/** 人事数据 */
export type HrStats = {
  __typename?: 'HrStats';
  /**
   * 待离职 数量
   * status=4
   */
  awaitUnemployCount?: Maybe<Scalars['Int']>;
  /**
   * 实习 数量
   * status=2 && employee_type=2
   */
  internEmployeeCount?: Maybe<Scalars['Int']>;
  /**
   * 在职 数量
   * status=2
   */
  isEmployedCount?: Maybe<Scalars['Int']>;
  /**
   * 离职 数量
   * status=4
   */
  notEmployedCount?: Maybe<Scalars['Int']>;
  /**
   * 外包 数量
   * status=2 && employee_type=4
   */
  outsourcedEmployeeCount?: Maybe<Scalars['Int']>;
  /**
   * 正式 数量
   * status=2 && employee_type=1
   */
  regularEmployeeCount?: Maybe<Scalars['Int']>;
  /**
   * 试用 数量
   * status=1
   */
  trialEmployeeCount?: Maybe<Scalars['Int']>;
};

export type LocationInput = {
  /** 纬度 */
  latitude: Scalars['Float'];
  /** 经度 */
  longitude: Scalars['Float'];
  /** 打卡地点名称 */
  name: Scalars['String'];
};

/** 用户输入，type: 1=deparment_id, 2=employee_id */
export type MembersInput = {
  id: Scalars['String'];
  type: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 添加门店到管理员 */
  addAdminsStores?: Maybe<Array<Maybe<Store>>>;
  /** 添加考勤组打卡地点 */
  addAttendanceLocation?: Maybe<Array<Maybe<AttLocation>>>;
  /** 添加人员到一个角色 */
  addEmployee2Roles?: Maybe<Role>;
  /** 添加管理员到某个门店 */
  addStoreAdmins?: Maybe<Store>;
  /** 添加新考勤组 */
  createAttendanceGroup?: Maybe<AttGroup>;
  /** 添加排班 */
  createAttendances?: Maybe<MutationResponse>;
  /** 添加角色 */
  createRole?: Maybe<Role>;
  /** 创建班次 */
  createShift?: Maybe<ShiftList>;
  /** 添加新员工 */
  createUser?: Maybe<User>;
  /** 使用ID 删除考勤组 */
  deleteAttendanceGroup?: Maybe<AttGroup>;
  /** 通过location id删除考勤地点 */
  deleteAttendanceLocation?: Maybe<Array<Maybe<AttLocation>>>;
  /** 从一个角色删除一个人员 */
  deleteEmployeeRole?: Maybe<Role>;
  /** 删除角色 */
  deleteRole?: Maybe<Role>;
  /** 删除班次 */
  deleteShift?: Maybe<ShiftList>;
  /** 在某个门店内删除管理员 */
  deleteStoreAdmins?: Maybe<Store>;
  /** 删除员工 */
  deleteUser?: Maybe<Scalars['Boolean']>;
  /** 删除员工附件 */
  deleteUserAttachment?: Maybe<Scalars['Boolean']>;
  /** 更新个人打卡记录 */
  updateAttendance?: Maybe<MutationResponse>;
  /** 更新考勤组 */
  updateAttendanceGroup?: Maybe<AttGroup>;
  /** 更新角色路由 */
  updateRoleNavs?: Maybe<Role>;
  /** 更新班次 */
  updateShift?: Maybe<ShiftList>;
  /** 更新员工信息 */
  updateUser?: Maybe<User>;
};


export type MutationAddAdminsStoresArgs = {
  employee_ids: Array<InputMaybe<Scalars['String']>>;
  store_ids: Array<InputMaybe<Scalars['String']>>;
};


export type MutationAddAttendanceLocationArgs = {
  attendance_group_id: Scalars['String'];
  new_location: LocationInput;
};


export type MutationAddEmployee2RolesArgs = {
  employee_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  role_id?: InputMaybe<Scalars['String']>;
};


export type MutationAddStoreAdminsArgs = {
  employee_ids: Array<InputMaybe<Scalars['String']>>;
  store_id: Scalars['String'];
};


export type MutationCreateAttendanceGroupArgs = {
  attGroupFields?: InputMaybe<CreateAttendanceGroupInput>;
};


export type MutationCreateAttendancesArgs = {
  createAttendanceInput?: InputMaybe<Array<InputMaybe<CreateAttendanceInput>>>;
};


export type MutationCreateRoleArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateShiftArgs = {
  createShiftInput?: InputMaybe<CreateShiftInput>;
};


export type MutationCreateUserArgs = {
  createFields?: InputMaybe<CreateUserInput>;
};


export type MutationDeleteAttendanceGroupArgs = {
  attendance_group_id: Scalars['String'];
};


export type MutationDeleteAttendanceLocationArgs = {
  attendance_location_id: Scalars['String'];
};


export type MutationDeleteEmployeeRoleArgs = {
  employee_id?: InputMaybe<Scalars['String']>;
  role_id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteRoleArgs = {
  role_id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteShiftArgs = {
  shift_id: Scalars['String'];
};


export type MutationDeleteStoreAdminsArgs = {
  employee_ids: Array<InputMaybe<Scalars['String']>>;
  store_id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserAttachmentArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateAttendanceArgs = {
  updateAttendanceInput?: InputMaybe<UpdateAttendanceInput>;
};


export type MutationUpdateAttendanceGroupArgs = {
  attGroupFields?: InputMaybe<UpdateAttendanceGroupInput>;
  attendance_group_id: Scalars['String'];
};


export type MutationUpdateRoleNavsArgs = {
  nav_sm_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  role_id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateShiftArgs = {
  shift_id: Scalars['String'];
  updateFields: UpdateShiftInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  updateFields?: InputMaybe<UpdateUserInput>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  message?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
};

/** 籍贯 */
export type NativeRegion = {
  __typename?: 'NativeRegion';
  /** ISO 编码 */
  iso_code?: Maybe<Scalars['String']>;
  /** 名称 */
  name?: Maybe<Scalars['String']>;
};

export type NativeRegionInput = {
  iso_code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type NavBgCategory = {
  __typename?: 'NavBgCategory';
  children?: Maybe<Array<Maybe<NavSmCategory>>>;
  id: Scalars['Int'];
  key: Scalars['String'];
  nav_xl_categories_id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type NavSmCategory = {
  __typename?: 'NavSmCategory';
  id: Scalars['Int'];
  key: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type NavXlCategory = {
  __typename?: 'NavXlCategory';
  children?: Maybe<Array<Maybe<NavBgCategory>>>;
  id: Scalars['Int'];
  key: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Option = {
  __typename?: 'Option';
  id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type OptionRes = {
  __typename?: 'OptionRes';
  field?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<Option>>>;
};

/** 主要紧急联系人 */
export type PrimaryEmergencyContact = {
  __typename?: 'PrimaryEmergencyContact';
  /** 紧急联系人电话 */
  mobile?: Maybe<Scalars['String']>;
  /** 紧急联系人姓名 */
  name?: Maybe<Scalars['String']>;
  /**
   * 与紧急联系人的关系
   * 1：父母
   * 2：配偶
   * 3：子女
   * 4：兄弟姐妹
   * 5：朋友
   * 6: 其他
   */
  relationship?: Maybe<Scalars['Int']>;
};

export type PrimaryEmergencyContactInput = {
  mobile?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['Int']>;
};

export type PunchTimeRules = {
  __typename?: 'PunchTimeRules';
  /** 早退多久记为早退 */
  early_minutes_as_early?: Maybe<Scalars['Int']>;
  /** 早退多久记为缺卡 */
  early_minutes_as_lack?: Maybe<Scalars['Int']>;
  /** 打卡规则 ID */
  id?: Maybe<Scalars['String']>;
  /** 晚到多久记为缺卡 */
  late_minutes_as_lack?: Maybe<Scalars['Int']>;
  /** 晚到多久记为迟到 */
  late_minutes_as_late?: Maybe<Scalars['Int']>;
  /** 最晚多久可打下班卡 */
  off_delay_minutes?: Maybe<Scalars['Int']>;
  /** 下班时间 */
  off_time?: Maybe<Scalars['DateScalar']>;
  /** 最早多久可打上班卡 */
  on_advance_minutes?: Maybe<Scalars['Int']>;
  /** 上班时间 */
  on_time?: Maybe<Scalars['DateScalar']>;
  /** 班次 ID */
  shift_list_id?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  attGroupById?: Maybe<AttGroup>;
  /** 获取所有考勤组信息 */
  attGroups?: Maybe<AttGroupRes>;
  attendanceLocations?: Maybe<Array<Maybe<AttendanceLocation>>>;
  /** 获取所有排班 */
  attendances?: Maybe<Array<Maybe<Attendance>>>;
  /** 本日，本周，本月，下月，上月 的员工生日的数量 */
  birthdayStats?: Maybe<BirthdayStats>;
  /** 所有品牌 */
  brands?: Maybe<Array<Maybe<Brand>>>;
  /** 通过用户组id获取单个用户组信息 */
  departmentById?: Maybe<Department>;
  /** 获取所有组的信息 */
  departments?: Maybe<DepartmentRes>;
  /** 本日，本周，本月，下月，上月 的员工入职周年的数量 */
  hireDateStats?: Maybe<HireDateStats>;
  hrConversionStats?: Maybe<HrConversionStats>;
  hrOnboardingStats?: Maybe<HrOnboardingStats>;
  hrResignStats?: Maybe<HrResignStats>;
  hrStats?: Maybe<HrStats>;
  /** 获取所有路由（Tree形状） */
  navTree?: Maybe<Array<Maybe<NavXlCategory>>>;
  options?: Maybe<Array<Maybe<OptionRes>>>;
  /** 通过ID获取一个角色的信息 */
  roleById?: Maybe<Role>;
  /** 获取所有角色 */
  roles?: Maybe<Array<Maybe<Role>>>;
  salesSummary?: Maybe<SalesSummary>;
  shiftById?: Maybe<ShiftList>;
  /** 获取班次列表 */
  shiftLists?: Maybe<ShiftListRes>;
  soldItems?: Maybe<Array<Maybe<SoldItem>>>;
  /** 每日统计 */
  statisticsDay?: Maybe<Statistics>;
  /** 所有门店 */
  stores?: Maybe<Array<Maybe<Store>>>;
  /** 通过员工id获取门店 */
  storesByEmployee?: Maybe<Array<Maybe<Store>>>;
  test?: Maybe<Scalars['String']>;
  /** 测试user */
  testUser?: Maybe<User>;
  /** 通过header里面的token获取单个用户信息 */
  user?: Maybe<User>;
  /** 通过用户id获取用户附件 */
  userAttachmentsById?: Maybe<Array<Maybe<UserAttachment>>>;
  /** 通过用户id获取单个用户信息 */
  userById?: Maybe<User>;
  /** 获取所有用户 */
  users: UsersList;
  /** 通过用户组id获取所有该组内所有子组的成员 */
  usersByDepartmentId?: Maybe<UsersList>;
  /** 通过姓名或者手机号码搜索人员 */
  usersSearch: UsersList;
};


export type QueryAttGroupByIdArgs = {
  id: Scalars['String'];
};


export type QueryAttGroupsArgs = {
  filter?: InputMaybe<AttGroupFilter>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryBirthdayStatsArgs = {
  date?: InputMaybe<Scalars['DateScalar']>;
};


export type QueryBrandsArgs = {
  brandName?: InputMaybe<Scalars['String']>;
};


export type QueryDepartmentByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryDepartmentsArgs = {
  filter?: InputMaybe<DepartmentFilter>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryHireDateStatsArgs = {
  date?: InputMaybe<Scalars['DateScalar']>;
};


export type QueryOptionsArgs = {
  input: FieldInput;
};


export type QueryRoleByIdArgs = {
  id: Scalars['String'];
};


export type QueryRolesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QuerySalesSummaryArgs = {
  end_date: Scalars['String'];
  shop_ids: Scalars['String'];
  start_date: Scalars['String'];
};


export type QueryShiftByIdArgs = {
  id: Scalars['String'];
};


export type QueryShiftListsArgs = {
  filter?: InputMaybe<ShiftListFilter>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QuerySoldItemsArgs = {
  endDate: Scalars['String'];
  filter?: InputMaybe<FilterInput>;
  startDate: Scalars['String'];
};


export type QueryStatisticsDayArgs = {
  skip: Scalars['Int'];
  statisticsDayInput?: InputMaybe<StatisticsDayInput>;
  take: Scalars['Int'];
};


export type QueryStoresByEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryUserAttachmentsByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryUserByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UsersFilter>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryUsersByDepartmentIdArgs = {
  department_id?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUsersSearchArgs = {
  searchTerm?: InputMaybe<Scalars['String']>;
};

/** 角色信息 */
export type Role = {
  __typename?: 'Role';
  /** 所属这个角色的人员 */
  employees?: Maybe<Array<Maybe<User>>>;
  /** 角色ID */
  id: Scalars['ID'];
  /** 角色名称 */
  name?: Maybe<Scalars['String']>;
  /** 角色的路由 */
  navs?: Maybe<Array<Maybe<NavXlCategory>>>;
  /** 排序 */
  ranking?: Maybe<Scalars['Int']>;
};

export type SalesData = {
  __typename?: 'SalesData';
  amount?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<ChildSalesData>>>;
  name?: Maybe<Scalars['String']>;
};

/** 营业数据 */
export type SalesSummary = {
  __typename?: 'SalesSummary';
  salesData?: Maybe<Array<Maybe<SalesData>>>;
};

export type ShiftList = {
  __typename?: 'ShiftList';
  /** 考勤组 */
  attendance_groups?: Maybe<Array<Maybe<AttGroup>>>;
  /** 打卡记录 */
  attendances?: Maybe<Array<Maybe<Attendance>>>;
  /** 创建人的id */
  created_by?: Maybe<Scalars['String']>;
  /** 早退多久记为早退 */
  early_minutes_as_early?: Maybe<Scalars['Int']>;
  /** 早退多久记为缺卡 */
  early_minutes_as_lack?: Maybe<Scalars['Int']>;
  /** 弹性打卡时间，设置【上班最多可晚到】与【下班最多可早走】时间，如果不设置flexible_rule则生效 */
  flexible_minutes?: Maybe<Scalars['Int']>;
  /** 班次 ID */
  id: Scalars['String'];
  /** 是否弹性打卡 */
  is_flexible?: Maybe<Scalars['Boolean']>;
  /** 晚到多久记为缺卡 */
  late_minutes_as_lack?: Maybe<Scalars['Int']>;
  /** 晚到多久记为迟到 */
  late_minutes_as_late?: Maybe<Scalars['Int']>;
  /** 不需要打下班卡 */
  no_need_off?: Maybe<Scalars['Boolean']>;
  /** 最晚多久可打下班卡 */
  off_delay_minutes?: Maybe<Scalars['Int']>;
  /** 下班时间 */
  off_time?: Maybe<Scalars['String']>;
  /** 最早多久可打上班卡 */
  on_advance_minutes?: Maybe<Scalars['Int']>;
  /** 上班时间 */
  on_time?: Maybe<Scalars['String']>;
  /** 打卡次数 */
  punch_times?: Maybe<Scalars['Int']>;
  /** 班次名称 */
  shift_name: Scalars['String'];
  /** 班次名称 */
  updated_at?: Maybe<Scalars['DateScalar']>;
};

export type ShiftListFilter = {
  /** 创建人的id */
  created_by?: InputMaybe<Scalars['String']>;
  /** 使用班次名称模糊筛选 */
  search_term?: InputMaybe<Scalars['String']>;
  /** 排序方式 */
  sort_by?: InputMaybe<SortOption>;
};

export type ShiftListRes = {
  __typename?: 'ShiftListRes';
  items: Array<ShiftList>;
  totalCount: Scalars['Int'];
};

export type SoldItem = {
  __typename?: 'SoldItem';
  income?: Maybe<Scalars['Float']>;
  itemName?: Maybe<Scalars['String']>;
  lastTotal?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

export enum SortOption {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Statistics = {
  __typename?: 'Statistics';
  items?: Maybe<Array<Maybe<Attendance>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StatisticsDayInput = {
  date: Scalars['DateScalar'];
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StatisticsMonthlyInput = {
  date: Scalars['String'];
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Store = {
  __typename?: 'Store';
  brand?: Maybe<Brand>;
  brand_id?: Maybe<Scalars['String']>;
  department?: Maybe<Department>;
  department_id?: Maybe<Scalars['String']>;
  managers?: Maybe<Array<Maybe<User>>>;
  salary_account?: Maybe<Scalars['String']>;
  seat_count?: Maybe<Scalars['Int']>;
  shop_id?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['Int']>;
  store?: Maybe<Scalars['String']>;
  storeName?: Maybe<Scalars['String']>;
  supply_shop_id?: Maybe<Scalars['String']>;
  table_count?: Maybe<Scalars['Int']>;
};

/** 更新考勤组Input */
export type UpdateAttendanceGroupInput = {
  /** 是否允许外勤打卡 */
  allow_out_punch?: InputMaybe<Scalars['Boolean']>;
  /** 是否允许 PC 端打卡 */
  allow_pc_punch?: InputMaybe<Scalars['Boolean']>;
  /** 国家日历 ID，0：不根据国家日历排休，1：中国大陆，2：美国，3：日本，4：印度，5：新加坡，默认 1 */
  calendar_id?: InputMaybe<Scalars['Int']>;
  /** 每次打卡均需拍照 */
  clockIn_need_photo?: InputMaybe<Scalars['Boolean']>;
  /** 生效时间 */
  effect_time?: InputMaybe<Scalars['DateScalar']>;
  /** 是否开启人脸识别打卡 */
  face_punch?: InputMaybe<Scalars['Boolean']>;
  /** GPS 打卡的有效范围（ */
  gps_range?: InputMaybe<Scalars['Int']>;
  /** 考勤类型，0：固定班制，2：排班制， 3：自由班制 */
  group_type?: InputMaybe<Scalars['Int']>;
  /** 是否隐藏员工打卡详情 */
  hide_staff_punch_time?: InputMaybe<Scalars['Boolean']>;
  /** 考勤 主负责人 列表 */
  leader_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 考勤地点 */
  locations?: InputMaybe<Array<InputMaybe<AttLocationInput>>>;
  /** 需要考勤的人员 */
  members?: InputMaybe<Array<InputMaybe<MembersInput>>>;
  /** 考勤组名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 外勤打卡允许员工隐藏详细地址（需要允许外勤打卡才能设置生效） */
  out_punch_allowed_hide_addr?: InputMaybe<Scalars['Boolean']>;
  /** 外勤打卡需审批（需要允许外勤打卡才能设置生效） */
  out_punch_need_approval?: InputMaybe<Scalars['Boolean']>;
  /** 外勤打卡需拍照（需要允许外勤打卡才能设置生效） */
  out_punch_need_photo?: InputMaybe<Scalars['Boolean']>;
  /** 外勤打卡需填写备注（需要允许外勤打卡才能设置生效） */
  out_punch_need_remark?: InputMaybe<Scalars['Boolean']>;
  /** 打卡类型，位运算。1：GPS 打卡，2：Wi-Fi 打卡，4：考勤机打卡，8：IP 打卡 */
  punch_type?: InputMaybe<Scalars['Int']>;
  /** 休息日打卡需审批 */
  rest_clockIn_need_approval?: InputMaybe<Scalars['Boolean']>;
  /** 班次id数组 */
  shift_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 是否展示累计时长 */
  show_cumulative_time?: InputMaybe<Scalars['Boolean']>;
  /** 是否展示加班时长 */
  show_over_time?: InputMaybe<Scalars['Boolean']>;
  /** 考勤子负责人 ID 列表 */
  sub_leader_ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 时区 */
  time_zone?: InputMaybe<Scalars['String']>;
};

export type UpdateAttendanceInput = {
  clock_in_time?: InputMaybe<Scalars['String']>;
  clock_out_time?: InputMaybe<Scalars['String']>;
  date: Scalars['DateScalar'];
  employee_id: Scalars['String'];
};

export type UpdateShiftInput = {
  /** 早退多久记为早退 */
  early_minutes_as_early?: InputMaybe<Scalars['Int']>;
  /** 早退多久记为缺卡 */
  early_minutes_as_lack?: InputMaybe<Scalars['Int']>;
  /** 晚到多久记为缺卡 */
  late_minutes_as_lack?: InputMaybe<Scalars['Int']>;
  /** 晚到多久记为迟到 */
  late_minutes_as_late?: InputMaybe<Scalars['Int']>;
  /** 不需要打下班卡 */
  no_need_off?: InputMaybe<Scalars['Boolean']>;
  /** 最晚多久可打下班卡 */
  off_delay_minutes?: InputMaybe<Scalars['Int']>;
  /** 下班时间 */
  off_time?: InputMaybe<Scalars['DateScalar']>;
  /** 最早多久可打上班卡 */
  on_advance_minutes?: InputMaybe<Scalars['Int']>;
  /** 上班时间 */
  on_time?: InputMaybe<Scalars['DateScalar']>;
  /** 班次名称 */
  shift_name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  actual_conversion_time?: InputMaybe<Scalars['DateScalar']>;
  actual_overboard_time?: InputMaybe<Scalars['DateScalar']>;
  application?: InputMaybe<Scalars['Int']>;
  application_status?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<Scalars['String']>;
  bank_account_number?: InputMaybe<Scalars['String']>;
  bank_name?: InputMaybe<Scalars['String']>;
  basic_salary?: InputMaybe<Scalars['Float']>;
  basic_salary_monthly?: InputMaybe<Scalars['Float']>;
  birthday?: InputMaybe<Scalars['DateScalar']>;
  cancel_onboarding_notes?: InputMaybe<Scalars['String']>;
  cancel_onboarding_reason?: InputMaybe<Scalars['Int']>;
  department_id?: InputMaybe<Scalars['ID']>;
  departure_notes?: InputMaybe<Scalars['String']>;
  departure_type?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  employee_form_status?: InputMaybe<Scalars['Int']>;
  employee_no?: InputMaybe<Scalars['String']>;
  employee_type?: InputMaybe<Scalars['Int']>;
  en_name?: InputMaybe<Scalars['String']>;
  entered_workforce_date?: InputMaybe<Scalars['DateScalar']>;
  ethnicity?: InputMaybe<Scalars['Int']>;
  family_address?: InputMaybe<Scalars['String']>;
  gender_id?: InputMaybe<Scalars['Int']>;
  health_card_end?: InputMaybe<Scalars['DateScalar']>;
  health_card_image?: InputMaybe<Scalars['String']>;
  health_card_no?: InputMaybe<Scalars['String']>;
  health_card_start?: InputMaybe<Scalars['DateScalar']>;
  hire_date?: InputMaybe<Scalars['DateScalar']>;
  hukou_location?: InputMaybe<Scalars['String']>;
  hukou_type?: InputMaybe<Scalars['Int']>;
  id_number?: InputMaybe<Scalars['String']>;
  id_photo?: InputMaybe<Scalars['String']>;
  id_photo_em_side?: InputMaybe<Scalars['String']>;
  id_photo_po_side?: InputMaybe<Scalars['String']>;
  id_type?: InputMaybe<Scalars['Int']>;
  isAdmin?: InputMaybe<Scalars['Int']>;
  job_title?: InputMaybe<Scalars['String']>;
  last_day?: InputMaybe<Scalars['DateScalar']>;
  manager_id?: InputMaybe<Scalars['String']>;
  martial_status?: InputMaybe<Scalars['Int']>;
  medical_insurance?: InputMaybe<Scalars['Int']>;
  mobile?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  native_region?: InputMaybe<NativeRegionInput>;
  open_id?: InputMaybe<Scalars['String']>;
  overboard_note?: InputMaybe<Scalars['String']>;
  personal_email?: InputMaybe<Scalars['String']>;
  primary_emergency_contact?: InputMaybe<PrimaryEmergencyContactInput>;
  probation_months?: InputMaybe<Scalars['Int']>;
  provident_fund_account?: InputMaybe<Scalars['String']>;
  salary_account?: InputMaybe<Scalars['String']>;
  salary_type?: InputMaybe<Scalars['String']>;
  social_security_account?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
  title_id?: InputMaybe<Scalars['Int']>;
  update_time?: InputMaybe<Scalars['DateScalar']>;
  user_id?: InputMaybe<Scalars['String']>;
  work_age_type?: InputMaybe<Scalars['String']>;
  work_location?: InputMaybe<Scalars['String']>;
};

/** 用户信息 */
export type User = {
  __typename?: 'User';
  /** 实际转正日期 */
  actual_conversion_time?: Maybe<Scalars['DateScalar']>;
  /** 实际离职日期 */
  actual_overboard_time?: Maybe<Scalars['DateScalar']>;
  /** 转正申请 */
  application?: Maybe<Scalars['Int']>;
  /** 转正状态 */
  application_status?: Maybe<Scalars['Int']>;
  /** 每日考勤班次 */
  attendances?: Maybe<Array<Maybe<Attendance>>>;
  /** 头像 */
  avatar?: Maybe<Scalars['String']>;
  /** 银行卡号 */
  bank_account_number?: Maybe<Scalars['String']>;
  /** 开户行 */
  bank_name?: Maybe<Scalars['String']>;
  /** 基本工资 */
  basic_salary?: Maybe<Scalars['Float']>;
  /** 月薪基本工资 */
  basic_salary_monthly?: Maybe<Scalars['Float']>;
  /** 生日 */
  birthday?: Maybe<Scalars['DateScalar']>;
  /** 取消入职备注 */
  cancel_onboarding_notes?: Maybe<Scalars['String']>;
  /** 取消入职原因 */
  cancel_onboarding_reason?: Maybe<Scalars['Int']>;
  /** 创建时间 */
  created_at?: Maybe<Scalars['DateScalar']>;
  /** 部门 */
  department?: Maybe<Department>;
  /** 部门id */
  department_id?: Maybe<Scalars['String']>;
  /** 离职类型 */
  departure_type?: Maybe<Scalars['Int']>;
  /** 邮箱 */
  email?: Maybe<Scalars['String']>;
  /** 入职登记表状态 */
  employee_form_status?: Maybe<Scalars['Int']>;
  /** 工号 */
  employee_no?: Maybe<Scalars['String']>;
  /** 人员类型 */
  employee_type?: Maybe<Scalars['Int']>;
  /** 英文姓名 */
  en_name?: Maybe<Scalars['String']>;
  /** 参加工作日期 */
  entered_workforce_date?: Maybe<Scalars['DateScalar']>;
  /** 民族 */
  ethnicity?: Maybe<Scalars['Int']>;
  /** 家庭地址 */
  family_address?: Maybe<Scalars['String']>;
  /** 性别id */
  gender_id?: Maybe<Scalars['Int']>;
  /** 健康证到期日期 */
  health_card_end?: Maybe<Scalars['DateScalar']>;
  /** 健康证图片 */
  health_card_image?: Maybe<Scalars['String']>;
  /** 健康证卡号 */
  health_card_no?: Maybe<Scalars['String']>;
  /** 健康证开始日期 */
  health_card_start?: Maybe<Scalars['DateScalar']>;
  /** 入职日期 */
  hire_date?: Maybe<Scalars['DateScalar']>;
  /** 户口所在地 */
  hukou_location?: Maybe<Scalars['String']>;
  /** 户口类型 */
  hukou_type?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** 证件号 */
  id_number?: Maybe<Scalars['String']>;
  /** 证件照 */
  id_photo?: Maybe<Scalars['String']>;
  /** 身份证照片（国徽面） */
  id_photo_em_side?: Maybe<Scalars['String']>;
  /** 身份证照片（人像面） */
  id_photo_po_side?: Maybe<Scalars['String']>;
  /** 证件类型 */
  id_type?: Maybe<Scalars['Int']>;
  /** 是否是高级管理员 */
  isAdmin?: Maybe<Scalars['Int']>;
  /** 职位id */
  job_id?: Maybe<Scalars['Int']>;
  /** 职位名称（将要deprecate，请用job） */
  job_title?: Maybe<Scalars['String']>;
  /** 离职日期 */
  last_day?: Maybe<Scalars['DateScalar']>;
  /** 直属上级id */
  manager_id?: Maybe<Scalars['String']>;
  /** 婚姻状况 */
  martial_status?: Maybe<Scalars['Int']>;
  /** 医疗保险 */
  medical_insurance?: Maybe<Scalars['Int']>;
  /** 手机号码 */
  mobile?: Maybe<Scalars['String']>;
  /** 中文姓名 */
  name?: Maybe<Scalars['String']>;
  /** 籍贯 */
  native_region?: Maybe<NativeRegion>;
  /** 飞书open_id */
  open_id?: Maybe<Scalars['String']>;
  /** 离职原因 */
  overboard_note?: Maybe<Scalars['String']>;
  /** 个人邮箱 */
  personal_email?: Maybe<Scalars['String']>;
  /** 主要紧急联系人 */
  primary_emergency_contact?: Maybe<PrimaryEmergencyContact>;
  /** 试用期（月） */
  probation_months?: Maybe<Scalars['Int']>;
  /** 公积金账号 */
  provident_fund_account?: Maybe<Scalars['String']>;
  /** 员工角色 */
  roles?: Maybe<Array<Maybe<Role>>>;
  /** 工资账号 */
  salary_account?: Maybe<Scalars['String']>;
  /** 薪资类型 */
  salary_type?: Maybe<Scalars['String']>;
  /** 社保账号 */
  social_security_account?: Maybe<Scalars['String']>;
  /** 员工状态 */
  status?: Maybe<Scalars['Int']>;
  /** 已停用 */
  title_id?: Maybe<Scalars['Int']>;
  /** 更新日期 */
  updated_at?: Maybe<Scalars['DateScalar']>;
  /** 飞书user_id */
  user_id?: Maybe<Scalars['String']>;
  /** 工龄类型 */
  work_age_type?: Maybe<Scalars['String']>;
  /** 工作地点 */
  work_location?: Maybe<WorkLocation>;
};

export type UserAttachment = {
  __typename?: 'UserAttachment';
  attachmentContents?: Maybe<Array<Maybe<UserAttachmentContent>>>;
  isMulti?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserAttachmentContent = {
  __typename?: 'UserAttachmentContent';
  file_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type UsersFilter = {
  /** 转正开始和结束日期筛选 (eg: "[2023-05-01, 2023-05-10]") */
  actual_conversion_time?: InputMaybe<Array<InputMaybe<Scalars['DateScalar']>>>;
  /** 离职开始和结束日期筛选 (eg: "[2023-05-01, 2023-05-10]") */
  actual_overboard_time?: InputMaybe<Array<InputMaybe<Scalars['DateScalar']>>>;
  /** 转正申请 */
  application?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 转正状态 */
  application_status?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 考勤记录日期 */
  attendanceDate?: InputMaybe<Scalars['String']>;
  /** 生日月份 */
  birthday_months?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 生日开始和结束日期筛选 (eg: ["04-01", "04-25"]) */
  birthday_range?: InputMaybe<Array<InputMaybe<Scalars['DateScalar']>>>;
  /** 员工部门 */
  department_id?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 离职类型 */
  departure_type?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 人员类型 */
  employee_type?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 性别 */
  gender_id?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** 考勤组id */
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 入职周年筛选 (eg: ["04-01", "04-25"]) */
  hire_anniversary?: InputMaybe<Array<InputMaybe<Scalars['DateScalar']>>>;
  /** 入职开始和结束日期筛选 (eg: "[2023-05-01, 2023-05-10]") */
  hire_dates?: InputMaybe<Array<InputMaybe<Scalars['DateScalar']>>>;
  /** 员工职位 */
  job_title?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 用户角色, 是Available Roles 的 ENUM */
  roles?: InputMaybe<Array<InputMaybe<AvailableRoles>>>;
  /** 姓名或者电话搜索 */
  search_term?: InputMaybe<Scalars['String']>;
  /** 状态：2等于在职 其余数字等于离职 */
  status?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type UsersList = {
  __typename?: 'UsersList';
  /** 该查询返回的用户 */
  items: Array<User>;
  /** 该查询返回所有items的数量 */
  totalCount: Scalars['Int'];
};

/** 工作地点 */
export type WorkLocation = {
  __typename?: 'WorkLocation';
  /** 工作地点 ID */
  id?: Maybe<Scalars['Int']>;
  /** 工作地点名称 */
  name?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApplicationScalar: ResolverTypeWrapper<Scalars['ApplicationScalar']>;
  AttGroup: ResolverTypeWrapper<AttGroup>;
  AttGroupFilter: AttGroupFilter;
  AttGroupRes: ResolverTypeWrapper<AttGroupRes>;
  AttLocation: ResolverTypeWrapper<AttLocation>;
  AttLocationInput: AttLocationInput;
  Attendance: ResolverTypeWrapper<Attendance>;
  AttendanceLocation: ResolverTypeWrapper<AttendanceLocation>;
  AvailableRoles: AvailableRoles;
  BirthdayStats: ResolverTypeWrapper<BirthdayStats>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Brand: ResolverTypeWrapper<Brand>;
  ChildSalesData: ResolverTypeWrapper<ChildSalesData>;
  CreateAttendanceGroupInput: CreateAttendanceGroupInput;
  CreateAttendanceInput: CreateAttendanceInput;
  CreateShiftInput: CreateShiftInput;
  CreateUserInput: CreateUserInput;
  DateScalar: ResolverTypeWrapper<Scalars['DateScalar']>;
  Department: ResolverTypeWrapper<Department>;
  DepartmentFilter: DepartmentFilter;
  DepartmentRes: ResolverTypeWrapper<DepartmentRes>;
  EmployeeSort: EmployeeSort;
  FieldEnums: FieldEnums;
  FieldInput: FieldInput;
  FilterInput: FilterInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  HireDateStats: ResolverTypeWrapper<HireDateStats>;
  HrConversionStats: ResolverTypeWrapper<HrConversionStats>;
  HrOnboardingStats: ResolverTypeWrapper<HrOnboardingStats>;
  HrResignStats: ResolverTypeWrapper<HrResignStats>;
  HrStats: ResolverTypeWrapper<HrStats>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LocationInput: LocationInput;
  MembersInput: MembersInput;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  NativeRegion: ResolverTypeWrapper<NativeRegion>;
  NativeRegionInput: NativeRegionInput;
  NavBgCategory: ResolverTypeWrapper<NavBgCategory>;
  NavSmCategory: ResolverTypeWrapper<NavSmCategory>;
  NavXlCategory: ResolverTypeWrapper<NavXlCategory>;
  Option: ResolverTypeWrapper<Option>;
  OptionRes: ResolverTypeWrapper<OptionRes>;
  PrimaryEmergencyContact: ResolverTypeWrapper<PrimaryEmergencyContact>;
  PrimaryEmergencyContactInput: PrimaryEmergencyContactInput;
  PunchTimeRules: ResolverTypeWrapper<PunchTimeRules>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  SalesData: ResolverTypeWrapper<SalesData>;
  SalesSummary: ResolverTypeWrapper<SalesSummary>;
  ShiftList: ResolverTypeWrapper<ShiftList>;
  ShiftListFilter: ShiftListFilter;
  ShiftListRes: ResolverTypeWrapper<ShiftListRes>;
  SoldItem: ResolverTypeWrapper<SoldItem>;
  SortOption: SortOption;
  Statistics: ResolverTypeWrapper<Statistics>;
  StatisticsDayInput: StatisticsDayInput;
  StatisticsMonthlyInput: StatisticsMonthlyInput;
  Store: ResolverTypeWrapper<Store>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateAttendanceGroupInput: UpdateAttendanceGroupInput;
  UpdateAttendanceInput: UpdateAttendanceInput;
  UpdateShiftInput: UpdateShiftInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserAttachment: ResolverTypeWrapper<UserAttachment>;
  UserAttachmentContent: ResolverTypeWrapper<UserAttachmentContent>;
  UsersFilter: UsersFilter;
  UsersList: ResolverTypeWrapper<UsersList>;
  WorkLocation: ResolverTypeWrapper<WorkLocation>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ApplicationScalar: Scalars['ApplicationScalar'];
  AttGroup: AttGroup;
  AttGroupFilter: AttGroupFilter;
  AttGroupRes: AttGroupRes;
  AttLocation: AttLocation;
  AttLocationInput: AttLocationInput;
  Attendance: Attendance;
  AttendanceLocation: AttendanceLocation;
  BirthdayStats: BirthdayStats;
  Boolean: Scalars['Boolean'];
  Brand: Brand;
  ChildSalesData: ChildSalesData;
  CreateAttendanceGroupInput: CreateAttendanceGroupInput;
  CreateAttendanceInput: CreateAttendanceInput;
  CreateShiftInput: CreateShiftInput;
  CreateUserInput: CreateUserInput;
  DateScalar: Scalars['DateScalar'];
  Department: Department;
  DepartmentFilter: DepartmentFilter;
  DepartmentRes: DepartmentRes;
  FieldInput: FieldInput;
  FilterInput: FilterInput;
  Float: Scalars['Float'];
  HireDateStats: HireDateStats;
  HrConversionStats: HrConversionStats;
  HrOnboardingStats: HrOnboardingStats;
  HrResignStats: HrResignStats;
  HrStats: HrStats;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LocationInput: LocationInput;
  MembersInput: MembersInput;
  Mutation: {};
  MutationResponse: MutationResponse;
  NativeRegion: NativeRegion;
  NativeRegionInput: NativeRegionInput;
  NavBgCategory: NavBgCategory;
  NavSmCategory: NavSmCategory;
  NavXlCategory: NavXlCategory;
  Option: Option;
  OptionRes: OptionRes;
  PrimaryEmergencyContact: PrimaryEmergencyContact;
  PrimaryEmergencyContactInput: PrimaryEmergencyContactInput;
  PunchTimeRules: PunchTimeRules;
  Query: {};
  Role: Role;
  SalesData: SalesData;
  SalesSummary: SalesSummary;
  ShiftList: ShiftList;
  ShiftListFilter: ShiftListFilter;
  ShiftListRes: ShiftListRes;
  SoldItem: SoldItem;
  Statistics: Statistics;
  StatisticsDayInput: StatisticsDayInput;
  StatisticsMonthlyInput: StatisticsMonthlyInput;
  Store: Store;
  String: Scalars['String'];
  UpdateAttendanceGroupInput: UpdateAttendanceGroupInput;
  UpdateAttendanceInput: UpdateAttendanceInput;
  UpdateShiftInput: UpdateShiftInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserAttachment: UserAttachment;
  UserAttachmentContent: UserAttachmentContent;
  UsersFilter: UsersFilter;
  UsersList: UsersList;
  WorkLocation: WorkLocation;
};

export interface ApplicationScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ApplicationScalar'], any> {
  name: 'ApplicationScalar';
}

export type AttGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttGroup'] = ResolversParentTypes['AttGroup']> = {
  allow_out_punch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  allow_pc_punch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  bind_departments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  bind_employees?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  bind_head_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  calendar_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  clockIn_need_photo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  effect_time?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  face_punch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gps_range?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  group_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hide_staff_punch_time?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  leaders?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttLocation']>>>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  out_punch_allowed_hide_addr?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  out_punch_need_approval?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  out_punch_need_photo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  out_punch_need_remark?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  punch_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rest_clockIn_need_approval?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shift_lists?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShiftList']>>>, ParentType, ContextType>;
  show_cumulative_time?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  show_over_time?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sub_group_leaders?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  sub_leaders?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  time_zone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttGroupResResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttGroupRes'] = ResolversParentTypes['AttGroupRes']> = {
  items?: Resolver<Array<ResolversTypes['AttGroup']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttLocation'] = ResolversParentTypes['AttLocation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bssid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gps_range?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  ip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  map_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ssid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttendanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attendance'] = ResolversParentTypes['Attendance']> = {
  attendance_location?: Resolver<Maybe<ResolversTypes['AttendanceLocation']>, ParentType, ContextType>;
  attendance_location_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clock_in_location?: Resolver<Maybe<ResolversTypes['AttendanceLocation']>, ParentType, ContextType>;
  clock_in_location_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clock_in_result?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  clock_in_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clock_out_location?: Resolver<Maybe<ResolversTypes['AttendanceLocation']>, ParentType, ContextType>;
  clock_out_location_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clock_out_result?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  clock_out_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  employee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  employee_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hours_of_attendance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  shift?: Resolver<Maybe<ResolversTypes['ShiftList']>, ParentType, ContextType>;
  shift_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttendanceLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttendanceLocation'] = ResolversParentTypes['AttendanceLocation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attendance_group?: Resolver<Maybe<ResolversTypes['AttGroup']>, ParentType, ContextType>;
  attendance_group_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attendances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attendance']>>>, ParentType, ContextType>;
  bssid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gps_range?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  ip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  map_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ssid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BirthdayStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BirthdayStats'] = ResolversParentTypes['BirthdayStats']> = {
  lastMonthCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextMonthCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thisMonthCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thisWeekCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  todayCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['Brand'] = ResolversParentTypes['Brand']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChildSalesDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChildSalesData'] = ResolversParentTypes['ChildSalesData']> = {
  amount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateScalar'], any> {
  name: 'DateScalar';
}

export type DepartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department']> = {
  all_employees?: Resolver<Maybe<ResolversTypes['UsersList']>, ParentType, ContextType>;
  child_departments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  employees?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manager_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent_department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  parent_department_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  small_department_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DepartmentResResolvers<ContextType = any, ParentType extends ResolversParentTypes['DepartmentRes'] = ResolversParentTypes['DepartmentRes']> = {
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HireDateStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HireDateStats'] = ResolversParentTypes['HireDateStats']> = {
  lastMonthCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextMonthCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thisMonthCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thisWeekCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  todayCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HrConversionStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HrConversionStats'] = ResolversParentTypes['HrConversionStats']> = {
  awaitRegularizedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextMonthAwaitRegularizedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  overdueRegularizedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thisMonthAwaitRegularizedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HrOnboardingStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HrOnboardingStats'] = ResolversParentTypes['HrOnboardingStats']> = {
  awaitOnboardingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thisMonthAwaitOnboardingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  todayAwaitOnboardingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HrResignStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HrResignStats'] = ResolversParentTypes['HrResignStats']> = {
  awaitHiredCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HrStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HrStats'] = ResolversParentTypes['HrStats']> = {
  awaitUnemployCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  internEmployeeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isEmployedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  notEmployedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  outsourcedEmployeeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  regularEmployeeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  trialEmployeeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAdminsStores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType, RequireFields<MutationAddAdminsStoresArgs, 'employee_ids' | 'store_ids'>>;
  addAttendanceLocation?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttLocation']>>>, ParentType, ContextType, RequireFields<MutationAddAttendanceLocationArgs, 'attendance_group_id' | 'new_location'>>;
  addEmployee2Roles?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, Partial<MutationAddEmployee2RolesArgs>>;
  addStoreAdmins?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationAddStoreAdminsArgs, 'employee_ids' | 'store_id'>>;
  createAttendanceGroup?: Resolver<Maybe<ResolversTypes['AttGroup']>, ParentType, ContextType, Partial<MutationCreateAttendanceGroupArgs>>;
  createAttendances?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, Partial<MutationCreateAttendancesArgs>>;
  createRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, Partial<MutationCreateRoleArgs>>;
  createShift?: Resolver<Maybe<ResolversTypes['ShiftList']>, ParentType, ContextType, Partial<MutationCreateShiftArgs>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteAttendanceGroup?: Resolver<Maybe<ResolversTypes['AttGroup']>, ParentType, ContextType, RequireFields<MutationDeleteAttendanceGroupArgs, 'attendance_group_id'>>;
  deleteAttendanceLocation?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttLocation']>>>, ParentType, ContextType, RequireFields<MutationDeleteAttendanceLocationArgs, 'attendance_location_id'>>;
  deleteEmployeeRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, Partial<MutationDeleteEmployeeRoleArgs>>;
  deleteRole?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, Partial<MutationDeleteRoleArgs>>;
  deleteShift?: Resolver<Maybe<ResolversTypes['ShiftList']>, ParentType, ContextType, RequireFields<MutationDeleteShiftArgs, 'shift_id'>>;
  deleteStoreAdmins?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationDeleteStoreAdminsArgs, 'employee_ids' | 'store_id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteUserAttachment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteUserAttachmentArgs, 'id'>>;
  updateAttendance?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, Partial<MutationUpdateAttendanceArgs>>;
  updateAttendanceGroup?: Resolver<Maybe<ResolversTypes['AttGroup']>, ParentType, ContextType, RequireFields<MutationUpdateAttendanceGroupArgs, 'attendance_group_id'>>;
  updateRoleNavs?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, Partial<MutationUpdateRoleNavsArgs>>;
  updateShift?: Resolver<Maybe<ResolversTypes['ShiftList']>, ParentType, ContextType, RequireFields<MutationUpdateShiftArgs, 'shift_id' | 'updateFields'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statusCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NativeRegionResolvers<ContextType = any, ParentType extends ResolversParentTypes['NativeRegion'] = ResolversParentTypes['NativeRegion']> = {
  iso_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NavBgCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['NavBgCategory'] = ResolversParentTypes['NavBgCategory']> = {
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['NavSmCategory']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nav_xl_categories_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NavSmCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['NavSmCategory'] = ResolversParentTypes['NavSmCategory']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NavXlCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['NavXlCategory'] = ResolversParentTypes['NavXlCategory']> = {
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['NavBgCategory']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionResResolvers<ContextType = any, ParentType extends ResolversParentTypes['OptionRes'] = ResolversParentTypes['OptionRes']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['Option']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrimaryEmergencyContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrimaryEmergencyContact'] = ResolversParentTypes['PrimaryEmergencyContact']> = {
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relationship?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PunchTimeRulesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PunchTimeRules'] = ResolversParentTypes['PunchTimeRules']> = {
  early_minutes_as_early?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  early_minutes_as_lack?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  late_minutes_as_lack?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  late_minutes_as_late?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  off_delay_minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  off_time?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  on_advance_minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  on_time?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  shift_list_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  attGroupById?: Resolver<Maybe<ResolversTypes['AttGroup']>, ParentType, ContextType, RequireFields<QueryAttGroupByIdArgs, 'id'>>;
  attGroups?: Resolver<Maybe<ResolversTypes['AttGroupRes']>, ParentType, ContextType, RequireFields<QueryAttGroupsArgs, 'skip' | 'take'>>;
  attendanceLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttendanceLocation']>>>, ParentType, ContextType>;
  attendances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attendance']>>>, ParentType, ContextType>;
  birthdayStats?: Resolver<Maybe<ResolversTypes['BirthdayStats']>, ParentType, ContextType, Partial<QueryBirthdayStatsArgs>>;
  brands?: Resolver<Maybe<Array<Maybe<ResolversTypes['Brand']>>>, ParentType, ContextType, Partial<QueryBrandsArgs>>;
  departmentById?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType, Partial<QueryDepartmentByIdArgs>>;
  departments?: Resolver<Maybe<ResolversTypes['DepartmentRes']>, ParentType, ContextType, RequireFields<QueryDepartmentsArgs, 'skip' | 'take'>>;
  hireDateStats?: Resolver<Maybe<ResolversTypes['HireDateStats']>, ParentType, ContextType, Partial<QueryHireDateStatsArgs>>;
  hrConversionStats?: Resolver<Maybe<ResolversTypes['HrConversionStats']>, ParentType, ContextType>;
  hrOnboardingStats?: Resolver<Maybe<ResolversTypes['HrOnboardingStats']>, ParentType, ContextType>;
  hrResignStats?: Resolver<Maybe<ResolversTypes['HrResignStats']>, ParentType, ContextType>;
  hrStats?: Resolver<Maybe<ResolversTypes['HrStats']>, ParentType, ContextType>;
  navTree?: Resolver<Maybe<Array<Maybe<ResolversTypes['NavXlCategory']>>>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['OptionRes']>>>, ParentType, ContextType, RequireFields<QueryOptionsArgs, 'input'>>;
  roleById?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRoleByIdArgs, 'id'>>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType, Partial<QueryRolesArgs>>;
  salesSummary?: Resolver<Maybe<ResolversTypes['SalesSummary']>, ParentType, ContextType, RequireFields<QuerySalesSummaryArgs, 'end_date' | 'shop_ids' | 'start_date'>>;
  shiftById?: Resolver<Maybe<ResolversTypes['ShiftList']>, ParentType, ContextType, RequireFields<QueryShiftByIdArgs, 'id'>>;
  shiftLists?: Resolver<Maybe<ResolversTypes['ShiftListRes']>, ParentType, ContextType, RequireFields<QueryShiftListsArgs, 'skip' | 'take'>>;
  soldItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['SoldItem']>>>, ParentType, ContextType, RequireFields<QuerySoldItemsArgs, 'endDate' | 'startDate'>>;
  statisticsDay?: Resolver<Maybe<ResolversTypes['Statistics']>, ParentType, ContextType, RequireFields<QueryStatisticsDayArgs, 'skip' | 'take'>>;
  stores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType>;
  storesByEmployee?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType, RequireFields<QueryStoresByEmployeeArgs, 'id'>>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userAttachmentsById?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAttachment']>>>, ParentType, ContextType, Partial<QueryUserAttachmentsByIdArgs>>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserByIdArgs>>;
  users?: Resolver<ResolversTypes['UsersList'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'skip' | 'take'>>;
  usersByDepartmentId?: Resolver<Maybe<ResolversTypes['UsersList']>, ParentType, ContextType, Partial<QueryUsersByDepartmentIdArgs>>;
  usersSearch?: Resolver<ResolversTypes['UsersList'], ParentType, ContextType, Partial<QueryUsersSearchArgs>>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  employees?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  navs?: Resolver<Maybe<Array<Maybe<ResolversTypes['NavXlCategory']>>>, ParentType, ContextType>;
  ranking?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesData'] = ResolversParentTypes['SalesData']> = {
  amount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChildSalesData']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesSummary'] = ResolversParentTypes['SalesSummary']> = {
  salesData?: Resolver<Maybe<Array<Maybe<ResolversTypes['SalesData']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShiftListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShiftList'] = ResolversParentTypes['ShiftList']> = {
  attendance_groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['AttGroup']>>>, ParentType, ContextType>;
  attendances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attendance']>>>, ParentType, ContextType>;
  created_by?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  early_minutes_as_early?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  early_minutes_as_lack?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flexible_minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_flexible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  late_minutes_as_lack?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  late_minutes_as_late?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  no_need_off?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  off_delay_minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  off_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  on_advance_minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  on_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  punch_times?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shift_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShiftListResResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShiftListRes'] = ResolversParentTypes['ShiftListRes']> = {
  items?: Resolver<Array<ResolversTypes['ShiftList']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SoldItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SoldItem'] = ResolversParentTypes['SoldItem']> = {
  income?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  itemName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastTotal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statistics'] = ResolversParentTypes['Statistics']> = {
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attendance']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>;
  brand_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  department_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  managers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  salary_account?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seat_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shop_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  storeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supply_shop_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  table_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  actual_conversion_time?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  actual_overboard_time?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  application?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  application_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  attendances?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attendance']>>>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bank_account_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bank_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basic_salary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  basic_salary_monthly?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  cancel_onboarding_notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancel_onboarding_reason?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  department_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  departure_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employee_form_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  employee_no?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  employee_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  en_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entered_workforce_date?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  ethnicity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  family_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  health_card_end?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  health_card_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  health_card_no?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  health_card_start?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  hire_date?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  hukou_location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hukou_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_photo_em_side?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_photo_po_side?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  job_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  job_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_day?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  manager_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  martial_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  medical_insurance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  native_region?: Resolver<Maybe<ResolversTypes['NativeRegion']>, ParentType, ContextType>;
  open_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overboard_note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  personal_email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primary_emergency_contact?: Resolver<Maybe<ResolversTypes['PrimaryEmergencyContact']>, ParentType, ContextType>;
  probation_months?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  provident_fund_account?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  salary_account?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salary_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social_security_account?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['DateScalar']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  work_age_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  work_location?: Resolver<Maybe<ResolversTypes['WorkLocation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAttachment'] = ResolversParentTypes['UserAttachment']> = {
  attachmentContents?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAttachmentContent']>>>, ParentType, ContextType>;
  isMulti?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAttachmentContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAttachmentContent'] = ResolversParentTypes['UserAttachmentContent']> = {
  file_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersList'] = ResolversParentTypes['UsersList']> = {
  items?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkLocation'] = ResolversParentTypes['WorkLocation']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ApplicationScalar?: GraphQLScalarType;
  AttGroup?: AttGroupResolvers<ContextType>;
  AttGroupRes?: AttGroupResResolvers<ContextType>;
  AttLocation?: AttLocationResolvers<ContextType>;
  Attendance?: AttendanceResolvers<ContextType>;
  AttendanceLocation?: AttendanceLocationResolvers<ContextType>;
  BirthdayStats?: BirthdayStatsResolvers<ContextType>;
  Brand?: BrandResolvers<ContextType>;
  ChildSalesData?: ChildSalesDataResolvers<ContextType>;
  DateScalar?: GraphQLScalarType;
  Department?: DepartmentResolvers<ContextType>;
  DepartmentRes?: DepartmentResResolvers<ContextType>;
  HireDateStats?: HireDateStatsResolvers<ContextType>;
  HrConversionStats?: HrConversionStatsResolvers<ContextType>;
  HrOnboardingStats?: HrOnboardingStatsResolvers<ContextType>;
  HrResignStats?: HrResignStatsResolvers<ContextType>;
  HrStats?: HrStatsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  NativeRegion?: NativeRegionResolvers<ContextType>;
  NavBgCategory?: NavBgCategoryResolvers<ContextType>;
  NavSmCategory?: NavSmCategoryResolvers<ContextType>;
  NavXlCategory?: NavXlCategoryResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  OptionRes?: OptionResResolvers<ContextType>;
  PrimaryEmergencyContact?: PrimaryEmergencyContactResolvers<ContextType>;
  PunchTimeRules?: PunchTimeRulesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  SalesData?: SalesDataResolvers<ContextType>;
  SalesSummary?: SalesSummaryResolvers<ContextType>;
  ShiftList?: ShiftListResolvers<ContextType>;
  ShiftListRes?: ShiftListResResolvers<ContextType>;
  SoldItem?: SoldItemResolvers<ContextType>;
  Statistics?: StatisticsResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAttachment?: UserAttachmentResolvers<ContextType>;
  UserAttachmentContent?: UserAttachmentContentResolvers<ContextType>;
  UsersList?: UsersListResolvers<ContextType>;
  WorkLocation?: WorkLocationResolvers<ContextType>;
};

