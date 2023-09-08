import { yupResolver } from "@hookform/resolvers/yup";
import {
  addressSchema,
  aliasSchema,
  citizenNoSchema,
  educationSchema,
  contactNoSchema,
  emailSchema,
  endYearSchema,
  fatherNameSchema,
  firstNameSchema,
  grandFatherNameSchema,
  invoiceModuleSchema,
  lastNameSchema,
  nameEngSchema,
  nameSchema,
  occupationSchema,
  openningBalanceSchema,
  phoneNoSchema,
  quantitySchema,
  ratePerQuantitySchema,
  rateSchema,
  serviceCategoryIdSchema,
  startYearSchema,
  taxPayerNameSchema,
  taxPercentageSchema,
  temproraryAddressSchema,
  urlSchema,
  rashidSchema,
  paymentSchema,
  kittaNoSchema,
  bhawanSanketNo,
  jaggaSanketNoSchema,
  bhawanSanketNoSchema,
  wardNoSchema,
  penaltyPercentSchema,
  discountPercentSchema,
  totalBuldingSchema,
  totalRoomOnRentSchema,
  bloodGroupSchema,
  yearlyRentAmountSchema,
  workAreaNameSchema,
  workTypeNameSchema,
  upaChetraSchema,
  kharchaSirsharkSchema,
  detailSchema,
  contigencySchema,
  marmatSambharSchema,
  samajikSurekchyaSchema,
  bahalKarSchema,
  agrimShulkaSchema,
  parishramikSchema,
  royalitySchema,
  dhuwaniSchema,
  documentTypeNameSchema,
  yojanaNameSchema,
  selectDepartmentSchema,
  wardSchema,
  rajPatrnakitSheniSchema,
  shrediSchema,
  sewaSchema,
  groupIdSchema,
  passwordSchema,
  confirmPasswordSchema,
  addressLine1Schema,
  addressLine2Schema,
  citySchema,
  stateSchema,
  zipCodeSchema,
  schoolNameSchema,
  degreeSchema,
  fieldOfStudySchema,
  punishmentSchema,
  attOfficeSchema,
  fullName_EngSchema,
  fullName_NepSchema,
  genderSchema,
  citznshipNoSchema,
  mobileSchema,
  ageSchemaValidate,
  relationAsSchema,
  gurdianFullName_EngSchema,
  gurdianFullName_NepSchema,
  gurdianAddress_NepSchema,
  gurdianContactNoSchema,
  gurdianAddress_EngSchema,
  employeeSchema,
  postSchema,
  sifarishSchema,
  swikritiSchema,
  chooseVisitTypeSchema,
  districtIdSchema,
  countrySchema,
  attOfficeTypeSchema,
  palikaIdSchemaSchema,
  trainingOfficeNameSchema,
  chooseTrainingTypeSchema,
  employeeIdSchema,
  postIdSchema,
  shrediIdSchema,
  countryIdSchema,
  talimIdSchema,
  visitSubjectSchema,
  durationSchema,
  aimtoVisitSchema,
  awardTypeSchema,
  appointmentIdSchema,
  empCodeSchema,
  padPurtiTypeIdSchema,
  citizenJariJillaIdSchema,
  nationalityIdSchema,
  religionIdSchema,
  castIdSchema,
  mobileNoSchema,
  departmentIdSchema,
  attOfficeIdSchema,
  sewaIdSchema,
  subGroupIdSchema,
  stateIdSchema,
  palikaIdSchema,
  wardIdSchema,
  awardProvidedBySchema,
  genderIdSchema,
  subDepartmentIdSchema,
  counterIdSchema,
  roleIdSchema,
  deactiveSewaparimanIdSchema,
  serviceCategorySchema,
  natureOfCategoryIdSchema,
  parentIdSchema,
  taxModuleSchema,
  taxCategorySchema,
  jatiSchema,
  nagariktaPraPaNoSchema,
  houseNoSchema,
  nationalitySchema,
  fiscalYearIdSchema,
  planningBhuktaniIdSchema,
  caseTypeSchema,
  ageSchema,
  citizenIssueDistrictSchema,
  pStateIdScghema,
  pDistrictIdSchema,
  pPalikaIdSchema,
  ppWardIdSchema,
  pStateIdSchema,
  previousFiscalYearIdSchema,
  attOfficeidSchema,
  aayaShrotDartaNoSchema,
} from "../schema/common";
import * as yup from "yup";

