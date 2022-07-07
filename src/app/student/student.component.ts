import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CscService } from '../service/csc.service';
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
  countries: any;
  states: any;
  cities: any;
  myCountry: any;
  myState: any;
  myCity: any;

  constructor(
    private studentService: StudetnService,
    private fb: FormBuilder,
    private cscService: CscService
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      roll: [null, [Validators.required]],
      address: ['', [Validators.required]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
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
    this.getAllCountries();
  }

  //-----------Get All Student------------//
  getAllStudent() {
    this.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudents = res.data;
    });
  }

  //-----------Get Student By Id------------//
  async getStudentById(id: any) {
    this.oneStudent = await this.studentService.getStudentById(id).toPromise();

    await this.changeCountry(this.oneStudent.country);
    await this.changeStates(this.oneStudent.state);

    this.myCountry = await this.cscService.getCountry().toPromise();
    this.myState = await this.cscService
      .GetStates(this.oneStudent.country)
      .toPromise();
    this.myCity = await this.cscService
      .GetCities(this.oneStudent.state)
      .toPromise();

    this.myCountry = this.myCountry.filter((c: any) => {
      return c.id == this.oneStudent.country;
    });

    this.myState = this.myState.filter((s: any) => {
      return s.id == this.oneStudent.state;
    });
    this.myCity = this.myCity.filter((c: any) => {
      return c.id == this.oneStudent.city;
    });
    this.oneStudent.country = this.myCountry[0].name;
    this.oneStudent.state = this.myState[0].name;
    this.oneStudent.city = this.myCity[0].name;
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
    if (this.editData.country) {
      this.changeCountry(this.editData.country);
    }
    if (this.editData.state) {
      this.changeStates(this.editData.state);
    }
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
      country: this.editData.country,
      state: this.editData.state,
      city: this.editData.city,
      subject: this.newsubjData,
    });
  }

  close() {
    this.newsubjData.splice(0, this.newsubjData.length);
    this.subFromArray.controls.splice(0, this.subFromArray.length);
    this.states = null;
    this.cities = null;
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
      console.log(this.studentForm.value);
      this.studentForm.reset();
    }
    if (this.updateButton) {
      this.studentService
        .updateStudetnById(this.id, this.studentForm.value)
        .subscribe((res) => {
          alert('Student Updated successfully');
        });
      this.studentForm.reset();

      this.states = null;
      this.cities = null;
    }
  }
  //--------Get All Countries---------//
  getAllCountries() {
    this.cscService.getCountry().subscribe((res) => {
      this.countries = res;
    });
  }
  //------ Change Country-----------//
  changeCountry(id: any) {
    if (id) {
      this.cscService.GetStates(id).subscribe((res) => {
        this.states = null;
        this.states = res;
      });
    }
  }

  //--------Change State------------//
  changeStates(id: any) {
    if (id) {
      this.cscService.GetCities(id).subscribe((res) => {
        this.cities = null;
        this.cities = res;
      });
    }
  }
}
