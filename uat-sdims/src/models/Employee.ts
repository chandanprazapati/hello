import * as yup from "yup";
import { phoneRegExp } from "./commonMatcher";

export interface EmployeeInterface {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  firstName_Eng: string;
  middleName_Eng: string;
  lastName_Eng: string;
  appointmentId: number;
  empCode: number;
  padPurtiTypeId: number;
  genderId: number;
  dob: Date;
  dobNep: string;
  citizenNo: string;
  citizenJariJillaId: number;
  citizenJariMiti: string;
  nationalityId: number;
  email: string;
  religionId: number;
  castId: number;
  phoneNo: string;
  mobileNo: string;
  departmentId: number;
  subDepartmentId: number;
  attOfficeId: number;
  postId: number;
  sewaId: number;
  groupId: number;
  subGroupId: number;
  permanentAddesss: AddressInterface;
  tempoaryAddesss: AddressInterface;
}

export interface AddressInterface {
  stateId: number;
  distId: number;
  palikaId: number;
  wardId: number;
  houseNo: number;
  address: string;
}


export const addressValidation = yup.object<Record<keyof AddressInterface, yup.AnySchema>>({
    stateId: yup.number().required(),
    distId: yup.number().required(),
    palikaId: yup.number().required(),
    wardId: yup.number().required(),
    houseNo: yup.number(),
    address: yup.string().required(),
  });

export const EmployeeFormValidationSchema =  yup.object<Record<keyof EmployeeInterface, yup.AnySchema>>().shape({
  id: yup.number(),
  firstName: yup.string().required(),
  middleName: yup.string(),
  lastName: yup.string().required(),
  firstName_Eng: yup.string().required(),
  middleName_Eng: yup.string(),
  lastName_Eng: yup.string().required(),
  appointmentId: yup.number().required(),
  empCode: yup.number().required(),
  padPurtiTypeId: yup.number().required(),
  genderId: yup.number().required(),
  dob: yup.date().max(new Date()),
  dobNep: yup.string().required(),
  citizenNo: yup.string().required(),
  citizenJariJillaId: yup.number().required(),
  citizenJariMiti: yup.string().required(),
  nationalityId: yup.number().required(),
  email: yup.string().email().required(),
  religionId: yup.number().required(),
  castId: yup.number().required(),
  phoneNo: yup.string().required(),
  mobileNo: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  departmentId: yup.number().required(),
  subDepartmentId: yup.number().required(),
  attOfficeId: yup.number().required(),
  postId: yup.number().required(),
  sewaId: yup.number().required(),
  groupId: yup.number().required(),
  subGroupId: yup.number().required(),
  permanentAddesss: addressValidation,
  tempoaryAddesss: addressValidation,
});