export const fiscalValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    startYear: startYearSchema,
    endYear: endYearSchema,
    previousFiscalYearId: previousFiscalYearIdSchema,
  })
);

export const awabihawitValidationResolver = yupResolver(
  yup.object({
    fullName_Nepali: nameSchema,
    karRasidNo: rashidSchema,
    nagriktaNo: citizenNoSchema,
    nagriktaJariJillaId: citizenJariJillaIdSchema,
    stateId: stateIdSchema,
    palikaId: palikaIdSchema,
    wardId: wardIdSchema,
    districtId: districtIdSchema,
  })
);

export const aadivasiValidationResolver = yupResolver(
  yup.object({
    naamThar: nameSchema,
    genderId: genderIdSchema,
    permaPradeshId: stateIdSchema,
    permaJillaId: districtIdSchema,
    permaPalikaId: palikaIdSchema,
    permaWardNo: wardIdSchema,
    nagariktaPraPaNo: nagariktaPraPaNoSchema,
    nagariktaIssueDistrictId: citizenJariJillaIdSchema,
    nagariktaIssueDistrictId: citizenJariJillaIdSchema,
    grandfatherNaamThar: grandFatherNameSchema,
    fatherNaamThar: fatherNameSchema,
    fatherNaamThar: fatherNameSchema,
    jaati: jatiSchema,
  })
);

export const caseDetailValidationResolver = yupResolver(yup.object({}));

export const aayaShrotValidationResolver = yupResolver(
  yup.object({
    nivedakNaamThar: nameSchema,
    stateId: stateIdSchema,
    palikaId: palikaIdSchema,
    districtId: districtIdSchema,
    wardNo: wardIdSchema,
    aayaShrotDartaNo: aayaShrotDartaNoSchema,
  })
);

export const subGroupValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    groupId: groupIdSchema,
  })
);

export const previousOfficeValidationResolver = yupResolver(
  yup.object({
    employeeId: employeeSchema,
    postId: postSchema,
  })
);

export const abroadVisitValidateResolver = yupResolver(
  yup.object({
    employeeId: employeeSchema,
    postId: postSchema,
    shrediId: shrediSchema,
    sifarisByEmployeeId: sifarishSchema,
    approvedByEmployeeId: swikritiSchema,
    chooseVisitType: chooseVisitTypeSchema,
    visitSubject: visitSubjectSchema,
    duration: durationSchema,
    aimtoVisit: aimtoVisitSchema,
  })
);

export const awardDetailValidateResolver = yupResolver(
  yup.object({
    employeeId: employeeSchema,
    postId: postSchema,
    shrediId: shrediIdSchema,
    awardTypeId: awardTypeSchema,
    awardProvidedBy: awardProvidedBySchema,
  })
);

export const officeValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    address: addressSchema,
    phoneNo: phoneNoSchema,
    // faxNo: faxNoSchema,
    email: emailSchema,
    url: urlSchema,
  })
);
export const subDepartmentValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    departmentId: selectDepartmentSchema,
  })
);

export const trainingRecordValidateResolver = yupResolver(
  yup.object({
    trainingOfficeName: trainingOfficeNameSchema,
    chooseTrainingType: chooseTrainingTypeSchema,
    employeeId: employeeIdSchema,
    postId: postIdSchema,
    shrediId: shrediIdSchema,
    countryId: countryIdSchema,
    districtId: districtIdSchema,
    talimTypeId: talimIdSchema,
  })
);

