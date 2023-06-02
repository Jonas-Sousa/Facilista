let listaDeItens = []
let itemAEditar

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItens')

const atualizaLocalStorage = () => {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    exibirItens()
}else {
    listaDeItens = []
}



form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    salvarItem();
    exibirItens();
    itensInput.focus();
});

const salvarItem = () => {
    let comprasItem = itensInput.value
    let checarItemDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarItemDuplicado){
        alert('Esse item ja existe')
    }else {
    listaDeItens.push({
        valor:comprasItem,
        checar: false
    })
    }
    itensInput.value = ''
    
}

function exibirItens() {
        ulItens.innerHTML = ''
        ulItensComprados.innerHTML = ''
        
        listaDeItens.forEach((elemento, index) => {
            if(elemento.checar) {
                ulItensComprados.innerHTML += `
                    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                        <div>
                            <input type="checkbox" checked class="is-clickable" />
                            <span class="itens-comprados is-size-5">${elemento.valor}</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-trash is-clickable deletar"></i>
                        </div>
                    </li>
                `
            }else {
                ulItens.innerHTML += `
                    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                        <div>
                            <input type="checkbox" class="is-clickable" />
                            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''} ></input>
                        </div>
                        <div>
                            <i class="fa-solid fa-trash is-clickable deletar"></i>
                        </div>
                        
                    </li>    
                    
                    `
            }
        
        })

        
    let inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach( (i) => {
        i.addEventListener('click', (evento) => {
            let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = evento.target.checked
            exibirItens()
            
        })
    })

    const deletarObjetos = document.querySelectorAll('.deletar')
    
    deletarObjetos.forEach( (i) => {
        i.addEventListener('click', (evento) => {
            let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento, 1)
            exibirItens()
            
        })
    })



atualizaLocalStorage()

}

