
// GLOBAL VARIABLES
let userInput = document.getElementById("user_input"),
    feedbackElement = document.getElementById('feedback_message'),
    semesterOptions = ['Su', 'F', 'W', 'S', 'Summer', 'Fall', 'Winter', 'Spring'],
    filteredQuery = {};


// add event listeners to the input
["change", "keyup"].forEach(evt =>
  userInput.addEventListener(evt, () => {
  
    filteredQuery = {
      department: null,
      course: null,
      year: null,
      semester: null
    };
    
    let feedbackMessage;
    const setFeedbackMessage = (str, addClass = 'error') => {
      if (!feedbackMessage) {

        feedbackMessage = str;
        feedbackElement.innerHTML = feedbackMessage;
        if (addClass !== 'error') {
          feedbackElement.classList.add(addClass);
        } else {
          feedbackElement.className = '';
        }

      }
    };

    let newQuery = userInput.value;

    const removeLeadingSpaces = (str) => {
      while ( str[0] === ' ' ) { 
        str = str.substring(1);
      }
      return str;
    }

    // DEPARTMENT - Step 1/4: find the first number, and grab all the letters before it
    const getDepartment = (() => {
      newQuery = removeLeadingSpaces(newQuery);
      for (let i = 1; i < newQuery.length;i++) {
        if (!filteredQuery.department && !isNaN(newQuery[i])) {
          let course = newQuery.substring(0, i).replace(/[^\w\s]/gi, '')
          if (/^[a-zA-Z]+$/.test(course) ) {
            filteredQuery.department = course;
          }
          //update the query
          newQuery = newQuery.substring(i);
        } else {
          // error
        }
      }
    })();

    // COURSE NUMBER - Step 2/4: find the next space (aka " ") to identify the endding index of the course number
    const getCourseNumber = (() => {
      newQuery = removeLeadingSpaces(newQuery);
      for (let i = 1; i < newQuery.length; i++) {
        if (filteredQuery.department && !filteredQuery.course && isNaN(parseInt(newQuery[i])) ) {
          filteredQuery.course = newQuery.substring(0, i);
          //update the query
          newQuery = newQuery.substring(i);
        } else {
          // error
        }
      }
    })();

    // SEMESTER - Step 3/4: compare the options in the array to the remaining string
    const getSemester = (() => {
      semesterOptions.forEach(option => {
        if (filteredQuery.department && filteredQuery.course && !filteredQuery.semester && newQuery.toLowerCase().includes(option.toLowerCase())) {
          switch (option) {
            case 'Su':
              filteredQuery.semester = 'Summer';
              break;
            case 'F':
              filteredQuery.semester = 'Fall';
              break;
            case 'W':
              filteredQuery.semester = 'Winter';
              break;
            case 'S':
              filteredQuery.semester = 'Spring';
              break;
            default:
              filteredQuery.semester = option;
          }
        } else {
          // error
        }
      });
    })();

    // YEAR - Step 4/4: remove all non-number characters from the query, then add  more logic
    const getYear = (() => { 
      if (filteredQuery.course) {
        let year = '';
        for (let i = 1; i < newQuery.length; i++) {
          if (!isNaN(newQuery[i])) {
            year += newQuery[i];
          }
        }
        year = parseInt(year);
        if (year < 100) {
          year = year + 2000;
        }
        let baselineYear = 0;
        if (year < baselineYear) {
          // error
        }
        filteredQuery.year = year;
      }
    })();
    
    // OUTPUT
    let setOutput = (element, value, error) => {
      if ( value ) {
        document.getElementById(element).innerHTML = value;
      } else {
        document.getElementById(element).innerHTML = error || '...';
      }
    }
    setOutput('output_department', filteredQuery.department);
    setOutput('output_course', filteredQuery.course);
    setOutput('output_semester', filteredQuery.semester);
    setOutput('output_year', filteredQuery.year);

    // ERRORS
    (function errors() {

      if (!filteredQuery.department) {
        setFeedbackMessage('Input the Department first.');
      } else if (!filteredQuery.course) {
        setFeedbackMessage('Input the Coruse Number second.');
      } else if (!filteredQuery.semester) {
        setFeedbackMessage('Input the Semester.');
      } else if (!filteredQuery.year) {
        setFeedbackMessage('Input the Year.');
      } else {
        setFeedbackMessage('Ready to search!', 'success');
      }

    })();
   

    // testing
    // console.log(JSON.stringify(filteredQuery).split(",").join("\n"));

  })
);
// userInput.focus();
