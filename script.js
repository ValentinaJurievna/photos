import sum from './utils.js';
sum(3, 5, 2);

let list = document.getElementById('list');
let grid = document.getElementById('grid');
let listView = document.getElementById('listView');
let cards = document.getElementById('employees');
list.onclick = function() {
	listView.style.display = '';
	cards.style.display = 'none';
}

grid.onclick = function() {
	listView.style.display = 'none';
	cards.style.display = '';
}



const employeesGrid = document.getElementById('employees');
const employeesList = document.getElementById('listView');
const res = document.getElementById('result');
const searchBar = document.getElementById('search');
let employees = [];
var outputEmployees;

const getEmploeeList = () =>{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
    
            const loadEmployees = async () => {
                employees = JSON.parse(xhr.response);
                outputEmployees = employees;
                displayEmployeesGrid(employees);
                displayEmployeesList(employees);
                
            };
            loadEmployees();     

           

            document.getElementById('form').addEventListener('submit', formHandler, {once: true});
            document.getElementById('form1').addEventListener('submit', formHandler, {once: true});
            function formHandler(event) {
                event.preventDefault();
                signIn(employees);
                signUp();
            }

            for (key in employees) {
                localStorage.setItem(`${employees[key].password}`, JSON.stringify(employees));
            }

            display(employees);
            

        }   
    }
    
    xhr.open('GET', 'http://localhost:1000/home');
    xhr.send();
} 
getEmploeeList();


//форма

const signIn = (employees) => {
    const email = document.querySelector('#email-signIn').value;
    const password = document.querySelector('#password-signIn').value;
    for(key in employees) {
        let get = JSON.parse(localStorage.getItem(`${employees[key].password}`));

        if ( get[key].contacts.email == email && get[key].password == password) {
            window.open(`http://localhost:1000/person/${employees[key].title.replace(' ', '_')}`);

        }
        else if (get[key].password != password) {
            document.getElementById('password-signIn').style.border = '1px solid red';
        }
        else if (get[key].contacts.email != email) {
            document.getElementById('email-signIn').style.border = '1px solid red';
            
        }                
    }
}

const signUp = () => {
    const email = document.querySelector('#email-signUp').value;
    const password = document.querySelector('#password-signUp').value;
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const role = document.querySelector('#role').value;

    const obj = {
		title: name,
		text: surname,
		role: role,
		department: {
			icon: "img/suitcase.png",
			specialty: "Web & Mobile"
		},
		room: {
			icon: "img/door.png",
			number: 981
		},
		contacts: {
			internalPhone: "765",
			mobilePhone: "+375(29)765-34-65",
			email: email
		},
		profileInfo: {
			hireDate: "9 Jan 2019",
			status: "Active"
		},
		employmentInfo: {
			start: ["9 Jan 2018", "19 Feb 2019"],
			dayDuration: ["5 hours", "8 hours"]	
		},
		image: "https://github.com/ValentinaJurievna/photos/blob/main/5.png?raw=true",
		password: password
    }

    localStorage.setItem(password, JSON.stringify(obj));

    // if (role == 'Admin') {
    //     location.href = 'settings.html';
    //     document.getElementById('settings').style.display = '';
    //     document.getElementById('settings').classList.removeClass = 'disabled';
    // }
    
    if (role == 'Employee') {
        document.getElementById('modal-order').style.display = 'none';
        document.getElementById('settings').style.display = 'none';
        const raw = JSON.parse(localStorage.getItem(password));
        employees.push(raw);
        displayEmployeesGrid(employees);
        let result = employees.length;
        res.innerHTML = result; 
    }

}


var display = (employees) => {
    let k = Object.keys(localStorage);
    for (let i=0; i<k.length; i++) {
        const raw = JSON.parse(localStorage.getItem(k[i]));
        if (raw.role === 'Employee') {
            employees.push(raw);
            displayEmployeesGrid(employees);
            let result = employees.length;
            res.innerHTML = result; 
        }
    }
};
   
           
    


