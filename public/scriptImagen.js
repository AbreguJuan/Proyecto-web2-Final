const fileInput = document.getElementById('img')
//const imageBase64 = document.getElementById('imagenBase64')
const errores = document.getElementById('errores')
const contenedorImgs = document.getElementById('imgsBase64')
const contenedorPreview = document.getElementById('imgsPreview')

const form = document.forms[0]

const arregloImgs = []

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bodyToSend = {
        imgs: arregloImgs,
        fecha: new Date().toLocaleTimeString()
    }
    fetch(form.action, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyToSend)
    })
})

fileInput.addEventListener('change', (e) => {

    const file = e.target.files[0];

    for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        const resultado = validarFile(file)
        if (!resultado) {
            const li = document.createElement('li')
            li.innerText = `Error imagen ${file.name}`
            errores.appendChild(li)
            continue
        }
        const reader = new FileReader();
        reader.onload = () => {
            const imagen = {
                src: reader.result,
                name: file.name
            }

            arregloImgs.push(imagen)

            /*const textArea = document.createElement('textarea')
            textArea.hidden = true;
            textArea.value = reader.result;
            textArea.name = `imgsBase64-${i}`
            //imageBase64.value = reader.result
            contenedorImgs.appendChild(textArea)*/
            
            createImgPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }
})

function createImgPreview(value) {
    const imgPreview = document.createElement('img')
    imgPreview.src = value
    imgPreview.style.width = '300px'
    contenedorImgs.appendChild(imgPreview)
}

function validarFile(file) {
    if (!file) return false
    if (file.size > 10000000) {
        console.error('No podes subir mas de 10mb')
        return false
    }
    return true
}