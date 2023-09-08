import * as yup from "yup";
export const nameSchema = yup.string().required("This field is required");
export const taxCategorySchema = yup
  .string()
  .required("This field is required");
export const taxModuleSchema = yup.string().required("This field is required");
export const parentIdSchema = yup.string().required("This field is required");
export const serviceCategorySchema = yup
  .string()
  .required("This field is required");
export const workAreaNameSchema = yup
  .string()
  .required("This field is required");
export const upaChetraSchema = yup.string().required("This field is required");
export const kharchaSirsharkSchema = yup
  .string()
  .required("This field is required");
export const workTypeNameSchema = yup
  .string()
  .required("This field is required");
export const penaltyPercentSchema = yup
  .string()
  .required("This field is required");
export const discountPercentSchema = yup
  .string()
  .required("This field is required");
export const wardSchema = yup.string().required("This field is required");
export const rajPatrnakitSheniSchema = yup
  .string()
  .required("This field is required");
export const shrediSchema = yup.string().required("This field is required");
export const sewaSchema = yup.string().required("This field is required");
export const punishmentSchema = yup.string().required("This field is required");
export const attOfficeSchema = yup.string().required("This field is required");
export const attOfficeidSchema = yup
  .string()
  .required("This field is required");
export const employeeSchema = yup.string().required("This field is required");
export const deactiveSewaparimanIdSchema = yup
  .string()
  .required("This field is required");
export const postSchema = yup.string().required("This field is required");
export const sifarishSchema = yup.string().required("This field is required");
export const swikritiSchema = yup.string().required("This field is required");
export const chooseVisitTypeSchema = yup
  .string()
  .required("This field is required");
export const marmatSambharSchema = yup
  .string()
  .required("This field is required");
export const samajikSurekchyaSchema = yup
  .string()
  .required("This field is required");
export const bahalKarSchema = yup.string().required("This field is required");
export const agrimShulkaSchema = yup
  .string()
  .required("This field is required");
export const parishramikSchema = yup
  .string()
  .required("This field is required");
export const royalitySchema = yup.string().required("This field is required");
export const dhuwaniSchema = yup.string().required("This field is required");
export const documentTypeNameSchema = yup
  .string()
  .required("This field is required");
export const yojanaNameSchema = yup.string().required("This field is required");
export const selectDepartmentSchema = yup
  .string()
  .required("This field is required");
export const contigencySchema = yup.string().required("This field is required");
export const codeSchema = yup
  .string()
  .max(3)
  .required("code must be of 3 characters only");
export const detailSchema = yup.string().required("This field is required");
export const rashidSchema = yup.string().required("This field is required");
export const kittaNoSchema = yup.string().required("This field is required");
export const jaggaSanketNoSchema = yup
  .string()
  .required("This field is required");
export const buildingCodeNoSchema = yup
  .string()
  .required("This field is required");
export const totalBuldingSchema = yup
  .string()
  .required("This field is required");
export const totalRoomSchema = yup.string().required("This field is required");
export const totalRoomOnRentSchema = yup
  .string()
  .required("This field is required");
export const yearlyRentAmountSchema = yup
  .string()
  .required("This field is required");
export const bhawanSanketNoSchema = yup
  .string()
  .required("This field is required");
export const wardNoSchema = yup.string().required("This field is required");
export const startYearSchema = yup
  .string()
  .min(4)
  .max(4)
  .required("This field must of 4 digit");
export const endYearSchema = yup
  .string()
  .min(4)
  .max(4)
  .required("This field must be of 4 digit");
export const prevFiscalYearSchema = yup
  .string()
  .required("This Field is required");

export const rateSchema = yup.string().required("This field is required");
export const quantitySchema = yup.string().required("This field is required");
export const dateFromSchema = yup.string().required("This field is required");
export const dateFromEngSchema = yup
  .string()
  .required("This field is required");
export const previousFiscalYearIdSchema = yup
  .string()
  .required("This field is required");
export const dateToSchema = yup.string().required("This field is required");
export const dateToEngSchema = yup.string().required("This field is required");
export const addressSchema = yup.string().required("This field is required");
export const houseNoSchema = yup.string().required("This field is required");
export const phoneNoSchema = yup.string().required("This field is required");
export const urlSchema = yup.string().required("This field is required");
export const nameEngSchema = yup.string().required("This field is required");
export const paymentSchema = yup.string().required("This field is required");
export const invoiceModuleSchema = yup
  .string()
  .required("This field is required");
export const natureOfCategoryIdSchema = yup
  .string()
  .required("This field is required");
export const serviceCategoryIdSchema = yup
  .string()
  .required("This field is required");
