const fileInput =
    document.getElementById('img')

const imageBase64 =
    document.getElementById('imagenBase64')

fileInput.addEventListener('change', (e) => {

    const file = e.target.files[0];

    if (!file) return

    const reader = new FileReader();

    reader.onload = () => {

        imageBase64.value = 
            reader.result
    }

    reader.readAsDataURL(file)
})