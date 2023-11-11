<template>
  <div>
    <table>
      <tr>
        <td>姓名</td>
        <td>性别</td>
        <td>出生日期</td>
        <td>手机号</td>
      </tr>
      <tr v-for="patient in patientList">
        <td>{{patient.patientName}}</td>
        <td>{{patient.gender}}</td>
        <td>{{patient.dateOfBirth}}</td>
        <td>{{patient.phoneNumber}}</td>
      </tr>
      <tr>
        <td>{{patientOne.patientName}}</td>
        <td>{{patientOne.gender}}</td>
        <td>{{patientOne.dateOfBirth}}</td>
        <td>{{patientOne.phoneNumber}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Patient",
  data(){
    return{
      patientList:[],
      patientOne:{}
    }
  },
  created() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.post("/patient/getPatientPageByQuery",{current:1,pageSize:10})
        .then((res)=>{
          this.patientList = res.data.data.records;
        });
    axios.get("/patient/getPatientById", {params:{patientId:1}})
        .then((res)=>{
          this.patientOne = res.data.data;
        });
  }
}

</script>