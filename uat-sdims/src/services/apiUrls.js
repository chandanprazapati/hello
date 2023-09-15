const apiUrls = {
  auth: {
    loginUser: {
      method: "POST",
      url: "/login",
    },
  },

  dashboard: {
    revenue: {
      indexDashboard: {
        method: "GET",
        url: "/IndexDashBoard",
      },

      piechartData: {
        method: "GET",
        url: "/GetPieChartData",
      },

      wadaChartData: {
        method: "GET",
        url: "/GetPieChartDataWard",
      },
    },
    sifarish: {
      indexDashboard: {
        method: "GET",
        url: "/IndexShifarish",
      },
    },
    planning: {
      indexDashboard: {
        method: "GET",
        url: "/IndexPlanning",
      },
      piechartData: {
        method: "GET",
        url: "/GetPlanningPieChartDataWard",
      },
      wadaChartData: {
        method: "GET",
        url: "/GetPlanningPieChartDataWard",
      },
    },
  },

  attendance: {
    report: {
      aabadhik: {
        method: "GET",
        url: "/AabaDhikReport",
      },
      mashik: {
        method: "GET",
        url: "/GetMashikReport",
      },
      overViewHajiri: {
        method: "GET",
        url: "/GetOverViewHajari",
      },
      arrivalEarlyDepartureLate: {
        method: "GET",
        url: "/GetLateArrivalEarlyDepactures",
      },
      absentEmployee: {
        method: "GET",
        url: "/GetAbsentEmployees",
      },
    },
  },

  common: {
    fiscal: {
      fiscal: {
        method: "GET",
        url: "/GetAllFiscalYear",
      },
      createFiscal: {
        method: "POST",
        url: "/CreateFiscalYear",
      },
      editFiscal: {
        method: "GET",
        url: "/GetFiscalYearById/",
      },
    },
    oldVdc: {
      oldVdc: {
        method: "GET",
        url: "/GetAllOldVdc",
      },
      createOldVdc: {
        method: "POST",
        url: "/CreateOldVdc",
      },
    },
    attOfficeType: {
      attOfficeType: {
        method: "GET",
        url: "/GetAllAttOfficeType",
      },
      createAttOfficeType: {
        method: "POST",
        url: "/CreateAttOfficeType",
      },
    },
    attOffice: {
      attOffice: {
        method: "GET",
        url: "/GetAllAttOffice",
      },
      createAttOffice: {
        method: "POST",
        url: "/CreateAttOffice",
      },
    },
    office: {
      office: {
        method: "GET",
        url: "/GetAllOffice",
      },
      createOffice: {
        method: "POST",
        url: "/CreateOffice",
      },
      editOffice: {
        method: "GET",
        url: "/GetOfficeById/",
      },
      state: {
        method: "GET",
        url: "/GetAllState",
      },
      getDistrictById: {
        method: "GET",
        url: "/GetDistrictById/",
      },
      getPalikaById: {
        method: "GET",
        url: "/GetPalikaById/",
      },
      GetAllNationality: {
        method: "GET",
        url: "/GetAllNationality/",
      },
    },
    department: {
      department: {
        method: "GET",
        url: "/GetAllDepartment",
      },
      createDepartment: {
        method: "POST",
        url: "/CreateDepartment",
      },
      editDepartment: {
        method: "GET",
        url: "/GetDepartmentById/",
      },
    },
    subDepartment: {
      subDepartment: {
        method: "GET",
        url: "/GetAllSubDepartment",
      },
      createSubDepartment: {
        method: "POST",
        url: "/CreateSubDepartment",
      },
      editSubDepartment: {
        method: "GET",
        url: "/GetSubDepartmentById/",
      },
    },
    ward: {
      ward: {
        method: "GET",
        url: "/GetAllWard",
      },
      createward: {
        method: "POST",
        url: "/CreateWard",
      },
      editward: {
        method: "GET",
        url: "/GetWardById/",
      },
    },
    counter: {
      counter: {
        method: "GET",
        url: "/GetAllCounter",
      },
      createCounter: {
        method: "POST",
        url: "/CreateCounter",
      },
      editCounter: {
        method: "GET",
        url: "/GetCounterById/",
      },
    },
    rajPatrankitSheni: {
      rajPatrankitSheni: {
        method: "GET",
        url: "/GetAllRajPatrankitSheni",
      },
      createRajPatrankitSheni: {
        method: "POST",
        url: "/CreateRajPatrankitSheni",
      },
      editRajPatrankitSheni: {
        method: "GET",
        url: "/GetRajPatrankitSheniById/",
      },
    },
    shredi: {
      shredi: {
        method: "GET",
        url: "/GetAllShredi",
      },
      createShredi: {
        method: "POST",
        url: "/CreateShredi",
      },
      editShredi: {
        method: "GET",
        url: "/GetShrediById/",
      },
    },
    post: {
      post: {
        method: "GET",
        url: "/GetAllPost",
      },
      createPost: {
        method: "POST",
        url: "/CreatePost",
      },
      editPost: {
        method: "GET",
        url: "/GetPostById/",
      },
    },
    sewa: {
      sewa: {
        method: "GET",
        url: "/GetAllSewa",
      },
      createSewa: {
        method: "POST",
        url: "/CreateSewa",
      },
      editSewa: {
        method: "GET",
        url: "/GetSewaById/",
      },
    },
    group: {
      group: {
        method: "GET",
        url: "/GetAllGroup",
      },
      createGroup: {
        method: "POST",
        url: "/CreateGroup",
      },
      editGroup: {
        method: "GET",
        url: "/GetGroupById/",
      },
    },
    subGroup: {
      subGroup: {
        method: "GET",
        url: "/GetAllSubGroup",
      },
      createSubGroup: {
        method: "POST",
        url: "/CreateSubGroup",
      },
      editSubGroup: {
        method: "GET",
        url: "/GetSubGroupById/",
      },
    },
    appointment: {
      appointment: {
        method: "GET",
        url: "/GetAllAppointment",
      },
      createAppointment: {
        method: "POST",
        url: "/CreateAppointment",
      },
      editAppointment: {
        method: "GET",
        url: "/GetAppointmentById/",
      },
    },
    sewaParimad: {
      sewaParimad: {
        method: "GET",
        url: "/GetAllSewaParimad",
      },
      createSewaParimad: {
        method: "POST",
        url: "/CreateSewaParimad",
      },
      editSewaParimad: {
        method: "GET",
        url: "/GetSewaParimadById/",
      },
    },
    padPurtiType: {
      padPurtiType: {
        method: "GET",
        url: "/GetAllPadPurtiType",
      },
      createPadPurtiType: {
        method: "POST",
        url: "/CreatePadPurtiType",
      },
      editPadPurtiType: {
        method: "GET",
        url: "/GetPadPurtiTypeById/",
      },
    },
    cast: {
      cast: {
        method: "GET",
        url: "/GetAllCast",
      },
      createCast: {
        method: "POST",
        url: "/CreateCast",
      },
      editCast: {
        method: "GET",
        url: "/GetCastById/",
      },
    },

    relation: {
      relation: {
        method: "GET",
        url: "/GetAllRelation",
      },
      createRelation: {
        method: "POST",
        url: "/CreateRelation",
      },
      editRelation: {
        method: "GET",
        url: "/GetRelationById/",
      },
    },
    education: {
      education: {
        method: "GET",
        url: "/GetAllEducation",
      },
      createEducation: {
        method: "POST",
        url: "/CreateEducation",
      },
      editEducation: {
        method: "GET",
        url: "/GetEducationById/",
      },
    },
    faculty: {
      faculty: {
        method: "GET",
        url: "/GetAllFaculty",
      },
      createFaculty: {
        method: "POST",
        url: "/CreateFaculty",
      },
      editFaculty: {
        method: "GET",
        url: "/GetFacultyById/",
      },
    },
    occupation: {
      occupation: {
        method: "GET",
        url: "/GetAllOccupation",
      },
      createOccupation: {
        method: "POST",
        url: "/CreateOccupation",
      },
      editOccupation: {
        method: "GET",
        url: "/GetOccupationById/",
      },
    },
    talimType: {
      talimType: {
        method: "GET",
        url: "/GetAllTalimType",
      },
      createTalimType: {
        method: "POST",
        url: "/CreateTalimType",
      },
      editTalimType: {
        method: "GET",
        url: "/GetTalimTypeById/",
      },
    },
    awardType: {
      awardType: {
        method: "GET",
        url: "/GetAllAwardType",
      },
      createAwardType: {
        method: "POST",
        url: "/CreateAwardType",
      },
      editAwardType: {
        method: "GET",
        url: "/GetAwardTypeById/",
      },
    },
    punishment: {
      punishment: {
        method: "GET",
        url: "/GetAllPunishment",
      },
      createPunishment: {
        method: "POST",
        url: "/CreatePunishment",
      },
      editPunishment: {
        method: "GET",
        url: "/GetPunishmentById/",
      },
    },
    subPunishment: {
      subPunishment: {
        method: "GET",
        url: "/GetAllSubPunishment",
      },
      createSubPunishment: {
        method: "POST",
        url: "/CreateSubPunishment",
      },
      editSubPunishment: {
        method: "GET",
        url: "/GetSubPunishmentById/",
      },
    },
    nationality: {
      nationality: {
        method: "GET",
        url: "/GetAllNationality",
      },
      createNationality: {
        method: "POST",
        url: "/CreateNationality",
      },
      editNationality: {
        method: "GET",
        url: "/GetNationalityById/",
      },
    },
    language: {
      language: {
        method: "GET",
        url: "/GetAllLanguage",
      },
      createLanguage: {
        method: "POST",
        url: "/CreateLanguage",
      },
      editLanguage: {
        method: "GET",
        url: "/GetLanguageById/",
      },
    },
    cast: {
      cast: {
        method: "GET",
        url: "/GetAllCast",
      },
      createCast: {
        method: "POST",
        url: "/CreateCast",
      },
      editCast: {
        method: "GET",
        url: "/GetCastById/",
      },
    },
    gender: {
      gender: {
        method: "GET",
        url: "/GetAllGender",
      },
    },
    religion: {
      religion: {
        method: "GET",
        url: "/GetAllReligion",
      },
    },
    country: {
      country: {
        method: "GET",
        url: "/GetCountry",
      },
    },
    bodartha: {
      bodartha: {
        method: "GET",
        url: "/GetAllBotharth",
      },
      createBodartha: {
        method: "POST",
        url: "/CreateBotharth",
      },
    },
  },

  legalCase: {
    indexCaseStage: {
      method: "GET",
      url: "/LegalCommon/IndexCaseStage",
    },

    createCase: {
      method: "POST",
      url: "/Case/CreateCase",
    },
    indexCase: {
      method: "GET",
      url: "/Case/IndexCase",
    },
    editCase: {
      method: "GET",
      url: "/Case/CaseById",
    },
    likhitZawaf: {
      method: "POST",
      url: "/Case/ReplyBack",
    },
    arkoTarik: {
      method: "POST",
      url: "/Case/ArkoTatikInsert",
    },
    mailMilap: {
      method: "POST",
      url: "/Case/MailMilap",
    },
    wadaMailMilap: {
      method: "POST",
      url: "/case/WardSelectedForMailMilap",
    },
    firtaAadesh: {
      method: "POST",
      url: "/Case/CaseFirtaAdesh",
    },
    completeCase: {
      method: "POST",
      url: "/Case/FinalCaseDecision",
    },
    indexCaseStatus: {
      method: "GET",
      url: "/Case/IndexCaseStatus",
    },

    indexCaseMelMilap: {
      method: "GET",
      url: "/Case/IndexCaseMailmilap",
    },
    indexCaseWardMelMilap: {
      method: "GET",
      url: "/Case/IndexCaseWardMailmilap",
    },
    indexCaseAapil: {
      method: "GET",
      url: "/Case/IndexCaseAppil",
    },
    punarebedan: {
      method: "POST",
      url: "/Case/Punarabedan",
    },
    getLegalAanusuchi: {
      method: "GET",
      url: "/LegalAnusuchi/Anusuchi",
    },

    legalDarta: {
      legalDarta: {
        method: "GET",
        url: "/LCDartaChalani/IndexLCDarta",
      },
      createLegalDarta: {
        method: "POST",
        url: "/LCDartaChalani/CreateLCDarta",
      },
    },

    legalChalani: {
      legalChalani: {
        method: "GET",
        url: "/LCDartaChalani/IndexLCChalani",
      },
      createLegalChalani: {
        method: "POST",
        url: "/LCDartaChalani/CreateLCChalani",
      },
    },

    indexCaseType: {
      indexCaseType: {
        method: "GET",
        url: "/LegalCommon/IndexCaseType",
      },
      createIndexCaseType: {
        method: "POST",
        url: "/LegalCommon/CreateCaseType",
      },
    },
    indexCaseSubType: {
      indexCaseSubType: {
        method: "GET",
        url: "/LegalCommon/IndexCaseSubType",
      },
      createIndexCaseSubType: {
        method: "POST",
        url: "/LegalCommon/CreateCaseSubType",
      },
    },
    post: {
      post: {
        method: "GET",
        url: "/LegalCommon/IndexPost",
      },
      createPost: {
        method: "POST",
        url: "/LegalCommon/CreatePost",
      },
    },
    yenKanun: {
      yenKanun: {
        method: "GET",
        url: "/LegalCommon/IndexYenKanun",
      },
      createYenKanun: {
        method: "POST",
        url: "/LegalCommon/CreateYenKanun",
      },
    },
    personDetail: {
      personDetail: {
        method: "GET",
        url: "/PersonDetail/GetAllPersonDetail",
      },
      createPersonDetail: {
        method: "POST",
        url: "/PersonDetail/CreatePersonDetail",
      },
    },
    sanyojakSadasya: {
      sanyojakSadasya: {
        method: "GET",
        url: "/LegalCommon/IndexSanyojakSadsaye",
      },
      createSanyojakSadasya: {
        method: "POST",
        url: "/LegalCommon/CreateSanyojakSadsaye",
      },
      sadasyaForMelMilap: {
        method: "GET",
        url: "/LegalCommon/SadasyaForMailMilap",
      },
      sanyojakForMelMilap: {
        method: "GET",
        url: "/LegalCommon/SanyojakForMailMilap",
      },
    },

    report: {
      getUjuriNibedanReport: {
        method: "GET",
        url: "/LegalReport/UjuriNibedanDiary",
      },
      getMisilAbhilekhReport: {
        method: "GET",
        url: "/LegalReport/MisilAbhilekh",
      },

      getRayKitabReport: {
        method: "GET",
        url: "/LegalReport/RayaKitab",
      },

      getTarikKitabReport: {
        method: "GET",
        url: "/LegalReport/TarikKitab",
      },

      getDartaListReport: {
        method: "GET",
        url: "/LegalReport/DartaList",
      },
      getChalaniListReport: {
        method: "GET",
        url: "/LegalReport/ChalaniList",
      },
      getGhatanakoBiwaranReport: {
        method: "GET",
        url: "/LegalReport/GhatankoBiberan",
      },
      getNibedanKoBiwaranReport: {
        method: "GET",
        url: "/LegalReport/NibedanBiberan",
      },
    },
  },

  planning: {
    report: {
      getPrativedanReport: {
        method: "GET",
        url: "/PlanningSamjhauta/GetUpavoktaSamitiGathanPratibedhan",
      },
      samjhautaGaripau: {
        method: "GET",
        url: "/PlanningSamjhauta/GetSamjhautaGariPauList",
      },
      getSamjhautaGaridineReport: {
        method: "GET",
        url: "/PlanningSamjhauta/GetYojanaSamjhautaGaridineySambandhama",
      },
      getFarFarakReport: {
        method: "GET",
        url: "/PlanningSamjhauta/SamjhautaFarFarak",
      },
      getSamjhautaReportSearched: {
        method: "GET",
        url: "/PlanningSamjhauta/GetSamjhautaReport",
      },
      getPlanningSelectedReport: {
        method: "GET",
        url: "/PlanningSamjhauta/PlanningSelectedReport",
      },
      getPlanningCompletedReport: {
        method: "GET",
        url: "/PlanningSamjhauta/CompletedPlanning",
      },
      getPlanningWadaRelatedReport: {
        method: "GET",
        url: "/PlanningSamjhauta/PlanningWadaRelatedReport",
      },
      getSamjhautaGaripauReport: {
        method: "GET",
        url: "/PlanningSamjhauta/GetSamjhautaGariPauReport",
      },
      getPragatiPratibedanAnusuchi1: {
        method: "GET",
        url: "/PlanningSamjhauta/GetPragatiPratibedanAnusuchi1",
      },
    },

    workArea: {
      workArea: {
        method: "GET",
        url: "/PLCommon/GetAllWorkArea",
      },
      createWorkArea: {
        method: "POST",
        url: "/PLCommon/CreateWorkArea",
      },
      editWorkArea: {
        method: "GET",
        url: "/PLCommon/GetWorkAreaById/",
      },
      deleteWorkArea: {
        method: "DELETE",
        url: "/PLCommon/DeleteWorkArea/",
      },
    },
    workType: {
      workType: {
        method: "GET",
        url: "/PLCommon/GetAllWorkType",
      },
      createWorkType: {
        method: "POST",
        url: "/PLCommon/CreateWorkType",
      },
      editWorkType: {
        method: "GET",
        url: "/PLCommon/GetWorkTypeById/",
      },
      deleteWorkType: {
        method: "DELETE",
        url: "/PLCommon/DeleteWorkType/",
      },
    },

    chetra: {
      chetra: {
        method: "GET",
        url: "/PLCommon/GetAllChettra",
      },
      createChetra: {
        method: "POST",
        url: "/PLCommon/CreateChettra",
      },
      deleteChetra: {
        method: "DELETE",
        url: "PLCommon/DeleteChettra/",
      },
    },

    upaChetra: {
      upaChetra: {
        method: "GET",
        url: "/PLCommon/GetAllUpaChetra",
      },
      createUpaChetra: {
        method: "POST",
        url: "/PLCommon/CreateUpaChetra",
      },
      editUpaChetra: {
        method: "GET",
        url: "/PLCommon/GetUpaChetraById/",
      },
      deleteUpaChetra: {
        method: "DELETE",
        url: "/PLCommon/DeleteUpaChetra/",
      },
    },

    upaChetraDetail: {
      upaChetraDetail: {
        method: "GET",
        url: "/PLCommon/GetAllUpaChetraDetail",
      },
      createUpaChetraDetail: {
        method: "POST",
        url: "/PLCommon/CreateUpaChetraDetail",
      },
      editUpaChetraDetail: {
        method: "GET",
        url: "/PLCommon/GetUpaChetraDetailById/",
      },
      deleteUpaChetraDetail: {
        method: "DELETE",
        url: "/PLCommon/DeleteUpaChetraDetail/",
      },
    },
    karKatti: {
      karKatti: {
        method: "GET",
        url: "/PLCommon/GetAllKarKatti",
      },
      createKarKatti: {
        method: "POST",
        url: "/PLCommon/CreateKarKatti",
      },
      editKarKatti: {
        method: "GET",
        url: "/PLCommon/GetKarKattiById/",
      },
      deleteKarKatti: {
        method: "DELETE",
        url: "/PLCommon/DeleteKarKatti/",
      },
    },
    documentType: {
      documentType: {
        method: "GET",
        url: "/PLCommon/GetAllDocumentType",
      },
      createDocumentType: {
        method: "POST",
        url: "/PLCommon/CreateDocumentType",
      },
      editDocumentType: {
        method: "GET",
        url: "/PLCommon/GetDocumentTypeById/",
      },
      deleteDocumentType: {
        method: "DELETE",
        url: "/PLCommon/DeleteDocumentType/",
      },
    },
    bhuktaniType: {
      bhuktaniType: {
        method: "GET",
        url: "/PLCommon/GetAllBhuktaniType",
      },
      createBhuktaniType: {
        method: "POST",
        url: "/PLCommon/CreateBhuktaniType",
      },
      editBhuktaniType: {
        method: "GET",
        url: "/PLCommon/GetBhuktaniTypeById/",
      },
      deleteBhuktaniType: {
        method: "DELETE",
        url: "/PLCommon/DeleteBhuktaniType/",
      },
    },
    thekkaShortType: {
      thekkaShortType: {
        method: "GET",
        url: "/PLCommon/GetAllThekkaShrotType",
      },
      createThekkaShortType: {
        method: "POST",
        url: "/PLCommon/CreateThekkaShrotType",
      },
      editThekkaShortType: {
        method: "GET",
        url: "/PLCommon/GetThekkaShortTypeById/",
      },
      deleteThekkaShortType: {
        method: "DELETE",
        url: "/PLCommon/DeleteThekkaShrotType/",
      },
    },
    thekkaKarKatti: {
      thekkaKarKatti: {
        method: "GET",
        url: "/PLCommon/GetAllThekkaKarkatti",
      },
      createThekkaKarKatti: {
        method: "POST",
        url: "/PLCommon/CreateThekkaKarkatti",
      },
      editThekkaKarKatti: {
        method: "GET",
        url: "/PLCommon/GetThekkaKarKattiById/",
      },
      deleteThekkaKarKatti: {
        method: "DELETE",
        url: "/PLCommon/DeleteThekkaKarkatti/",
      },
    },
    thekkaBhuktaniType: {
      thekkaBhuktaniType: {
        method: "GET",
        url: "/PLCommon/GetAllThekkaBhuktaniType",
      },
      createThekkaBhuktaniType: {
        method: "POST",
        url: "/PLCommon/CreateThekkaBhuktaniType",
      },
      editThekkaBhuktaniType: {
        method: "GET",
        url: "/PLCommon/GetThekkaBhuktaniTypeById/",
      },
      deleteThekkaBhuktaniType: {
        method: "DELETE",
        url: "/PLCommon/DeleteThekkaBhuktaniType/",
      },
    },
    sartaSetup: {
      sartaSetup: {
        method: "GET",
        url: "/PLCommon/GetAllSartaSetup",
      },
      createSartaSetup: {
        method: "POST",
        url: "/PLCommon/CreateSartaSetup",
      },
      editSartaSetup: {
        method: "GET",
        url: "/PLCommon/GetSartaSetupById/",
      },
      deleteSartaSetup: {
        method: "DELETE",
        url: "/PLCommon/DeleteSartaSetup/",
      },
    },
    budgetSource: {
      budgetSource: {
        method: "GET",
        url: "/Budget/GetAllBudgetSource",
      },
      createBudgetSource: {
        method: "POST",
        url: "/Budget/CreateBudgetSource",
      },
      deleteBudgetSource: {
        method: "DELETE",
        url: "/Budget/DeleteBudgetSource/",
      },
    },
    budgetType: {
      budgetType: {
        method: "GET",
        url: "/Budget/GetAllBudgetType",
      },
      createBudgetType: {
        method: "POST",
        url: "/Budget/CreateBudgetType",
      },
      deleteBudgetType: {
        method: "DELETE",
        url: "/Budget/DeleteBudgetType/",
      },
    },
    budgetSubType: {
      budgetSubType: {
        method: "GET",
        url: "/Budget/GetAllBudgetSubType",
      },
      createBudgetSubType: {
        method: "POST",
        url: "/Budget/CreateBudgetSubType",
      },
      deleteBudgetSubType: {
        method: "DELETE",
        url: "/Budget/DeleteBudgetSubType/",
      },
    },
    planningSamjhauta: {
      planningSamjhauta: {
        method: "GET",
        url: "/PlanningSamjhauta/GetAllPlanningSamjhauta",
      },
      createPlanningSamjhauta: {
        method: "POST",
        url: "/PlanningSamjhauta/CreatePlanningSamjhauta",
      },
      deletePlanningSamjhauta: {
        method: "DELETE",
        url: "/PlanningSamjhauta/DeletePlanningSamjhauta/",
      },
    },
    planningBhuktani: {
      planningBhuktani: {
        method: "GET",
        url: "/PlanningSamjhauta/CreatePlanningBhuktani",
      },
      createPlanningBhuktani: {
        method: "POST",
        url: "/PlanningSamjhauta/CreatePlanningBhuktani",
      },
      deletePlanningBhuktani: {
        method: "DELETE",
        url: "/PlanningSamjhauta/DeletePlanningBhuktani/",
      },
    },

    yojana: {
      yojana: {
        method: "GET",
        url: "/YojanaSetup/GetAllYojanaSetup",
      },
      createYojana: {
        method: "POST",
        url: "/YojanaSetup/CreateYojanaSetup",
      },
      deleteYojana: {
        method: "DELETE",
        url: "/YojanaSetup/DeleteYojanaSetup/",
      },
    },
    upavokataSamiti: {
      upavokataSamiti: {
        method: "GET",
        url: "/UpavoktaSamitiBibaran/GetAllUpavoktaSamitiBibaran",
      },
      createUpavokataSamiti: {
        method: "POST",
        url: "/UpavoktaSamitiBibaran/CreateUpavoktaSamitiBibaran",
      },
      deleteUpavokataSamiti: {
        method: "DELETE",
        url: "/UpavoktaSamitiBibaran/DeleteUpavoktaSamitiBibaran/",
      },
    },
    tolBikashSanstha: {
      tolBikashSanstha: {
        method: "GET",
        url: "/TolBikashSanstha/GetAllTolBikashSanstha",
      },
      createTolBikashSanstha: {
        method: "POST",
        url: "/TolBikashSanstha/CreateGetAllTolBikashSanstha",
      },
      deleteTolBikashSanstha: {
        method: "DELETE",
        url: "/TolBikashSanstha/DeleteTolBikashSanstha/",
      },
    },
    planningSamjhauta: {
      planningSamjhauta: {
        method: "GET",
        url: "/PlanningSamjhauta/GetAllPlanningSamjhauta",
      },
      planningSamjhautaById: {
        method: "GET",
        url: "/PlanningSamjhauta/GetPlanningSamjhautaById/",
      },
      createPlanningSamjhauta: {
        method: "POST",
        url: "/PlanningSamjhauta/CreatePlanningSamjhauta",
      },
      deletePlanningSamjhauta: {
        method: "DELETE",
        url: "/PlanningSamjhauta/DeletePlanningSamjhauta/",
      },
      bhuktaniListBySamjhautaId: {
        method: "GET",
        url: "/PlanningSamjhauta/GetAllPlanningBhuktaniListByPlanningSamjhautaId",
      },
      createPlanningBhuktani: {
        method: "POST",
        url: "/PlanningSamjhauta/CreatePlanningBhuktani",
      },
    },
  },
  revenue: {
    buildingType: {
      buildingType: {
        method: "GET",
        url: "/GetAllBuildingType",
      },
      createBuildingType: {
        method: "POST",
        url: "/CreateBuildingType",
      },
      editBuildingType: {
        method: "GET",
        url: "/GetBuildingType/",
      },
    },
    fineSchema: {
      fineSchema: {
        method: "GET",
        url: "/GetAllFineScheme",
      },
      createFineSchema: {
        method: "POST",
        url: "/CreateFineScheme",
      },
    },
    discountSchema: {
      discountSchema: {
        method: "GET",
        url: "/GetAllDiscountScheme",
      },
      createDiscountSchema: {
        method: "POST",
        url: "/CreateDiscountScheme",
      },
    },
    houseRentType: {
      houseRentType: {
        method: "GET",
        url: "/GetAllHouseRentType",
      },
      createHouseRentType: {
        method: "POST",
        url: "/CreateHouseRentType",
      },
      editHouseRentType: {
        method: "GET",
        url: "/GetHouseRentType/",
      },
    },
    businessType: {
      businessType: {
        method: "GET",
        url: "/GetAllBusinessType",
      },
      createBusinessType: {
        method: "POST",
        url: "/CreateBusinessType",
      },
      editBusinessType: {
        method: "GET",
        url: "/GetBusinessType/",
      },
    },
    businessCloseReason: {
      businessCloseReason: {
        method: "GET",
        url: "/GetAllBusinessCloseReason",
      },
      createBusinessCloseReason: {
        method: "POST",
        url: "/CreateBusinessCloseReason",
      },
      editBusinessCloseReason: {
        method: "GET",
        url: "/GetBusinessCloseReason/",
      },
    },
    businessStatus: {
      businessStatus: {
        method: "GET",
        url: "/GetAllBusinessStatus",
      },
      createBusinessStatus: {
        method: "POST",
        url: "/CreateBusinessStatus",
      },
      editBusinessStatus: {
        method: "GET",
        url: "/GetBusinessStatus/",
      },
    },
    landDetail: {
      createLandDetail: {
        method: "POST",
        url: "/LandDetail/CreateLandDetail",
      },
      createMultiplelandDetail: {
        method: "POST",
        url: "/LandDetail/CreateLandDetailMultiPle",
      },
      getTaxRateNames: {
        method: "GET",
        url: "/LandDetail/GetAllTaxRateNames",
      },
    },
    businessOwnershipType: {
      businessOwnershipType: {
        method: "GET",
        url: "/GetAllBusinessOwnershipType",
      },
      createBusinessOwnershipType: {
        method: "POST",
        url: "/CreateBusinessOwnershipType",
      },
      editBusinessOwnershipType: {
        method: "GET",
        url: "/GetBusinessOwnershipType/",
      },
    },
    businessStatus: {
      businessStatus: {
        method: "GET",
        url: "/GetAllBusinessStatus",
      },
      createBusinessStatus: {
        method: "POST",
        url: "/CreateBusinessStatus",
      },
      editBusinessStatus: {
        method: "GET",
        url: "/GetBusinessStatus/",
      },
    },
    businessOwnershipType: {
      businessOwnershipType: {
        method: "GET",
        url: "/GetAllBusinessOwnershiptype",
      },
      createBusinessOwnershiptype: {
        method: "POST",
        url: "/CreateBusinessOwnershiptype",
      },
      editBusinessOwnershiptype: {
        method: "GET",
        url: "/GetBusinessOwnershiptype/",
      },
    },
    invoiceCancelReason: {
      invoiceCancelReason: {
        method: "GET",
        url: "/GetAllInvoiceCancelReason",
      },
      createInvoiceCancelReason: {
        method: "POST",
        url: "/CreateInvoiceCancelReason",
      },
      editInvoiceCancelReason: {
        method: "GET",
        url: "/GetInvoiceCancelReason/",
      },
    },
    taxPayerType: {
      taxPayerType: {
        method: "GET",
        url: "/GetAllTaxPayerType",
      },
      createTaxPayerType: {
        method: "POST",
        url: "/CreateTaxPayerType",
      },
      editTaxPayerType: {
        method: "GET",
        url: "/GetTaxPayerType/",
      },
    },
    vehicleType: {
      vehicleType: {
        method: "GET",
        url: "/GetAllVehicleType",
      },
      createVehicleType: {
        method: "POST",
        url: "/CreateVehicleType",
      },
      editVehicleType: {
        method: "GET",
        url: "/GetVehicleType/",
      },
    },
    takeoverType: {
      takeoverType: {
        method: "GET",
        url: "/GetAllTakeoverType",
      },
      createTakeoverType: {
        method: "POST",
        url: "/CreateTakeoverType",
      },
      editTakeoverType: {
        method: "GET",
        url: "/GetTakeoverType/",
      },
    },
    vehicleStatus: {
      vehicleStatus: {
        method: "GET",
        url: "/GetAllVehicleStatus",
      },
      createVehicleStatus: {
        method: "POST",
        url: "/CreateVehicleStatus",
      },
      editVehicleStatus: {
        method: "GET",
        url: "/GetVehicleStatus/",
      },
    },
    vehicleCloseReason: {
      vehicleCloseReason: {
        method: "GET",
        url: "/GetAllVehicleCloseReason",
      },
      createVehicleCloseReason: {
        method: "POST",
        url: "/CreateVehicleCloseReason",
      },
      editVehicleCloseReason: {
        method: "GET",
        url: "/GetVehicleCloseReason/",
      },
    },
    fuelType: {
      fuelType: {
        method: "GET",
        url: "/GetAllFuelType",
      },
      createFuelType: {
        method: "POST",
        url: "/CreateFuelType",
      },
      editFuelType: {
        method: "GET",
        url: "/GetFuelType/",
      },
    },
    serviceCategory: {
      serviceCategory: {
        method: "GET",
        url: "/GetAllServiceCategory",
      },
      createServiceCategory: {
        method: "POST",
        url: "/CreateServiceCategory",
      },
      editServiceCategory: {
        method: "GET",
        url: "/GetServiceCategory/",
      },
    },
    service: {
      service: {
        method: "GET",
        url: "/GetAllService",
      },
      createService: {
        method: "POST",
        url: "/CreateService",
      },
      editService: {
        method: "GET",
        url: "/GetService/",
      },
    },
    taxModule: {
      taxModule: {
        method: "GET",
        url: "/TaxModule",
      },
      createTaxModule: {
        method: "POST",
        url: "/CreateTaxModule",
      },
      editTaxModule: {
        method: "GET",
        url: "/TaxModuleById/",
      },
    },
    taxCategory: {
      taxCategory: {
        method: "GET",
        url: "/TaxCategory",
      },
      createTaxCategory: {
        method: "POST",
        url: "/CreateTaxCategory",
      },
      editTaxCategory: {
        method: "GET",
        url: "/TaxCategoryById/",
      },
    },
    taxSubCategory: {
      taxSubCategory: {
        method: "GET",
        url: "/TaxSubCategory",
      },
      createTaxSubCategory: {
        method: "POST",
        url: "/CreateTaxSubCategory",
      },
      editTaxCategory: {
        method: "GET",
        url: "/TaxSubCategoryById/",
      },
    },
    indexTaxRate: {
      indexTaxRate: {
        method: "GET",
        url: "/IndexTaxRate",
      },
      createIndexTaxRate: {
        method: "POST",
        url: "/CreateAllTaxRate",
      },
      editIndexTaxRate: {
        method: "GET",
        url: "/EditAllTaxRate",
      },
    },
    natureOfCategory: {
      natureOfCategory: {
        method: "GET",
        url: "/GetAllNatureOfCategory",
      },
    },
  },
  controller: {
    taxPayerDetail: {
      taxPayerDetail: {
        method: "GET",
        url: "/TaxPayerDetail/GetAllTaxPayerDetail",
      },
      createTaxPayerDetail: {
        method: "POST",
        url: "/TaxPayerDetail/CreateTaxPayerDetail",
      },
      editTaxPayerDetail: {
        method: "GET",
        url: "/TaxPayerDetail/GetTaxPayerDetail/",
      },
    },
    generateReceipt: {
      generateReceipt: {
        method: "GET",
        url: "/ServiceBill/GetPrintDetails",
      },
    },
    serviceBill: {
      serviceBill: {
        method: "GET",
        url: "/ServiceBill/GetAllServiceBill",
      },
      createServiceBill: {
        method: "POST",
        url: "/ServiceBill/CreateServiceBill",
      },
      searchServiceBill: {
        method: "GET",
        url: "/ServiceBill/GetAllServiceBill",
      },
    },
    serviceRate: {
      serviceRate: {
        method: "GET",
        url: "/ServiceRate",
      },
      createServiceRate: {
        method: "POST",
        url: "/CreateServiceRate",
      },
      editServiceRate: {
        method: "GET",
        url: "/GetServiceRateById/",
      },
      searchAccToFiscal: {
        method: "GET",
        url: "/GetAllServiceRateAccFiscal",
      },
      insertServiceRate: {
        method: "POST",
        url: "/InsertServiceRate",
      },
      getServiceList: {
        method: "GET",
        url: "/GetAllServiceRateAccFiscal",
      },
    },
    transcationDetail: {
      transcationDetail: {
        method: "GET",
        url: "/GetTaxDeductionData",
      },
      serviceTransaction: {
        method: "POST",
        url: "/ServiceTransection",
      },
    },
    buildingDetail: {
      createBuildingDetail: {
        method: "POST",
        url: "/BuildingDetail/CreateBuildingDetail",
      },
      buildingDetail: {
        method: "GET",
        url: "/BuildingDetail/GetAllBuildingDetail",
      },
    },
    houseRentDetail: {
      createHouseRentDetail: {
        method: "POST",
        url: "/HouseRent/CreateHouseRent",
      },
      houseRentDetail: {
        method: "GET",
        url: "/HouseRent/GetAllHouseRent",
      },
    },
    vehicleDetail: {
      createVehicleDetail: {
        method: "POST",
        url: "/VehicleDetail/CreateVehicle",
      },
      vehicleDetail: {
        method: "GET",
        url: "/VehicleDetail/GetAllVehicle",
      },
    },
  },
  employee: {
    employee: {
      employee: {
        method: "GET",
        url: "/GetAllEmployee",
      },
      createEmployee: {
        method: "POST",
        url: "/CreateEmployee",
      },
      editEmployee: {
        method: "GET",
        url: "/GetEmployeeById/",
      },
    },
    familyDetail: {
      familyDetail: {
        method: "GET",
        url: "/GetAllEmployeeFamilyDetail/",
      },
      createFamilyDetail: {
        method: "POST",
        url: "/InsertUpdateEmployeeFamilyDetails",
      },
    },
    educationalDetail: {
      educationalDetail: {
        method: "GET",
        url: "/GetAllEmployeeEducationalDetails/",
      },
      createEducationalDetail: {
        method: "POST",
        url: "/InsertUpdateEmployeeEducationalDetails",
      },
    },
    jobDescription: {
      jobDescription: {
        method: "GET",
        url: "/GetAllEmployeeJobDescription/",
      },
      createJobDescription: {
        method: "POST",
        url: "/InsertUpdateEmployeeJobDescription",
      },
    },
    otherDetail: {
      otherDetail: {
        method: "GET",
        url: "/GetAllEmployeeOtherDetail/",
      },
      createOtherDetail: {
        method: "POST",
        url: "/InsertUpdateEmployeeOtherDetails",
      },
    },
    user: {
      role: {
        method: "GET",
        url: "/GetAllRoles",
      },
      employeeForRegisterUser: {
        method: "GET",
        url: "/GetAllEmployeeForRegisterUser",
      },
      getAllUser: {
        method: "GET",
        url: "/GetAllUser",
      },
      registerUser: {
        method: "POST",
        url: "/RegisterUser",
      },
      activeDeactiveUser: {
        method: "GET",
        url: "/UserActiveAndDeActive/",
      },
    },
  },
  pis: {
    previousOffice: {
      previousOffice: {
        method: "GET",
        url: "/GetAllEmployeePreviousOfficeRecord",
      },
      createPreviousOffice: {
        method: "POST",
        url: "/CreateEmployeePreviousOfficeRecord",
      },
    },
    trainingRecord: {
      trainingRecord: {
        method: "GET",
        url: "/GetAllEmployeeTrainingRecord",
      },
      createTrainingRecord: {
        method: "POST",
        url: "/CreateEmployeeTrainingRecord",
      },
    },
    abroadVisit: {
      abroadVisit: {
        method: "GET",
        url: "/GetAllEmployeeAbroadVisitDetail",
      },
      createAbroadVisit: {
        method: "POST",
        url: "/CreateEmployeeAbroadVisitDetail",
      },
    },
    awardDetail: {
      awardDetail: {
        method: "GET",
        url: "/GetAllEmployeeAwardDetailRecord",
      },
      createAwardDetail: {
        method: "POST",
        url: "/CreateEmployeeAwardDetailRecord",
      },
    },
    deactiveEmployee: {
      deactiveEmployee: {
        method: "GET",
        url: "/GetAllDeactiveEmployee",
      },
      createDeactiveEmployee: {
        method: "POST",
        url: "/CreateDeactiveEmployee",
      },
    },
    employeePunishment: {
      employeePunishment: {
        method: "GET",
        url: "/GetAllEmployeePunishment",
      },
      createEmployeePunishment: {
        method: "POST",
        url: "/CreateEmployeePunishment",
      },
    },
    talimModule: {
      talimModule: {
        method: "GET",
        url: "/GetAllTalimModule",
      },
      createTalimModule: {
        method: "POST",
        url: "/CreateTalimModule",
      },
    },
    sewalog: {
      sewalog: {
        method: "GET",
        url: "/GetAllSewaLog",
      },
      createSewalog: {
        method: "POST",
        url: "/InsertUpdateSewaLog",
      },
    },
    kajType: {
      kajType: {
        method: "GET",
        url: "/GetAllKajType",
      },
      createKajType: {
        method: "POST",
        url: "/CreateKajType",
      },
    },
    publicHoliday: {
      publicHoliday: {
        method: "GET",
        url: "/GetAllPublicHoliday",
      },
      createPublicHoliday: {
        method: "POST",
        url: "/CreatePublicHoliday",
      },
    },
    leaveType: {
      leaveType: {
        method: "GET",
        url: "/GetAllLeaveType",
      },
      createLeaveType: {
        method: "POST",
        url: "/CreateLeaveType",
      },
    },
    officeTime: {
      officeTime: {
        method: "GET",
        url: "/GetAllOfficeTime",
      },
      createOfficeTime: {
        method: "POST",
        url: "/CreateOfficeTime",
      },
    },
  },

  sifarish: {
    gharBatoPramanit: {
      insertGharBatoPar: {
        method: "POST",
        url: "/GharBatoPramanit/InsertGharBatoPramanit",
      },
      getGharBatoPar: {
        method: "GET",
        url: "/GharBatoPramanit/GetAllGharBatoPramanit",
      },
      gharBatoUpdate: {
        method: "GET",
        url: "/GharBatoPramanit/GetGharBatoPramanitForUpdate",
      },
      insertDocsForGHarBato: {
        method: "POST",
        url: "/GharBatoPramanit/InsertGharBatoPramanitFiles",
      },
      getDocsForGHarBato: {
        method: "GET",
        url: "/GharBatoPramanit/GetGharBatoPramanitFileById",
      },
      printGHarBato: {
        method: "GET",
        url: "/GharBatoPramanit/Print",
      },
    },
    farakFarakJanmaMiti: {
      insertFarakMiti: {
        method: "POST",
        url: "/FarakFarakJanmaMiti/InsertFarakFarakJanmaMiti",
      },
      getFarakMiti: {
        method: "GET",
        url: "/FarakFarakJanmaMiti/GetAllFarakFarakJanmaMiti",
      },
      updateFarakMitiData: {
        method: "GET",
        url: "/FarakFarakJanmaMiti/GetFarakFarakJanmaMitiForUpdate",
      },
      uploadDocsFarakJanmMiti: {
        method: "POST",
        url: "/FarakFarakJanmaMiti/InsertFarakFarakJanmaMitiFiles",
      },
      getDocsFarakJanmMiti: {
        method: "GET",
        url: "/FarakFarakJanmaMiti/GetFarakFarakJanmaMitiFileById",
      },
      printFarakJanmaMiti: {
        method: "GET",
        url: "/FarakFarakJanmaMiti/Print",
      },
    },
    bidut: {
      insertBidut: {
        method: "POST",
        url: "/Bidut/InsertBidut",
      },
      getBidut: {
        method: "GET",
        url: "/Bidut/GetAllBidut",
      },
    },
    twoNameOnePerson: {
      insertTwoNamePerson: {
        method: "POST",
        url: "/DuiNaamEkByakti/InsertDuiNaamEkByakti",
      },
      getTwoNamePerson: {
        method: "GET",
        url: "/DuiNaamEkByakti/GetAllDuiNaamEkByakti",
      },
      updateTwoNameOnePerson: {
        method: "GET",
        url: "/DuiNaamEkByakti/GetDuiNaamEkByaktiForUpdate",
      },
      insertDocsTwoNameOnePerson: {
        method: "POST",
        url: "/DuiNaamEkByakti/InsertDuiNaamEkByaktiFiles",
      },
      getDocsTwoNameOnePerson: {
        method: "GET",
        url: "/DuiNaamEkByakti/GetDuiNaamEkByaktiFileById",
      },
      printTwoNameOnePerson: {
        method: "GET",
        url: "/DuiNaamEkByakti/Print",
      },
    },
    sadakKhanee: {
      insertSadakKhanne: {
        method: "POST",
        url: "/SadakKhanne/InsertSadakKhanne",
      },
      getSadakKhanne: {
        method: "GET",
        url: "/SadakKhanne/GetAllSadakKhanne",
      },
      updateSadakKhanne: {
        method: "GET",
        url: "/SadakKhanne/GetSadakKhanneForUpdate",
      },
      sadakKhaneeFileUpload: {
        method: "POST",
        url: "/SadakKhanne/InsertSadakKhanneFiles",
      },
      getsadakKhaneeFileUpload: {
        method: "GET",
        url: "/SadakKhanne/GetSadakKhanneFileById",
      },
      printSadakKhanne: {
        method: "GET",
        url: "/SadakKhanne/Print",
      },
    },
    sthaiAsthaiBasobas: {
      insertSthaiAsthaiBasobas: {
        method: "POST",
        url: "/Basobas/InsertBasobas",
      },
      getSthaiAsthaiBasobas: {
        method: "GET",
        url: "/Basobas/GetAllBasobas",
      },
      sthaiAsthaiBasobasPrint: {
        method: "GET",
        url: "/Basobas/Print",
      },
      insertSthaiAsthaiBasobasFile: {
        method: "POST",
        url: "/Basobas/InsertBasobasFiles",
      },
      getSthaiAsthaiBasobasFile: {
        method: "GET",
        url: "/Basobas/GetBasobasFileById",
      },
      sthaiAasthaiBasobasUpdate: {
        method: "GET",
        url: "/Basobas/GetBasobasForUpdate",
      },
    },
    awabihawit: {
      awabihawit: {
        method: "GET",
        url: "/Aabiwahit/GetAllAabiwahit",
      },
      insertAwabihawit: {
        method: "POST",
        url: "/Aabiwahit/InsertAabiwahit",
      },
      updateAwabihawit: {
        method: "GET",
        url: "/Aabiwahit/GetAabiwahitForUpdate",
      },
      insertAwabihawitFiles: {
        method: "POST",
        url: "/Aabiwahit/InsertAabiwahitFiles",
      },
      getAwabihawitFiles: {
        method: "GET",
        url: "/Aabiwahit/GetAabiwahitFileById",
      },
      approveDisApprove: {
        method: "GET",
        url: "/Aabiwahit/ApproveDisApprove",
      },
      verify: {
        method: "GET",
        url: "/Aabiwahit/Verify",
      },
      awabihawitDetails: {
        method: "GET",
        url: "/Aabiwahit/Details",
      },
    },

    businessCloseRegistration: {
      getBusinessCloseRegistration: {
        method: "GET",
        url: "/BewasayaBanda/GetAllBewasayaBanda",
      },
      insertBusinessCloseRegistration: {
        method: "POST",
        url: "/BewasayaBanda/InsertBewasayaBanda",
      },
      businessClosePrint: {
        method: "GET",
        url: "/BewasayaBanda/Print",
      },
      businessCloseFileUpload: {
        method: "POST",
        url: "/BewasayaBanda/InsertBewasayaBandaFiles",
      },
      getBusinessCloseFielUpload: {
        method: "GET",
        url: "/BewasayaBanda/GetBewasayaBandaFileById",
      },
      getBusinessCloseUpdates: {
        method: "GET",
        url: "/BewasayaBanda/GetBewasayaBandaForUpdate",
      },
    },

    charKilla: {
      getcharKilla: {
        method: "GET",
        url: "/CharKilla/GetAllCharKilla",
      },
      insertCharKilla: {
        method: "POST",
        url: "/CharKilla/InsertCharKilla",
      },
      printCharKilla: {
        method: "GET",
        url: "/CharKilla/Print",
      },
      charKillaFileUpload: {
        method: "POST",
        url: "/CharKilla/InsertCharKillaFiles",
      },
      getCharKillaFileUpload: {
        method: "GET",
        url: "/CharKilla/GetCharKillaFileById",
      },
      charKillaFileUpdate: {
        method: "GET",
        url: "/CharKilla/GetCharKillaForUpdate",
      },
    },
    scholarship: {
      insertScholarship: {
        method: "POST",
        url: "/Scholarship/InsertScholarship",
      },
      getScholarship: {
        method: "GET",
        url: "/Scholarship/GetAllScholarship",
      },
    },
    aadibasiJanjati: {
      aadibasiJanjati: {
        method: "GET",
        url: "/AadiwasiJanajaati/GetAllAadibasiJanjaati",
      },
      insertAadibasiJanjati: {
        method: "POST",
        url: "/AadiwasiJanajaati/InsertAadibasiJanjaati",
      },
      aadbasiType: {
        method: "GET",
        url: "/SifarishCommon/GetAllAadibasiType",
      },
      updateAadibasiJanjati: {
        method: "GET",
        url: "/AadiwasiJanajaati/GetAadibasiJanjaatiForUpdate",
      },
      insertAadibasiFile: {
        method: "POST",
        url: "/AadiwasiJanajaati/InsertAadibasiJanjaatiFiles",
      },
      getAadibasiFile: {
        method: "GET",
        url: "/AadiwasiJanajaati/GetAadibasiJanjaatiFileById",
      },
      printAdibasi: {
        method: "GET",
        url: "/AadiwasiJanajaati/Print",
      },
    },
    aayaShrot: {
      insertAayaShrot: {
        method: "POST",
        url: "/AayaShrot/InsertAayaShrot",
      },
      getAayaShrot: {
        method: "GET",
        url: "/AayaShrot/GetAllAayaShrot",
      },
      aayaShrotPrint: {
        method: "GET",
        url: "/AayaShrot/Print",
      },
      insertAayaShrotFile: {
        method: "POST",
        url: "/AayaShrot/InsertAayaShrotFiles",
      },
      getAayaShrotFile: {
        method: "GET",
        url: "/AayaShrot/GetAayaShrotFileById",
      },
    },
    annualIncome: {
      insertAnnualIncome: {
        method: "POST",
        url: "/AnnualIncome/InsertAnnualIncome",
      },
      getAllAnnualIncome: {
        method: "GET",
        url: "/AnnualIncome/GetAllAnnualIncome",
      },
      getAnnualIncomeForUpdate: {
        method: "GET",
        url: "/AnnualIncome/GetAnnualIncomeForUpdate",
      },
      insertAnnualIncomeFiles: {
        method: "POST",
        url: "/AnnualIncome/InsertAnnualIncomeFiles",
      },
      getAnnualIncomeFile: {
        method: "GET",
        url: "/AnnualIncome/GetAnnualIncomeFileById",
      },
      annualIncomePrint: {
        method: "GET",
        url: "/AnnualIncome/Print",
      },
    },
    businessRegistration: {
      insertBusinessRegistration: {
        method: "POST",
        url: "/BewasayaDarta/InsertBewasayaDarta",
      },
      getBusinessRegistration: {
        method: "GET",
        url: "/BewasayaDarta/GetAllBewasayaDarta",
      },
      businessRegistrationPrint: {
        method: "GET",
        url: "/BewasayaDarta/Print",
      },
      insertFileBusinessRegistration: {
        method: "POST",
        url: "/BewasayaDarta/InsertBewasayaDartaFiles",
      },
      getFileBusinessRegistration: {
        method: "GET",
        url: "/BewasayaDarta/GetBewasayaDartaFileById",
      },
      businessRegistrationUpdates: {
        method: "GET",
        url: "/BewasayaDarta/GetBewasayaDartaForUpdate",
      },
    },
  },
  complaint: {
    complaintDetails: {
      complaintDetails: {
        method: "GET",
        url: "/ComplaintSetup/GetComplaintDetail",
      },
      createcomplaintDetails: {
        method: "POST",
        url: "/ComplaintSetup/CreateComplaintDetail",
      },
    },

    complaintType: {
      complaintType: {
        method: "GET",
        url: "/ComplaintSetup/GetComplaintType",
      },
      createcomplaintType: {
        method: "POST",
        url: "/ComplaintSetup/CreateComplaintType",
      },
    },
    complaintSensitivity: {
      complaintSensitivity: {
        method: "GET",
        url: "/ComplaintSetup/GetComplaintSensitivity",
      },
      createComplaintSensitivity: {
        method: "POST",
        url: "/ComplaintSetup/CreateComplaintSensitivity",
      },
    },
  },
};
export default apiUrls;
