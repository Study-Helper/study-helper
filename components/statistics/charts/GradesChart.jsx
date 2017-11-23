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
    let mean_grade = 0;
    let counter = 0;
    const subjects = SubjectManager.loadSubjects();
    subjects.forEach(subject => {
      labels.push(subject.name);
      grades.push(subject.mean);
      colors.push(subject.color);
      mean_grade += subject.mean;
      counter++;
    });
    this.setState({ mean: parseFloat(mean_grade/counter).toFixed(2) });
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