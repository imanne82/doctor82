let listDoctor = []
fetch('https://university-baabb-default-rtdb.firebaseio.com/doctor.json').then(res => res.json())
    .then(data => {
        let convertData = Object.entries(data)
        convertData.forEach(data => {
            listDoctor.push(data[1])
            console.log(listDoctor)
        })
    })
    .catch(() => alert('اتصال به درستی برقرار نیست'))