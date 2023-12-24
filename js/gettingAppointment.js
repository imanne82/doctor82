const btnGetAppointment = document.querySelectorAll("#list-doctor ul li button")
const containerDoctor = document.querySelector("#list-doctor ul")
const containerInfo = document.querySelector("#modal")
btnGetAppointment.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.value)
    })
})

function getListDoctor() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let accountName = urlParams.get('accountName');
    getInformation(accountName)
    fetch('https://university-baabb-default-rtdb.firebaseio.com/doctor.json').then(res => res.json())
        .then(data => {
                if (data) {
                    containerDoctor.innerHTML = ''
                    let allDoctor = Object.entries(data)
                    allDoctor.forEach((doctor) => {
                        containerDoctor.insertAdjacentHTML('beforeend', `
                               <li><span> ${doctor[1].username}</span><span>${doctor[1].expertise}</span>
                               <button  onclick="setTimeDoctor(${doctor[1].id})" >
                               دریافت نوبت</button></li>
                    `)
                    })
                } else {
                    containerDoctor.innerHTML = 'دکتری ثبت نام نکرده است'
                }


            }
        ).catch(() => containerDoctor.innerHTML = 'خطا در اینترنت ')
}

function setTimeDoctor(id) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let accountName = urlParams.get('accountName');
    fetch('https://university-baabb-default-rtdb.firebaseio.com/doctor.json').then(res => res.json())
        .then(data => {
            let allDoctor = Object.entries(data)
            let doctor = allDoctor.find((doctor) => {
                return doctor[1].id === id
            })
            updateTimeDoctor(doctor, accountName)
            checkTimeDoctor(accountName, doctor[1])
        })
}

function updateTimeDoctor(doctor, accountName) {
    fetch(`https://university-baabb-default-rtdb.firebaseio.com/doctor/${doctor[0]}.json`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: doctor[1].id,
            username: doctor[1].username,
            password: doctor[1].password,
            role: 'دکتر',
            phone: doctor[1].phone,
            expertise: doctor[1].expertise,
            patients: [...doctor[1].patients, `${accountName}`]
        })

    }).then(res => {
        getInformation(accountName)

    }).catch(err => console.log(err))
}

function checkTimeDoctor(name, doctor) {
    fetch('https://university-baabb-default-rtdb.firebaseio.com/users.json').then(res => res.json())
        .then(data => {
            let allUser = Object.entries(data)
            let user = allUser.find(user => {
                return user[1].username === name
            })
            updateUser(user, doctor)
            getInformation(name)
        }).catch(err => console.log(err))

}

function getInformation(name) {
    containerInfo.innerHTML = ''
    fetch('https://university-baabb-default-rtdb.firebaseio.com/users.json').then(res => res.json())
        .then(data => {
            let allUser = Object.entries(data)
            let user = allUser.find(user => {
                return user[1].username === name
            })
            if (user[1].queue !== '') {
                user[1].queue.forEach((n) => {
                    console.log(n)
                    containerInfo.insertAdjacentHTML('beforeend', `
            <h5>نوبت شما برای دکتر ${n} انجام شد به امید بهبود شما</h5>
            `)
                })
            } else {
                containerInfo.innerHTML = '<h5>نوبتی ندارید...!</h5>'
            }

        }).catch(err => console.log(err))
}

function updateUser(user, doctor) {
    fetch(`https://university-baabb-default-rtdb.firebaseio.com/users/${user[0]}.json`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: user[1].username,
            password: user[1].password,
            role: 'بیمار',
            phone: user[1].phone,
            queue: [...user[1].queue, `${doctor.username} , مختصص : ${doctor.expertise}`],
        })
    }).then(() => alert("نوبت شما ثبت شد")).catch(() => alert('نوبت ثبت نشد'))
}

window.addEventListener('load', getListDoctor)
