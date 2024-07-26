export interface IProfile {
    id?: string
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    location?: string
    profilePic?: string
    rating1?: number
    rating2?: number
    rating3?: number
    rating4?: number
    rating5?: number
    basicDetails?: BasicDetails
    experienceDetails?: ExperienceDetails
    feedback?: Feedback
    videoLink?: string
    resumeLink?: string
    interviewBy?: string
    interviewDateTime?: string
    managedBy?: string
    status?: string
    selectedBy?: string
    selectedDateTime?: string
}

export interface BasicDetails {
    basicD1?: string
    basicD2?: string
    basicD3?: string
    basicD4?: string
}

export interface ExperienceDetails {
    "expD1"?: string
    "expD2"?: string
    "expD3"?: string
    "expD4"?: string
}

export interface Feedback {
    shortFeedback?: string
    longFeedback?: string
}
