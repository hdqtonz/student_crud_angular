import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudetnService } from '../service/studetn.service';

interface subjectData {
  name: string;
  marks: number;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  public allStudents?: any = [];
  public oneStudent: any;
  addButton = false;
  updateButton = false;
  title: any;
  studentForm!: FormGroup;
  newsubjData: subjectData[] = [];
  subjectData: any;
  editData: any;
  id: any;

  constructor(private studentService: StudetnService, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      roll: [null, [Validators.required]],
      address: ['', [Validators.required]],
      subject: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required]],
          marks: [null, [Validators.required]],
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllStudent();
  }

  //-----------Get All Student------------//
  getAllStudent() {
    this.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudents = res.data;
    });
  }

  //-----------Get Student By Id------------//
  getStudentById(id: any) {
    this.studentService.getStudentById(id).subscribe((res) => {
      this.oneStudent = res;
    });
  }

  //-----------Delete Student------------//
  deleteStudentById(id: any) {
    this.studentService.deleteStudentById(id).subscribe((res) => {
      this.getAllStudent();
    });
  }

  //-----------Add Student------------//
  addStudent() {
    this.studentForm.reset();
    this.title = 'Add Studetn';
    this.addButton = true;
    this.updateButton = false;
  }

  //--------Get Subject Form Array--------//
  get subFromArray() {
    // return this.studentForm.get('subject') as FormArray;
    return <FormArray>this.studentForm.get('subject');
  }

  //----------- Add Subject --------------//
  addSubject() {
    const newSub = this.fb.group({
      name: ['', [Validators.required]],
      marks: [null, [Validators.required]],
    });

    (<FormArray>this.subFromArray).push(newSub);
  }

  //-----------Edit Student------------//
  async editStudent(id: any) {
    this.id = id;
    this.editData = await this.studentService.getStudentById(id).toPromise();

    this.subjectData = this.editData.subject;

    this.addButton = false;
    this.title = 'Update Student';
    this.updateButton = true;

    this.setvalueform();
  }

  //-------- Set Value In Form-------//
  setvalueform() {
    this.close();
    this.studentForm.reset();
    for (let i = 0; i < this.subjectData.length; i++) {
      let Data: any = {
        name: null,
        marks: null,
      };
      Data.name = this.subjectData[i].name;
      Data.marks = this.subjectData[i].marks.marks;
      this.newsubjData.push(Data);

      if (this.subFromArray.controls.length <= this.newsubjData.length) {
        this.addSubject();
      }
    }

    this.studentForm.patchValue({
      name: this.editData.name,
      roll: this.editData.roll,
      address: this.editData.address,
      subject: this.newsubjData,
    });
  }

  close() {
    this.newsubjData.splice(0, this.newsubjData.length);
    this.subFromArray.controls.splice(0, this.subFromArray.length);
  }

  //----------Add Student--------------//
  submit() {
    if (this.addButton) {
      this.studentService
        .addNewStudent(this.studentForm.value)
        .subscribe((res) => {
          this.getAllStudent();
          alert('Student Added successfully');
        });
      this.studentForm.reset();
    }
    if (this.updateButton) {
      this.studentService
        .updateStudetnById(this.id, this.studentForm.value)
        .subscribe((res) => {
          alert('Student Updated successfully');
        });
      this.studentForm.reset();
    }
  }
}
