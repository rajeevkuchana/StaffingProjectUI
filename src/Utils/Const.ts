export const userRole = {
    client: "client",
    admin: "admin",
    interviwer: "interviwer",
    recruiter : "recruiter"
}

export const apiBaseAddress = 'http://localhost:8090' ;

export const Roles = [
    { name: userRole.client, code: userRole.client },
    { name: userRole.interviwer, code: userRole.client },
    { name: userRole.admin, code: userRole.client },
];