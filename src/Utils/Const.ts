export const userRole = {
    client: "Client",
    admin: "Admin",
    interviwer: "Interviwer",
    recruiter : "Recruiter"
}

export const apiBaseAddress = 'https://quantlytix-api.onrender.com/api' ;

export const Roles = [
    { name: userRole.client, code: userRole.client },
    { name: userRole.interviwer, code: userRole.client },
    { name: userRole.admin, code: userRole.client },
];