export const wardValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    palikaId: palikaIdSchemaSchema,
  })
);
export const counterValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    wardId: wardSchema,
  })
);
export const rajPatrankitSheniValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);
export const kajTypeValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    attOfficeId: attOfficeidSchema,
  })
);

export const bhuktaniTypeForSamjhautaValidateResolver = yupResolver(
  yup.object({
    planningBhuktaniId: planningBhuktaniIdSchema,
    fiscalYearId: fiscalYearIdSchema,
  })
);

export const attOfficeValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    attOfficeTypeId: attOfficeTypeSchema,
  })
);
export const leaveTypeValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    attOfficeId: attOfficeSchema,
    sewaId: sewaSchema,
  })
);

export const publicHolidayValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    attOfficeId: attOfficeSchema,
  })
);
export const shrediValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    rajPatrankitSheniId: rajPatrnakitSheniSchema,
  })
);
export const postValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    shrediId: shrediSchema,
  })
);
export const sewaValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);
export const groupValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    sewaId: sewaSchema,
  })
);
export const castValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);

export const personDetailValidateResolver = yupResolver(
  yup.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    age: ageSchema,
    genderId: genderIdSchema,
    mobileNo: mobileNoSchema,
    citizenNo: citizenNoSchema,
    citizenIssueDistrict: citizenIssueDistrictSchema,
    pStateId: pStateIdSchema,
    pDistrictId: pDistrictIdSchema,
    pPalikaId: pPalikaIdSchema,
    pWardId: ppWardIdSchema,
  })
);

export const mamilaTypeVAlidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    caseTypeId: caseTypeSchema,
  })
);

export const userRegisterValidateResolver = yupResolver(
  yup.object({
    employeeId: employeeSchema,
    email: emailSchema,
    password: passwordSchema,
    wardId: wardIdSchema,
    departmentId: departmentIdSchema,
    subDepartmentId: subDepartmentIdSchema,
    counterId: counterIdSchema,
    role: roleIdSchema,
  })
);

export const subPunishmentValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    punishmentId: punishmentSchema,
  })
);
export const buildingTypeValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);

export const taxSubCategoryValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    taxCategoryId: taxCategorySchema,
  })
);

export const taxCategoryValidateResolver = yupResolver(
  yup.object({
    name: nameSchema,
    taxModuleId: taxModuleSchema,
  })
);

export const invoiceCancelReasonValidationResolver = yupResolver(
  yup.object({
    invoiceModule: invoiceModuleSchema,
    name: nameSchema,
  })
);
export const serviceCategoryValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    natureOfCategoryId: natureOfCategoryIdSchema,
    parentId: parentIdSchema,
  })
);

export const serviceValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    serviceCategoryId: serviceCategorySchema,
  })
);
export const taxPayerDetailValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);

export const serviceBillValidationResolver = yupResolver(
  yup.object({
    taxPayerName: taxPayerNameSchema,
    address: addressSchema,
    paymentTypeId: paymentSchema,
  })
);

export const permanentAddressValidation = yup.object({
  stateId: yup.string().required("Select at leaast one"),
  distId: yup.string().required("Select at leaast one"),
  palikaId: yup.string().required("Select at leaast one"),
  wardId: yup.string().required("Select at leaast one"),
  houseNo: yup.string().required("This field is required"),
  address: yup.string().required("This field is required"),
});

export const employeeValidationResolver = yupResolver(
  yup.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    citizenNo: citizenNoSchema,
    appointmentId: appointmentIdSchema,
    empCode: empCodeSchema,
    padPurtiTypeId: padPurtiTypeIdSchema,
    genderId: genderIdSchema,
    citizenJariJillaId: citizenJariJillaIdSchema,
    nationalityId: nationalitySchema,
    religionId: religionIdSchema,
    castId: castIdSchema,
    mobileNo: mobileNoSchema,
    departmentId: departmentIdSchema,
    subDepartmentId: subDepartmentIdSchema,
    postId: postIdSchema,
    attOfficeId: attOfficeIdSchema,
    sewaId: sewaIdSchema,
    groupId: groupIdSchema,
    subGroupId: subGroupIdSchema,
    email: emailSchema,
    permanentAddesss: permanentAddressValidation,
  })
);

