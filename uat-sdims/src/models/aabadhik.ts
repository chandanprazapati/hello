export interface aabadhikSearch {
  attOfficeId: number;
  employeeId: number;
  startDate: Date;
  endDate: Date;
}

export interface aabadhikSearchWithLate {
  attOfficeId: number;
  employeeId: number;
  startDate: Date;
  endDate: Date;
  isLate : boolean;
}

export interface aabadhikReport {
  employeeName: number;
  postName: number;
  aabaDhikReports: aabaDhik_Reports[];
}

export interface aabaDhik_Reports {
  date: Date;
  nepaliDate: string;
  checkInTime: any;
  checkOutTime: string;
  totalWorkingHour: number;
  leaveType: string;
  kajType: string;
  remark: string;
}

export interface mashikReport{
  heading : mashikHeading[];
  mashikData :  mashikData[];
}
export interface mashikHeading{
  day : number;
  weekDays :  string;
}
export interface mashikData{
  employeeName :  string;
  postName :  string;
  dateWiseReport : dateWiseReport[];
}
export interface dateWiseReport{
  checkInTime :  string;
  checkOutTime :  string;
  bida :  string;
}

export interface overViewHajariReport {
  employeeName: string;
  postName: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  kajDays: number;
  leaveDays: number;
  dhilloAayekoDays: number;
  chittoGayakoDays: number;
  forgetMorningAttendanceDays: number;
  forgetEveningAttendanceDays: number;
}

export interface dhiloBibranReport {
  employeeName: string;
  postName: string;
  date: Date;
  inTime: number;
  outTime: number;
}

export interface absentEmployee{
  employeeName: string;
  postName: string;
  date: Date;
}
