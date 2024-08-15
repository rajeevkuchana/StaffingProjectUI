export const userRole = {
    client: "Client",
    admin: "Admin",
    interviwer: "Interviwer",
    recruiter: "Recruiter"
}

export const apiBaseAddress = 'http://localhost:8090';

export const Roles = [
    { name: userRole.client, code: userRole.client, },
    { name: userRole.interviwer, code: userRole.client },
    { name: userRole.admin, code: userRole.client },
];

export const Experience = [
    { name: "0-5 Years", value: "exRange01", },
    { name: "5-10 Years", value: "exRange02" },
    { name: "10+ Years", value: "exRange03" },
];

export const NoticePeriod = [
    { name: "Immediate Joiner", value: "1", },
    { name: "< 15 Days", value: "2" },
    { name: "< 30 Days", value: "3" },
];

export const jobType = [
    {
        text: 'Job Description',
        value: 'job description',
        selected: true
    },
    {
        text: 'Job Profile',
        value: 'profiles',
        Selected: false
    }
]

export const filterListDataAI =
{
    name: "Data and AI",
    data: [
        { text: "Data Engineering", Selected: false, value: 'DataEng' },
        { text: "BI Engineering", Selected: false, value: 'BIEng' },
        { text: "ML/DL Engineering", Selected: false, value: 'MLDLEng' },
        { text: "Data Management and Governance", Selected: false, value: 'DataMngGov' }
    ]
}

export const filterListFullStack =
{
    name: "Full Stack",
    data: [
        { text: "Frontend", Selected: false, value: 'Frontend' },
        { text: "UI/UX", Selected: false, value: 'UIUX' },
        { text: "Backend", Selected: false, value: 'Backend' }
    ]
}

export const filterListQA =
{
    name: "QA",
    data: [
        { text: "Performance/Load Testing", Selected: false, value: 'PL-Testing' },
        { text: "Manual Testing", Selected: false, value: 'M-Testing' },
        { text: "Automation Testing", Selected: false, value: 'A-Testing' }
    ]
}
export const filterListDevOps = {
    name: "DevOps",
    data: [
        { text: "CI/CD/CT workflows and pipeline (GitOps)", Selected: false, value: 'CICDCT' },
        { text: "Dockers and Kubernates( Container workloads)", Selected: false, value: 'DocKub' }
    ]
}

export const filterListCloudEngineering =
{
    name: "Cloud Engineering (Administration)",
    data: [
        { text: "AWS", Selected: false, value: 'AWS' },
        { text: "Azure", Selected: false, value: 'Azure' },
        { text: "GCP", Selected: false, value: 'GCP' },
        { text: "OCI", Selected: false, value: 'OCI' }
    ]
}