export const deactiveEmployeeValidateResolver = yupResolver(
  yup.object({
    employeeId: employeeSchema,
    deactiveSewaparimanId: deactiveSewaparimanIdSchema,
  })
);
export const serviceRateValidationResolver = yupResolver(
  yup.object({
    ratePerQuantity: ratePerQuantitySchema,
    taxPercentage: taxPercentageSchema,
    openningBalance: openningBalanceSchema,
  })
);

export const taxModuleValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);

export const taxRateVlidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    rate: rateSchema,
  })
);
export const searchServiceBillValidationResolver = yupResolver(
  yup.object({
    rashidNo: rashidSchema,
  })
);
export const landDetialValidationResolver = yupResolver(
  yup.object({
    kittaNo: kittaNoSchema,
  })
);
export const buildingDetialValidationResolver = yupResolver(
  yup.object({
    jaggaSanketNo: jaggaSanketNoSchema,
  })
);

export const vehicleDetailValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
  })
);

export const workAreaValidationResolver = yupResolver(
  yup.object({
    workAreaName: workAreaNameSchema,
  })
);

export const documentTypeNameValidationResolver = yupResolver(
  yup.object({
    documentTypeName: documentTypeNameSchema,
  })
);

export const karKattiValidationResolver = yupResolver(
  yup.object({
    contigency: contigencySchema,
    marmatSambhar: marmatSambharSchema,
    samajikSurekchya: samajikSurekchyaSchema,
    bahalKar: bahalKarSchema,
    agrimShulka: agrimShulkaSchema,
    parishramik: parishramikSchema,
    royality: royalitySchema,
    dhuwani: dhuwaniSchema,
  })
);

export const upaChetraDetailValidationResolver = yupResolver(
  yup.object({
    detail: detailSchema,
  })
);
export const upaChetraValidationResolver = yupResolver(
  yup.object({
    upaChettra: upaChetraSchema,
  })
);

export const yojanaValidationResolver = yupResolver(
  yup.object({
    yojanaName: yojanaNameSchema,
  })
);

export const workTypeValidationResolver = yupResolver(
  yup.object({
    workTypeName: workTypeNameSchema,
  })
);

export const fineSchemaValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    penaltyPercent: penaltyPercentSchema,
  })
);

export const discountSchemaValidationResolver = yupResolver(
  yup.object({
    name: nameSchema,
    discountPercent: discountPercentSchema,
  })
);

export const personalInformationValidation = yupResolver(
  yup.object({
    fullName_Eng: fullName_EngSchema,
    fullName_Nep: fullName_NepSchema,
    gender: genderSchema,
    mobileNo: mobileSchema,
    citznshipNo: citznshipNoSchema,
    age: ageSchemaValidate,
    education: educationSchema,
    occupation: occupationSchema,
    bloodGroup: bloodGroupSchema,
  })
);

export const addressValidation = yupResolver(
  yup.object({
    addressLine1: addressLine1Schema,
    addressLine2: addressLine2Schema,
    city: citySchema,
    state: stateSchema,
    zipCode: zipCodeSchema,
  })
);

export const sarakxanValidation = yupResolver(
  yup.object({
    guardianFullName_Eng: gurdianFullName_EngSchema,
    guardianFullName_Nep: gurdianFullName_NepSchema,
    guardianAddress_Nep: gurdianAddress_NepSchema,
    guardianAddress_Eng: gurdianAddress_EngSchema,
    guardianContactNo: gurdianContactNoSchema,
    relationAs: relationAsSchema,
  })
);
