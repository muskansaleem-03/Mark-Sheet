let generateButton = document.getElementById("GenerateButton");
let addSubjectButton = document.getElementById("addSubjectBtn");
let subjectsContainer = document.getElementById("subjects-container");

let totalMarks = 0;
let grade = '';
let marksData = "";
let percentage

let subjectCount = 3; 

addSubjectButton.addEventListener("click", () => {
    subjectCount++;

    const newSubjectGroup = document.createElement("div");
    newSubjectGroup.classList.add("form-group");

    newSubjectGroup.innerHTML = `
        <label for="subject${subjectCount}Name">Subject ${subjectCount}:</label>
        <input type="text" id="subject${subjectCount}Name" placeholder="Subject Name" required />
        <input type="number" id="subject${subjectCount}Marks" min="0" max="100" required />
    `;

    subjectsContainer.appendChild(newSubjectGroup);
});

generateButton.addEventListener("click", (e) => {
    e.preventDefault();

   

    
    for (let i = 1; i <= subjectCount; i++) {
        const subjectName = document.getElementById(`subject${i}Name`).value;
        const subjectMarks = parseInt(document.getElementById(`subject${i}Marks`).value);

        if (subjectMarks >= 0 && subjectMarks <= 100) {
            marksData += `<p><strong>${subjectName}:</strong> ${subjectMarks}</p>`;
            totalMarks += subjectMarks;
        }
    }

     percentage = (totalMarks / (subjectCount * 100)) * 100;


    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
     } else if (percentage >= 70) {
            grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }


    const resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = `
        <h3>Marks Sheet</h3>
        ${marksData}
        <hr />
        <p><strong>Total Marks:</strong> ${totalMarks} / ${subjectCount * 100}</p>
        <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
        <p><strong>Grade:</strong> ${grade}</p>
    `;

    
    document.getElementById("marksform").reset();
    subjectCount = 3;

 
    while (subjectsContainer.children.length > 3) {
        subjectsContainer.removeChild(subjectsContainer.lastChild);
    }
});

let saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click" , ()=>{

    localStorage.setItem("totalMarks" , totalMarks);
    localStorage.setItem("percentage" , percentage);
    localStorage.setItem("grade" , grade);
})

let loadBtn = document.getElementById("loadBtn");

loadBtn.addEventListener("click" , ()=>{
    let marks = localStorage.getItem("totalMarks");
    let percent = localStorage.getItem("percentage");
    let grd = localStorage.getItem("grade");
    

    const resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = `
        <h3>Marks Sheet</h3>
        ${marksData}
        <hr />
        <p><strong>Total Marks:</strong> ${marks} / ${subjectCount * 100}</p>
        <p><strong>Percentage:</strong> ${percent.toFixed(2)}%</p>
        <p><strong>Grade:</strong> ${grd}</p>
    `;


})