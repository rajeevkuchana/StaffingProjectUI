export interface IProfile {
    id?: string
    profileId?: string
    firstName?: string
    gender?: string
    lastName?: string
    email?: string
    phone?: string
    location?: string
    profilePic?: any
    currentCompany?: string
    expectedCTC?: number
    currentCTC?: number
    overallExp?: number
    relevantExp?: number
    designation?: string
    summary?: Summary
    certificationList?: string[]
    jobProfile?: string[]
    jobCategory?: string
    dataEngR?: number
    programmingR?: number
    cloudEngR?: number
    communicationR?: number
    attitudeR?: number
    overAllRating?: number
    experienceDetails?: ExperienceDetails
    feedback?: Feedback
    videoLink?: any
    resumeLink?: any
    interviewBy?: string
    interviewDateTime?: string
    managedBy?: string
    status?: any
    selectedBy?: any
    noticePeriod?: number | string
    selectedDateTime?: any
    matchPer?: string
    skills?: string[]
}

export interface Summary {
    summary1?: string
    summary2?: string
    summary3?: string
   
}

export interface ExperienceDetails {
    expD1?: string
    expD2?: string
    expD3?: string
    expD4?: string
}

export interface Feedback {
    shortFeedback?: string
    longFeedback?: string
}