export const taxPayerTypeIdSchema = yup
  .string()
  .required("This field is required");
export const licenNoSchema = yup.string().required("This field is required");
export const licenIssuFromSchema = yup
  .string()
  .required("This field is required");
export const gnderIdSchema = yup.string().required("This field is required");
export const dobSchema = yup.string().required("This field is required");
export const contactNoSchema = yup.string().required("This field is required");
export const fatherNameSchema = yup.string().required("This field is required");
export const jatiSchema = yup.string().required("This field is required");
export const grandFatherNameSchema = yup
  .string()
  .required("This field is required");
export const districtIdSchema = yup
  .string()
  .required("Select st lest one district");
export const palikaIdSchemaSchema = yup
  .string()
  .required("This field is required");
export const wardNoIdSchemaSchema = yup
  .string()
  .required("This field is required");
export const temproraryAddressSchema = yup
  .string()
  .required("This field is required");
export const mailingAddressSchema = yup
  .string()
  .required("This field is required");
export const citizenshipNoSchema = yup
  .string()
  .required("This field is required");
export const citizenshipIssueDistrictIdSchema = yup
  .string()
  .required("This field is required");
export const citizenshipMitiSchema = yup
  .string()
  .required("This field is required");
export const vatPanNoSchema = yup.string().required("This field is required");
export const photoPathSchema = yup.string().required("This field is required");
export const taxPayerNameSchema = yup
  .string()
  .required("This field is required");
export const empCodeSchema = yup.string().required("This field is required");
export const citizenNoSchema = yup.string().required("This field is required");
export const citizenIssueDistrictSchema = yup
  .string()
  .required("This field is required");
export const pStateIdSchema = yup.string().required("This field is required");
export const pDistrictIdSchema = yup
  .string()
  .required("This field is required");
export const pPalikaIdSchema = yup.string().required("This field is required");
export const ppWardIdSchema = yup.string().required("This field is required");
export const citizensip = yup.string().required("This field is required");
export const ratePerQuantitySchema = yup
  .string()
  .required("This field is required");
export const taxPercentageSchema = yup
  .string()
  .required("This field is required");
export const openningBalanceSchema = yup
  .string()
  .required("This field is required");
export const aliasSchema = yup.string().required("This field is required");
export const usernameSchema = yup
  .string()
  .required("Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be less than 20 characters");
export const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(
    8,
    "Password must be at least 6 characters with uppercase,lowercase and special character"
  )
  .max(20, "Password must be less than 20 characters");
export const confirmPasswordSchema = yup
  .string()
  .required("Confirm Password is required")
  .oneOf([yup.ref("password"), null], "Passwords must match");
export const emailSchema = yup
  .string()
  .required("Email is required")
  .email("Email is invalid");
export const ageSchema = yup
  .string()
  .required("Age is required")
  .min(1, "Age must be at least 1 characters")
  .max(3, "Age must be less than 3 characters");
export const firstNameSchema = yup
  .string()
  .required("First Name is required")
  .min(3, "First Name must be at least 3 characters")
  .max(20, "First Name must be less than 20 characters");
export const lastNameSchema = yup
  .string()
  .required("Last Name is required")
  .min(3, "Last Name must be at least 3 characters")
  .max(20, "Last Name must be less than 20 characters");
export const addressLine1Schema = yup
  .string()
  .required("Address Line 1 is required")
  .min(3, "Address Line 1 must be at least 3 characters")
  .max(20, "Address Line 1 must be less than 20 characters");
export const addressLine2Schema = yup
  .string()
  .required("Address Line 2 is required")
  .min(3, "Address Line 2 must be at least 3 characters")
  .max(20, "Address Line 2 must be less than 20 characters");
export const citySchema = yup
  .string()
  .required("City is required")
  .min(3, "City must be at least 3 characters")
  .max(20, "City must be less than 20 characters");
export const stateSchema = yup
  .string()
  .required("State is required")
  .min(1, "State must be at least 3 characters")
  .max(20, "State must be less than 20 characters");
export const zipCodeSchema = yup
  .string()
  .required("Zip Code is required")
  .min(3, "Zip Code must be at least 3 characters")
  .max(20, "Zip Code must be less than 20 characters");
export const schoolNameSchema = yup
  .string()
  .required("School Name is required")
  .min(3, "School Name must be at least 3 characters")
  .max(100, "School Name must be less than 100 characters");
export const fieldOfStudySchema = yup
  .string()
  .required("Field of Study is required")
  .min(3, "Field of Study must be at least 3 characters")
  .max(20, "Field of Study must be less than 20 characters");
