document.addEventListener('DOMContentLoaded', () => {
    const todolist = document.getElementById('todo-list');
    const errormsg = document.querySelector('#error-msg');
    const cn = document.querySelector('#counter');
    const fall = document.querySelector('#filter-all');
    const fact = document.querySelector('#filter-active');
    const fdon = document.querySelector('#filter-done');
    const txtf = document.querySelector('#todo-input');
    const addbtn = document.querySelector('#add-btn');

    function addTodo() {
        let txtcontent = txtf.value.trim();
        if (txtcontent == null || txtcontent == "") {
            errormsg.classList.remove('hidden'); 
        } else {
            errormsg.classList.add('hidden'); 

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
    
    addbtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        addTodo();
    });

    txtf.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            addTodo();
        }
    });
    
    todolist.addEventListener('click', (e) => {
        if (e.target.className == 'delete-btn') {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
        else if (e.target.className == 'item-text') {
            e.target.parentNode.classList.toggle('completed');
        }
        else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
        }
        updtcn();
    });

    function updtcn(){
       let count = todolist.querySelectorAll('li:not(.completed)').length;
       cn.textContent = count + ' items left';
    }
    updtcn();
    let items=todolist.children;
    fall.addEventListener('click',()=>{
        for(let a of items){
            a.style.display='flex';
        }
    })
    fact.addEventListener('click',()=>{
        for(let b of items){
            if(b.classList.contains('completed')){
                b.style.display='none';
            }
            else{
                b.style.display='flex';
            }
        }
    })
    fdon.addEventListener('click',()=>{
        for(let c of items){
            if(c.classList.contains('completed')){
                c.style.display='flex';
            }
            else{
                c.style.display='none';
            }

        }
    })
});