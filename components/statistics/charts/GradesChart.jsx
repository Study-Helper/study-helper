import React from 'react';
import {Bar} from 'react-chartjs-2';
import SubjectManager from '../../../server/managers/SubjectManager.js';
import {StudentsMeanText} from '../../../styles/styles.css.js';

let labels;
let grades;
let colors;

class GradesChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      options: {},
      mean: 0
    }

    labels = [];
    grades = [];
    colors = [];
  }

  componentWillMount(){
    this.load_data();
    this.set_chart_data();
    this.set_chart_options();
  }

  set_chart_data(){
    this.setState({data: { 
        labels: labels,
        datasets: [{
          label: 'Grade',
          data: grades,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      }
    });
  }

  set_chart_options(){
    this.setState({options: {
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
      }
    });
  }

  load_data(){
    let loc_total_mean = 0;
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
      loc_total_mean += mean_grade;
      grades.push(mean_grade);
      colors.push(subject.color);
    });
    loc_total_mean = subjects.length != 0 ? loc_total_mean/subjects.length : 0;
    this.setState({ mean: parseFloat(loc_total_mean).toFixed(2) });
  }

  render() {
    return (
      <div>
        <div>
          <Bar
            data={this.state.data}
            width={900}
            height={350}
            options={this.state.options}
          />
        </div>
        <div style={StudentsMeanText}>
          Your Average Score is {this.state.mean}!
        </div>
      </div>
    )
  }
}

export default GradesChart;