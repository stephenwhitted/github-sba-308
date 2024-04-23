console.log('SBA 308... let us begin!')
/* // Code Example Given
// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

*
*/
function getLearnerData(course, assignmentGroup, submissions) {
    let learnersData = []; //push data into this array

    try {
        // if statement to check assignment group's course ID
        if (course.id !== assignmentGroup.course_id) {
            throw new Error("Assignment group's course ID is not a match for the course ID.");
        }
        const currentDate = new Date(); 

        // Loop through each submission
        submissions.forEach(submission => {
            // locate the correct assignment using Array.find
            const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);
            if (!assignment) {
                console.log(`No matching assignment found for submission ID: ${submission.assignment_id}`);
                return; // skip
            }
            // assignment due date passed?
            if (new Date(assignment.due_at) > currentDate) {
                console.log(`Assignment ${assignment.id} is not due yet.`);
                return; //if assignment due date isn't right now skip
            }
            User
function getLearnerData(course, assignmentGroup, submissions) {
    let learnersData = []; // Use `let` because we will be pushing data into this array

    try {
        // Validate the assignment group's course ID using an if statement
        if (course.id !== assignmentGroup.course_id) {
            throw new Error("Assignment group's course ID does not match the course ID.");
        }

        const currentDate = new Date(); // Use `const` for immutable date value

        // Loop through each submission
        submissions.forEach(submission => {
            // Use Array.find to locate the correct assignment
            const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);
            if (!assignment) {
                console.log(`No matching assignment found for submission ID: ${submission.assignment_id}`);
                return; // Skip this iteration
            }

            // see if assignment due date has passed
            if (new Date(assignment.due_at) > currentDate) {
                console.log(`Assignment ${assignment.id} is not due yet.`);
                return; // Skip this iteration if the assignment isn't due yet
            }

            // locate learner data or create new if not found
            let learnerData = learnersData.find(ld => ld.id === submission.learner_id);
            if (!learnerData) {
                learnerData = {
                    id: submission.learner_id,
                    scores: {},
                    totalWeightedScore: 0,
                    totalWeightedPossible: 0
                };
                learnersData.push(learnerData);
            }
            // Figure out the score and make changes if it was turned in late.
            let score = submission.submission.score;
            const pointsPossible = assignment.points_possible;
            if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
                score -= pointsPossible * 0.1; // Deduct 10% for late submission
            }
