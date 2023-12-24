const closeMenu = document.querySelector('#close-menu')
const menuMobile = document.querySelector('#menu-mobile ul')
const openMenu = document.querySelector('#open-menu')
const category = document.querySelector('#category')
const containerItem = document.querySelector('.container-item ')
const patients = document.querySelector('#patients')
const patientsList = document.querySelector('.patients')
const footerInp = document.querySelector('.footer-inp')
const closeProfile = document.querySelector('.close-profile-btn')
const closeListCityBtn = document.querySelector('.close-list-city-btn')
const searchBoxCity = document.querySelector('#search-box-city')
const accountUserBtn = document.querySelector('#btn-login a')
const registerDoctor = document.querySelector('#register-doctor a')
const patientsItem = document.querySelectorAll('.patients-item')

patientsItem.forEach((item) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let accountName = urlParams.get('accountName');
    let role = urlParams.get('role');
    item.addEventListener('click', () => {
        if (isLogin) {
            if (item.innerHTML === 'دریافت نوبت') {
                location.href = `gettingAppointment.html?accountName=${accountName}&role=${role}`;
            }
        } else {
            location.href = 'registerPage.html'
        }
    })
})

let isLogin = false
window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let accountName = urlParams.get('accountName');
    if (urlParams.has('role')) {
        let role = urlParams.get('role');
        if (role === 'دکتر') {
            accountUserBtn.innerHTML = 'حساب کاربری'
            accountUserBtn.href = '#'
            registerDoctor.innerHTML = 'بیماران من'
            registerDoctor.href = `myPatients.html?accountName=${accountName}&role=${role}`;
            patients.style.display = 'none'
            isLogin = true
        } else if (role === 'بیمار') {
            accountUserBtn.innerHTML = 'حساب کاربری'
            accountUserBtn.href = '#'
            registerDoctor.style.display = 'none'
            isLogin = true
        }
    } else {
        console.log('پارامتر role در URL وجود ندارد');
    }

}


const accordionTagBox = document.querySelector('.btn')
const text = document.querySelector('.text')
accordionTagBox.addEventListener('click', () => {
    text.classList.toggle('display')
})

const containerListCity = document.querySelector('.container-list-city')

function openSearchBoxCity() {
    containerListCity.classList.add('close-list-city')
}

function closedSearchBoxCity() {
    containerListCity.classList.remove('close-list-city')

}

const containerBoxDoctor = document.querySelector('.container-box-doctor')

function closedProfileDoctor() {
    containerBoxDoctor.classList.toggle('close-profile')

}

const containerResultSearch = document.querySelector('#container-result-search')
const inputSearchDoctor = document.querySelector('#input-search-doctor')
inputSearchDoctor.addEventListener('input', () => {
    let resultSearch = listDoctor.filter((doctor) => {
        return doctor.name.includes(inputSearchDoctor.value);
    });

    if (resultSearch !== []) {
        containerResultSearch.innerHTML = ''
        containerResultSearch.style.display = 'block'
        resultSearch.forEach((doctor) => {
            containerResultSearch.insertAdjacentHTML('beforeend', `<div>
        <h4>${doctor.name}</h4>
    <span>${doctor.expertise}</span>
            </div>`)
        })
    }
    if (resultSearch.length === 0) {
        containerResultSearch.innerHTML = '<span>دکتر مورد نظر پیدا نشد</span>'
    }
    if (inputSearchDoctor.value === '') {
        containerResultSearch.style.display = 'none'
    }

})


closeListCityBtn.addEventListener('click', closedSearchBoxCity)
searchBoxCity.addEventListener('click', openSearchBoxCity)
footerInp.addEventListener('click', closedProfileDoctor)
closeProfile.addEventListener('click', closedProfileDoctor)
patients.addEventListener('click', (e) => {
    e.preventDefault()
    containerItem.classList.remove('flex')
    patientsList.classList.toggle('patientsList')

})
category.addEventListener('click', () => {
    patientsList.classList.remove('patientsList')
    containerItem.classList.toggle('flex')
})
closeMenu.addEventListener('click', () => {
    menuMobile.classList.add('closeMenu')
    menuMobile.classList.remove('openMenu')
})
openMenu.addEventListener('click', () => {
    menuMobile.classList.remove('closeMenu')
    menuMobile.classList.add('openMenu')
})
