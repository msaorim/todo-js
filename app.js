'use strict';

let bd = [];

const getBd = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBd = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const clear = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const render = () => {
    clear();
    bd = getBd();
    bd.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const addItem = (e) => {
    const tecla = e.key;
    const texto = e.target.value;
    bd = getBd();
    if (tecla === 'Enter' && texto != '') {
        bd.push(
            {
                'tarefa': texto,
                'status': ''
            }
        );
        setBd(bd);
        render();
        e.target.value = '';
    }
}

const removerItem = (i) => {
    bd = getBd();
    bd.splice(i, 1);
    setBd(bd);
    render();
}

const atualizaItem = (i) => {
    bd = getBd();
    bd[i].status = bd[i].status === '' ? 'checked' : '';
    setBd(bd);
    console.log(bd)
}

const clickItem = (e) => {
    const clickedItem = e.target;
    const i = clickedItem.dataset.indice
    if (clickedItem.type === 'button') {
        removerItem(i);
    } else if (clickedItem.type === 'checkbox') {
        atualizaItem(i);
    }
}

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);

render();

