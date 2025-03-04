
const itemInput = document.getElementById('itemInput');
const itemBtn = document.getElementById('itemBtn');
const itemList = document.getElementById('itemList')


function addItem(){
    if(itemInput.value.trim()==="") return;

    itemList.style.display = 'block';


    const li = document.createElement("li");
    

    li.textContent=itemInput.value;
    
    itemList.appendChild(li);

    itemInput.value = ""; 


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', function() {
        li.remove(); 
    });
    li.appendChild(deleteBtn);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed');
      });


      li.appendChild(checkbox);
      
}


itemBtn.addEventListener("click", addItem);

itemInput.addEventListener("keypress", (event)=>{
    if(event.key==="Enter") addItem();
})

