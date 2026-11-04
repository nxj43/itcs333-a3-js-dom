document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('submit', (e) => e.preventDefault());

    const todolist = document.getElementById('todo-list');
    const errormsg = document.getElementById('error-msg');
    const cn = document.getElementById('counter');
    const fall = document.getElementById('filter-all');
    const fact = document.getElementById('filter-active');
    const fdon = document.getElementById('filter-done');
    const txtf = document.getElementById('todo-input');
    const addbtn = document.getElementById('add-btn');

    function updtcn() {
        if (!todolist || !cn) return;
        let total = todolist.getElementsByTagName('li').length;
        let completed = todolist.getElementsByClassName('completed').length;
        cn.textContent = (total - completed) + ' items left';
    }

    function addTodo() {
        let txtcontent = txtf.value.trim();
        if (txtcontent === "") {
            errormsg.classList.remove('hidden');
            errormsg.style.display = 'block'; 
        } else {
            errormsg.classList.add('hidden');
            errormsg.style.display = 'none';

            let li_item = document.createElement('li');
            
            let span_item = document.createElement('span');
            span_item.textContent = txtcontent;
            span_item.className = 'item-text'; 
            li_item.appendChild(span_item);
            
            let delbtn = document.createElement('button');
            delbtn.textContent = "Delete";
            delbtn.className = 'delete-btn';
            li_item.appendChild(delbtn);
            
            todolist.appendChild(li_item);
            txtf.value = "";
            updtcn();
        }
    }
    
    if (addbtn) {
        addbtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            addTodo();
        });
    }

    if (txtf) {
        txtf.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTodo();
            }
        });
    }
    
    if (todolist) {
        todolist.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.target.parentElement.remove();
                updtcn();
            }
            else if (e.target.classList.contains('item-text')) {
                e.target.parentElement.classList.toggle('completed');
                updtcn();
            }
            else if (e.target.tagName === 'LI') {
                e.target.classList.toggle('completed');
                updtcn();
            }
        });
    }

    let items = todolist ? todolist.children : [];
    
    if (fall) {
        fall.addEventListener('click', () => {
            for(let a of items) {
                a.style.display = 'flex';
            }
        });
    }
    
    if (fact) {
        fact.addEventListener('click', () => {
            for(let b of items) {
                if (b.classList.contains('completed')) {
                    b.style.display = 'none';
                } else {
                    b.style.display = 'flex';
                }
            }
        });
    }
    
    if (fdon) {
        fdon.addEventListener('click', () => {
            for(let c of items) {
                if (c.classList.contains('completed')) {
                    c.style.display = 'flex';
                } else {
                    c.style.display = 'none';
                }
            }
        });
    }

    updtcn();
});