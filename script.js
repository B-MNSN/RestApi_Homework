var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')
var editDataStd = document.getElementById('editDataStd')

function hideAll() {
    singleStudentResult.style.display = 'none'
    listStudentResult.style.display = 'none'
    addUserDetail.style.display = 'none'
    editDataStd.style.display = 'none'
}

function addStudentToTable(index, student) {
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
    let someDiv = document.createElement('div')
    cell.appendChild(someDiv)
    let imgElem = document.createElement('img')
    someDiv.appendChild(imgElem)
    imgElem.setAttribute('src', student.image)
    imgElem.style.width = '150px'
    imgElem.classList.add('img-thumbnail')
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.description
    row.appendChild(cell)

    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-warning')
    button.setAttribute('type', 'button')
    button.innerText = 'Edit'
    cell.appendChild(button)
    row.appendChild(cell)
    button.addEventListener('click', function() {
        let conf = confirm(`ท่านต้องการแก้ไขคุณ ${student.name} หรือไม่`)
        if (conf) {
            editDataStudent(student)
        }
    })

    cell = document.createElement('td')
    button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerText = 'Delete'
    button.addEventListener('click', function() {
        let cf = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if (cf) {
            deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    tableBody.appendChild(row)

    // row.addEventListener('click', function() {
    //     showStudentBlock(student)
    // })
}

function showStudentBlock(student) {
    hideAll()
    singleStudentResult.style.display = 'block'
    addStudentData(student)

}

function addStudentData(student) {
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)

}

function addStudentList(studentList) {
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    for (student of studentList) {
        addStudentToTable(counter++, student)
    }
}

document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
        .then(response => {
            return response.json()
        }).then(student => {
            addStudentData(student)
        })
})

function addStudentToDB(student) {
    fetch('https://dv-student-backend-2019.appspot.com/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('success', data)
        showAllStudents()
    })
}

window.addEventListener('load', onLoad)

function onLoad() {
    showAllStudentsBlock()
}

function deleteStudent(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is now deleted`)
        showAllStudents()
    }).catch(error => {
        alert('your input student id is not in the database')
    })
}

function editInformation(student) {
    fetch('https://dv-student-backend-2019.appspot.com/students', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('success', data)
        showAllStudents()
    })
}

function editDataStudent(editStd) {
    hideAll()
    editDataStd.style.display = 'block'
    document.getElementById('idEdit').value = editStd.id
    document.getElementById('editName').value = editStd.name
    document.getElementById('editSurname').value = editStd.surname
    document.getElementById('editStudentId').value = editStd.studentId
    document.getElementById('editGpa').value = editStd.gpa
    document.getElementById('editImageLink').value = editStd.image

}

function editDataStdClick() {
    let student = {}
    student.id = document.getElementById('idEdit').value
    student.name = document.getElementById('editName').value
    student.surname = document.getElementById('editSurname').value
    student.studentId = document.getElementById('editStudentId').value
    student.gpa = document.getElementById('editGpa').value
    student.image = document.getElementById('editImageLink').value
    editInformation(student)
}
document.getElementById('editButton').addEventListener('click', function() {
    editDataStdClick()
})

function onAddStudentClick() {
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}
document.getElementById('addButton').addEventListener('click', onAddStudentClick)

function showAllStudents() {
    fetch('https://dv-student-backend-2019.appspot.com/students')
        .then((response) => {
            return response.json()
        }).then(data => {
            addStudentList(data)
        })
}

document.getElementById('allStudentMenu').addEventListener('click', (event) => {
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudents()
})
document.getElementById('addStudentMenu').addEventListener('click', (event) => {
    hideAll()
    addUserDetail.style.display = 'block'
})

function showAllStudentsBlock() {
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudents()
}