function htmlToElement(html) {
var template = document.createElement('template');
html = html.trim(); // Never return a text node of whitespace as the result
template.innerHTML = html;
return template.content.firstChild;
}

function completeItem(btn)
{
    const li = btn.closest('li');
    const p =li.children[0].children[0];
    btn.disabled = true;
    p.innerHTML = `<del>${p.innerHTML}</del>`;
}
function deleteItem(btn)
{
    const li = btn.closest('li');
    li.remove();
}


const addButton = document.getElementById('addItem');
addButton.addEventListener('click',()=>{
    const toDo = document.getElementById('toAdd');
    const toDo_text = toDo.value;
    if(toDo_text.length>0)
    {

        toDo.value="";
        const noOfListItems = document.querySelectorAll("my-todo-list li").length;
        const mainUl = document.getElementById('mainList');
        if(noOfListItems==0){
            
            mainUl.classList.remove('display-none');
        }
     
        
        var liElement = htmlToElement(` <li class="list-group-item">
        <div class="d-flex justify-content-between">
         
             <p class="todo-text">${toDo_text}</p>
             <div class="button-group d-flex justify-content-around" >
      <button class="btn btn-success me-2"  onclick="completeItem(this)" type="button">Done</button>
      <button class="btn btn-danger" onclick="deleteItem(this)"type="button">Delete</button>
     </div>
     </div
    </li> `);
        mainUl.append(liElement);
    }

})


const createNewBtn = document.getElementById('createNew');
createNewBtn.addEventListener('click',()=>{
    const chooser = document.getElementById('chooser');
    chooser.classList.add('d-none');
    const newlist = document.getElementById('new-list');
    newlist.classList.remove('d-none');
    
})

const newListBtn = document.getElementById('openExisting');

newListBtn.addEventListener('click',()=>{
    const chooser = document.getElementById('chooser');
    chooser.classList.add('d-none');
    const open = document.getElementById('new-list');
    open.classList.remove('d-none');

    
    if (localStorage.getItem('todoList')){
        var listContents = JSON.parse(localStorage.getItem('todoList'));
        const mainUl = document.getElementById('mainList');
        listContents.forEach(element=>{
            let btnState="";
            if(element.includes('<del>'))
            {
                btnState="disabled";
            }
            var liElement = htmlToElement(` <li class="list-group-item">
        <div class="d-flex justify-content-between">
         
             <p class="todo-text">${element}</p>
             <div class="button-group d-flex justify-content-around" >
      <button class="btn btn-success me-2" ${btnState} onclick="completeItem(this)" type="button">Done</button>
      <button class="btn btn-danger" onclick="deleteItem(this)"type="button">Delete</button>
     </div>
     </div
    </li> `);
        mainUl.append(liElement);
        })
        
    }
})

const saveBtn = document.getElementById('save-list');
saveBtn.addEventListener('click',()=>{
    
        const lis = document.querySelectorAll("li");
        const li_count = lis.length;
        var list_contents = [];
        lis.forEach(element => {
          list_contents.push(element.querySelector('p').innerHTML); 
        });
        console.log(list_contents);
        localStorage.setItem('todoList', JSON.stringify(list_contents));
        document.getElementById('savedAlert').classList.remove('d-none');
})

