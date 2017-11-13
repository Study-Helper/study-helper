import React from 'react';
import {Bar} from 'react-chartjs-2';
import SubjectManager from '../../../server/managers/SubjectManager.js'

let data;
let options;
let labels;
let grades;


class GradesChart extends React.Component {

  constructor(props) {
    super(props);

    labels = [];
    grades = [];

    this.load_data();

    data = { 
      labels: labels,
      datasets: [{
        label: 'Grade',
        data: grades,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    };

    options = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          bottom: 30
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          gridLines: {
            display:true,
          },
          ticks: {
            suggestedMax: 20,
            min: 0,
            stepSize: 5
          }   
        }]
      },
      legend: {
        display: false
      },
      title: { 
        display: true,
        text: 'Grades' 
      }
    };
  }

  load_data(){
    const subjects = SubjectManager.loadSubjects();
    subjects.forEach(subject => {
      labels.push(subject.name);
      let mean_grade = 0;
      let len = 0;
      for(let key in subject.tests){
        let test = subject.tests[key];
        mean_grade += test.grade
        len++;
      }
      mean_grade = len != 0 ? mean_grade/len : 0;
      grades.push(mean_grade);
    });
  }

  render() {
    return (
      <Bar
        data={data}
        width={900}
        height={350}
        options={options}
      />
    )
  }

}

export default GradesChart;