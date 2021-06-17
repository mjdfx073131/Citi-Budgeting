import React, { FunctionComponent, useEffect, useState } from "react";
import StudentService from "../services/StudentService";
import {Student} from "../types/types";

export interface StudentListProps {

}

const StudentList: FunctionComponent<StudentListProps> = () => {

    const emptyStudentsList: Student[] = [];
    const [allStudents, setAllStudents] = useState(emptyStudentsList);

    function getAllStudents(): void {
        StudentService.getStudents().then((response: any) => {
            setAllStudents(response.data);
        });
    }

    useEffect(() => {
        getAllStudents();
    }, [allStudents]);

    return <div>
        <h1 className="text-center">List of Students</h1>
        <table className="table table-striped table-dark table-bordered table-hover">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Department</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                {
                    allStudents.map(
                        student => 
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.dept}</td>
                            <td>{student.desc}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>;
};

export default StudentList;
