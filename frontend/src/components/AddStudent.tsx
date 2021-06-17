import React, { FunctionComponent, useState } from "react";
import StudentService from "../services/StudentService";

export interface AddStudentProps {}

const AddStudent: FunctionComponent<AddStudentProps> = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dept, setDept] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    function addStudent(e: any): void {
        if (!firstName || !lastName || !dept || !desc) {
            alert("Please fill out all the fields!");
        }
        e.preventDefault();
        const student = {
            firstName: firstName,
            lastName: lastName,
            dept: dept,
            desc: desc,
        };
        StudentService.createStudent(student).then(() => {
            setFirstName("");
            setLastName("");
            setDept("");
            setDesc("");
        });
    }

    return (
        <div className="container">
            <form>
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">
                        First Name:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">
                        Last Name:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="dept" className="col-sm-2 col-form-label">
                        Department:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="dept"
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="desc" className="col-sm-2 col-form-label">
                        Description:
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={addStudent}>
                        Add Student
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