// function User(name, email) {
//     this.name = name;
//     this.email = email;

// }

// function Admin(name, email) {
//     User.call(this, name, email);
//     this.show = function() {

//     }
// }






document.getElementById('sort-asc').onclick = function() {
    outputEmployees.sort((a, b) => a.title > b.title ? 1 : -1);
    displayEmployeesGrid(outputEmployees);     
}
document.getElementById('sort-desc').onclick = function() {
    outputEmployees.sort((a, b) => a.title < b.title ? 1 : -1);
    displayEmployeesGrid(outputEmployees);     
}
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    outputEmployees = employees.filter((employee) => {
        return (
            employee.title.toLowerCase().includes(searchString) ||
            employee.text.toLowerCase().includes(searchString)
        );
    });
    
    displayEmployeesGrid(outputEmployees);
    displayEmployeesList(outputEmployees);
    var result = outputEmployees.length;
    res.innerHTML = result; 
});

///



var displayEmployeesGrid = (employees) => {
    const htmlString = employees
    .map((employee) => {
        return `
            <div class="card p-3 col-5 mt-3" id = "${employee.title}" >
                <img src="${employee.image}" class="card__img mx-auto d-block img-fluid">
                    <div class="card__body">
                        <h5 class="card__title mt-3">${employee.title}</h5>
                        <p class="card__text">${employee.text}</p>
                    </div>
                    <div class="card__body mt-3">
                        <a href="#" class="card__link"><img src="${employee.department.icon}" width="16" height="16" class="img-fluid" alt="">&ensp;${employee.department.specialty}</a>
                        <a href="#" class="card__link ml-5"><img src="${employee.room.icon}" class="img-fluid" alt="">&ensp;${employee.room.number}</a>
                    </div>
            </div>  	
    `;
    })
    .join('');
employeesGrid.innerHTML = htmlString;
};

const displayEmployeesList = (employees) => {
    const htmlString = employees
    .map((employee) => {
        return `
        <tr>
        <td width="300">${employee.title}</td>
        <td width="300">${employee.text}</td>
        <td width="300">${employee.department.specialty}</td>
        <td width="300">${employee.room.number}</td> 
        </tr>            			
    `;
    })
    .join('');
    employeesList.innerHTML = htmlString;
};



// employee.html

// const getEmploee = (name) =>{
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//         }   
//     }
//     xhr.open('GET', `http://localhost:1000/person/${name.replace(' ', '_')}`);
//     xhr.send();
// }

document.getElementById('employees').onclick = (event) => {
    let node = event.target;
    while(node.id == "") {
        node = node.parentNode;
        var newWin = window.open(`http://localhost:1000/person/${node.id.replace(' ', '_')}`);
    }  
    if(node.id != 'employees') {
        getEmploee(node.id);
    }   
}


//modal

// const modalButton = document.getElementById('modal-button');
// modalButton.addEventListener('click', function() {
//     createModal('Авторизация', 'Hello');
// });


// function createModal(title, content) {
//     const modal = document.getElementById('modal');
//     modal.style.display = '';
//     modal.innerHTML = `
//         <h1>${title}</h1>
//         <p>${content}</p>
//     `
// }

const modalButton = document.getElementById('modal-button');
const buttonSignup = document.getElementById('signUp');
const buttonSignin = document.getElementById('signIn');
const modalSignIn = document.getElementById('modal-signIn');
const modalSignUp = document.getElementById('modal-signUp');

modalButton.addEventListener('click', function(){
	var modal = document.getElementById('modal-order');
    var span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }

    modal.onclick = function(e) {
        window.e
            if (e.target == this) {
                modal.style.display = 'none';
            }
    }
	modal.style.display = 'block';
});

buttonSignup.addEventListener('click', function() {
    modalSignIn.style.display = 'none';
    modalSignUp.style.display = '';
});

buttonSignin.addEventListener('click', function() {
    modalSignIn.style.display = '';
    modalSignUp.style.display = 'none';
});


//отмена перезагрузки страницы




