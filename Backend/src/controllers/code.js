// JavaScript Practice Playground
// Random coding experiments

const students = [
    { name: "Aarav", marks: 85 },
    { name: "Riya", marks: 92 },
    { name: "Arjun", marks: 76 },
    { name: "Sneha", marks: 88 },
    { name: "Rahul", marks: 67 }
];

// Calculate average marks
function calculateAverage(students) {
    const total = students.reduce((sum, student) => {
        return sum + student.marks;
    }, 0);

    return total / students.length;
}

// Find top performer
function getTopper(students) {
    return students.reduce((topper, student) => {
        return student.marks > topper.marks ? student : topper;
    });
}

// Filter students who passed
function getPassedStudents(students) {
    return students.filter(student => student.marks >= 40);
}

// Sort students by marks
function sortStudents(students) {
    return [...students].sort((a, b) => b.marks - a.marks);
}

// Generate random ID
function generateId() {
    return Math.floor(Math.random() * 100000);
}

// Display results
console.log("Average:", calculateAverage(students));
console.log("Topper:", getTopper(students));
console.log("Passed:", getPassedStudents(students));
console.log("Rankings:", sortStudents(students));
console.log("Random ID:", generateId());

// String utilities
const reverseString = str => str.split("").reverse().join("");

const isPalindrome = str => {
    const cleaned = str.toLowerCase().replace(/\s/g, "");
    return cleaned === reverseString(cleaned);
};

console.log(isPalindrome("madam"));
console.log(reverseString("JavaScript"));