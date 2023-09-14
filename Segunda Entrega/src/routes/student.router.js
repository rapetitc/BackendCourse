import { Router } from "express";
import StudentController from "../controllers/student.controller.js";

const studentRoutes = Router()
const studentCtrler = new StudentController

studentRoutes.get("/", studentCtrler.getStudents)
studentRoutes.post("/", studentCtrler.addStudent)
studentRoutes.put("/", studentCtrler.updateStudent)
studentRoutes.delete("/", studentCtrler.removeStudent)

export default studentRoutes