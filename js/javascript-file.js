window.addEventListener('load' , showTasks);
let addbtn = document.querySelector('button');
let tasklist = document.querySelector('ul');
let input = document.querySelector('input');
let tasks;
if(!localStorage.getItem('todo')){
    tasks = [];
}
else{
    tasks = getTasks();
}
addbtn.addEventListener('click' , ()=>{
    let text = input.value;
    let task = createtask(text);
    input.value = '';
    saveTasks(text);
    if(text == ''){
        task.remove();
    }
})

tasklist.addEventListener('click' , (e)=>{
    if(e.target.nodeName === 'I'){
        let target = e.target.parentElement.parentElement;
        target.style = 'display : none';
        tasks.splice(tasks.indexOf(target.textContent) , 1);
        localStorage.setItem('todo' , tasks);
    }
    if(e.target.nodeName === 'LI'){
        e.target.classList.toggle('done');
    }

})

function createtask(text){
    let li = document.createElement('li');
    li.textContent += text;
    li.innerHTML += '<span class="closeBtn"><i class="fa-thin fa-trash"></i></span>';
    tasklist.appendChild(li);
    return li;
}
function saveTasks(text){
    tasks.push(text);
    localStorage.setItem('todo',tasks);
}
function getTasks(){
    return localStorage.getItem('todo').split(',');
}
function showTasks(){
    for (let taskText of getTasks()) {
        let task = createtask(taskText);
    }
}