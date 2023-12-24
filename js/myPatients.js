const containerList = document.querySelector('#container-list')
window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let accountName = urlParams.get('accountName');
    fetch('https://university-baabb-default-rtdb.firebaseio.com/doctor.json').then(res => res.json())
        .then(data => {
            let allDoctor = Object.entries(data)
            let doctor = allDoctor.find((doctor) => {
                return doctor[1].username === accountName
            })
            console.log(Boolean(doctor[1].patients))
            if (doctor[1].patients) {
                doctor[1].patients.forEach((patients) => {
                    containerList.insertAdjacentHTML("beforeend", `
            <li>${patients}</li> `)
                })
            } else {
                containerList.innerHTML = " بیماری ثبت نوبت نکرده است "
            }

        })
}