export const gradeSchema = yup
  .string()
  .required("Grade is required")
  .min(3, "Grade must be at least 3 characters")
  .max(20, "Grade must be less than 20 characters");
export const degreeSchema = yup
  .string()
  .required("Degree is required")
  .oneOf(["High School", "Bachelors", "Masters", "PhD"], "Degree is invalid");
export const fullName_EngSchema = yup
  .string()
  .required("English Full Name is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const fullName_NepSchema = yup
  .string()
  .required("Nepali Full Name is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const gurdianAddress_EngSchema = yup
  .string()
  .required("Address Field is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const gurdianAddress_NepSchema = yup
  .string()
  .required("Address Fiels is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const gurdianFullName_EngSchema = yup
  .string()
  .required("Nepali Full Name is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const gurdianFullName_NepSchema = yup
  .string()
  .required("Nepali Full Name is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const gurdianContactNoSchema = yup
  .string()
  .required("Nepali Full Name is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(20, "Full Name must be less than 20 characters");
export const ageSchemaValidate = yup
  .string()
  .required("Age is required")
  .min(1, "Age must be at least 1 ");
export const citznshipNoSchema = yup
  .string()
  .required("Citizenship No is required");
export const mobileSchema = yup
  .string()
  .required("Mobile No is required")
  .min(10, "Mobile No must be at least 10 ")
  .max(10, "Mobile No must be less than 10 ");
export const genderSchema = yup.string().required("Select at leaast one");
export const educationSchema = yup.string().required("Select at leaast one");
export const occupationSchema = yup.string().required("Select at leaast one");
export const relationAsSchema = yup.string().required("Select at leaast one");
export const bloodGroupSchema = yup.string().required("Select at leaast one");
export const countrySchema = yup.string().required("Select at leaast one");
export const attOfficeTypeSchema = yup
  .string()
  .required("Select at leaast one");
export const planningBhuktaniIdSchema = yup
  .string()
  .required("Select at leaast one");
export const fiscalYearIdSchema = yup.string().required("Select at leaast one");
export const trainingOfficeNameSchema = yup
  .string()
  .required("This field is required");
export const chooseTrainingTypeSchema = yup
  .string()
  .required("This Field Is Required");
export const employeeIdSchema = yup.string().required("Select at leaast one");
export const shrediIdSchema = yup.string().required("Select at leaast one");
export const postIdSchema = yup.string().required("Select at leaast one");
export const countryIdSchema = yup.string().required("Select at leaast one");
export const talimIdSchema = yup.string().required("Select at leaast one");
export const visitSubjectSchema = yup
  .string()
  .required("This field is required");
export const durationSchema = yup.string().required("This field is required");
export const aimtoVisitSchema = yup.string().required("This field is required");
export const awardTypeSchema = yup.string().required("Select at leaast one");
export const awardProvidedBySchema = yup
  .string()
  .required("This field is required");
export const appointmentIdSchema = yup
  .string()
  .required("Select at leaast one");
export const padPurtiTypeIdSchema = yup
  .string()
  .required("Select at leaast one");
export const genderIdSchema = yup.string().required("Select at leaast one");
export const citizenJariJillaIdSchema = yup
  .string()
  .required("Select at leaast one");
export const nationalityIdSchema = yup
  .string()
  .required("Select at leaast one");
export const religionIdSchema = yup.string().required("Select at leaast one");
export const castIdSchema = yup.string().required("Select at leaast one");
export const mobileNoSchema = yup.string().required("THis field is required");
export const departmentIdSchema = yup.string().required("Select at leaast one");
export const subDepartmentIdSchema = yup
  .string()
  .required("Select at leaast one");
export const attOfficeIdSchema = yup.string().required("Select at leaast one");
export const sewaIdSchema = yup.string().required("Select at leaast one");
export const groupIdSchema = yup.string().required("Select at leaast one");
export const subGroupIdSchema = yup.string().required("Select at leaast one");
export const stateIdSchema = yup.string().required("Select at leaast one");
export const palikaIdSchema = yup.string().required("Select at leaast one");
export const wardIdSchema = yup.string().required("Select at leaast one");
export const counterIdSchema = yup.string().required("Select at leaast one");
export const roleIdSchema = yup.string().required("Select at leaast one");
export const nagariktaPraPaNoSchema = yup
  .string()
  .required("This Field Is required");
export const nationalitySchema = yup
  .string()
  .required("This Field Is required");
export const caseTypeSchema = yup.string().required("This Field Is required");

export const aayaShrotDartaNoSchema = yup
  .string()
  .required("This Field Is Required");
