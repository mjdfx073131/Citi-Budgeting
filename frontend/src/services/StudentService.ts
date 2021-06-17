import axios from 'axios';
import { Student } from '../types/types';

const STUDENTS_API_URL = 'http://localhost:8080/api/students';

class StudentService {
    
    getStudents() {
        return axios.get(STUDENTS_API_URL);
    }

    createStudent(student: Student) {
        return axios.post(STUDENTS_API_URL, student)
    }
}

export default new StudentService();