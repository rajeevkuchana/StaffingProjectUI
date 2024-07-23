export const userRole = {
    client: "Client",
    admin: "Admin",
    interviwer: "Interviwer",
    recruiter : "Recruiter"
}

export const apiBaseAddress = 'http://localhost:8090' ;

export const Roles = [
    { name: userRole.client, code: userRole.client },
    { name: userRole.interviwer, code: userRole.client },
    { name: userRole.admin, code: userRole.client },
];