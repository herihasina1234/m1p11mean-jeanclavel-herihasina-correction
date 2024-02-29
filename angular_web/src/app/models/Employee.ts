export interface Employee {
    _id: string;
    name: string;
    firstname: string;
    email: string;
    password: string;
    role: object;
}

export interface EmployeeDto {
    _id: string;
    name: string;
    firstname: string;
    email: string;
    password: string;
    role: string;
}
