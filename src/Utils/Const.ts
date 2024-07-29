import { validateHeaderName } from "http";
import Selected from "../Pages/Client/Selected";

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
        { text: "Data Engineering", Selected: false },
        { text: "BI Engineering", Selected: false },
        { text: "ML/DL Engineering", Selected: false },
        { text: "Data Management and Governance", Selected: false }
    ]
}

export const filterListFullStack =
{
    name: "Full Stack",
    data: [
        { text: "Frontend", Selected: false },
        { text: "UI/UX", Selected: false },
        { text: "Backend", Selected: false }
    ]
}

export const filterListQA =
{
    name: "QA",
    data: [
        { text: "Performance/Load Testing", Selected: false },
        { text: "Manual Testing", Selected: false },
        { text: "Automation Testing", Selected: false }
    ]
}
export const filterListDevOps = {
    name: "Full Stack",
    data: [
        { text: "CI/CD/CT workflows and pipeline (GitOps)", Selected: false },
        { text: "Dockers and Kubernates( Container workloads)", Selected: false }
    ]
}

export const filterListCloudEngineering =
{
    name: "Cloud Engineering (Administration)",
    data: [
        { text: "AWS", Selected: false },
        { text: "Azure", Selected: false },
        { text: "GCP", Selected: false },
        { text: "OCI", Selected: false }
    ]
}
