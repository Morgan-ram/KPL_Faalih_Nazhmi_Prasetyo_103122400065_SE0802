require('dotenv').config()

async function ambilkutipan(){
    try {
        fetch(process.env.BASE_API)
        .then(response => response.json())
        .then(data => console.log(data['fact']))
    } catch (error) {
        console.log(error);
    }
}

ambilkutipan();
