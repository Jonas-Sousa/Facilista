const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById('itens-comprados')

let itemAEditar 

const API = "https://json-facilista.vercel.app/mensal"

const getApi = async () => {
  try {
    const promisse = await fetch(API)
    const data = await promisse.json()
    
    return data 
  } catch (error) {
    console.error(error)
  }
}

let objetoSemanal = null;
let listaMensal = [];
getApi().then((data) => {
  for (let i = 0; i < data.length; i++) {
    objetoSemanal = data[i];
    listaMensal.push({
      valor: objetoSemanal.nome,
      checar: false
    });
  }
});


const semanal = document.getElementById('mensal-click')

semanal.addEventListener('click', (e) => {
  e.preventDefault()
  MostraItens()
  console.log(listaMensal);
})

const enviarItem = () => {
  listaMensal.push({
    valor: '',
    checar: false
  })
  
  MostraItens()
}

function MostraItens() {
  ulItens.innerHTML = '';
  ulItensComprados.innerHTML = '';

  listaMensal.forEach((obj, index) => {
    if (obj.checar) {
      ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" checked class="is-clickable" data-index="${index}" />
            <span class="itens-comprados is-size-5">${obj.valor}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    } else {
      ulItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" ${obj.checar ? 'checked' : ''} data-index="${index}" />
            <input type="text" class="is-size-5" value="${obj.valor}" ${index === itemAEditar ? 'disabled' : ''} ></input>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    }
  });

  selecionarCheckbox();
  deletarItens();
}

function selecionarCheckbox() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', (evento) => {
      let index = evento.target.getAttribute('data-index');
      listaMensal[index].checar = evento.target.checked;
      MostraItens();
    });
  });
}

function deletarItens() {
  const deletarObjetos = document.querySelectorAll('.deletar');
  deletarObjetos.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
      let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaMensal.splice(valorDoElemento, 1);
      MostraItens();
    });
  });
}


 
