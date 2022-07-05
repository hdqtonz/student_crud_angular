import { Component, OnInit } from '@angular/core';
import { StudetnService } from '../service/studetn.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  public allStudents?: any = [];
  public oneStudent: any;
  viewMe = true;
  constructor(private studentService: StudetnService) {}

  ngOnInit(): void {
    this.viewMe = true;
    this.getAllStudent();
  }

  getAllStudent() {
    this.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudents = res.data;
      console.log(this.allStudents);
    });
  }

  getStudentById(id: any) {
    this.viewMe = true;
    this.studentService.getStudentById(id).subscribe((res) => {
      this.oneStudent = res;
      console.log(res);
    });
  }

  deleteStudentById(id: any) {
    this.studentService.deleteStudentById(id).subscribe((res) => {
      this.getAllStudent();
    });
  }
}
