import {
  ApplicationMap,
  ApplicationStatusMap,
  CancelOnboardingReasonMap,
  EmployeeFormStatusMap,
  EmployeeTypeMap,
  EthnicityMap,
  GenderMap,
  HukouTypeMap,
  IdTypeMap,
  MartialStatusMap,
  StatusMap,
} from '../../../lib/mapping';
import { Resolvers } from '../../codegen/__generated__/graphql';

const fieldEnum_2_map = {
  APPLICATION: ApplicationMap,
  APPLICATION_STATUS: ApplicationStatusMap,
  CANCEL_ONBOARDING_REASON: CancelOnboardingReasonMap,
  EMPLOYEE_FORM_STATUS: EmployeeFormStatusMap,
  EMPLOYEE_TYPE: EmployeeTypeMap,
  ETHNICITY: EthnicityMap,
  GENDER: GenderMap,
  HUKOU_TYPE: HukouTypeMap,
  ID_TYPE: IdTypeMap,
  MARTIAL_STATUS: MartialStatusMap,
  STATUS: StatusMap,
};

export const optionQueryResolvers: Resolvers = {
  Query: {
    options: (_root: any, { input: { fields } }) => {
      let optionsRes = [];
      for (let item of fields) {
        const options = Object.values(fieldEnum_2_map[item]);
        const optionObj = {
          field: `${item}`,
          options,
        };
        optionsRes.push(optionObj);
      }
      return optionsRes;
    },
  },
};
