
//creates new item using the create-todo function when clicked
document.querySelector('.create-todo').addEventListener('click',function(){
    document.querySelector('.new-todo').style.display='block';
  });
//creates the actual item which will be added
  document.querySelector('.new-todo button').addEventListener('click',function(){
    var itemName = document.querySelector('.new-todo input').value;
    if(itemName != ''){

      var itemsStorage = localStorage.getItem('todo-items');
      var itemsArr = JSON.parse(itemsStorage);
        itemsArr = itemsArr || [];
        itemsArr.push({"item":itemName, "status":0});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-todo input').value='';
        document.querySelector('.new-todo').style.display='none';
      }

  });
//fetching items in todo list from storage
  function fetchItems(){

    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try{
      var itemsStorage = localStorage.getItem('todo-items');
      var itemsArr = JSON.parse(itemsStorage);

      //status of item when fetched from storage
      for (var i = 0; i < itemsArr.length; i++) {
        var status = 2;
        if(itemsArr[i].status == 1){
          status = 'class="done"';
        } else if (itemsArr[i].status == 2){
          status = 'class="notdone"';
        }
        //every new item added
        newItemHTML += `<li data-itemindex="${i}" ${status} contentEditable = "false">
        <span class="item" id="edit" >${itemsArr[i].item}</span>
        <div><span class="itemComplete"><i class="fa fa-check"></i></span><span class="itemEdit"><i class="fa fa-edit"></i></span><span class="itemDelete"><i class="material-icons">delete</i></span></div>
        </li>`;
      }

      itemsList.innerHTML = newItemHTML;
      //loops through the item list and listens for events
      var itemsListUL = document.querySelectorAll('ul li');
      for (var i = 0; i < itemsListUL.length; i++)
      //the complete button
      {
        itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){

          var index = this.parentNode.parentNode.dataset.itemindex;
          itemComplete(index);
        });
        //the delete button
        itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){

          var index = this.parentNode.parentNode.dataset.itemindex;
          itemDelete(index);
        });
        //the Edit button
        itemsListUL[i].querySelector('.itemEdit').addEventListener('click', function(){

          var index = this.parentNode.parentNode.dataset.itemindex;
          itemEdit(index);
        });
    }
    }catch(e){
    }

  }

  //function for checking button
  function itemComplete(index){

      var itemsStorage = localStorage.getItem('todo-items');
      var itemsArr = JSON.parse(itemsStorage);

      // mark item as done
      if (document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className !='done') {
        document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className = 'done'

        itemsArr[index].status = 1;

      // mark item as not done
      } else if (document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className=='done') {
        document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='notdone'

        itemsArr[index].status = 2;
      }
      saveItems(itemsArr);

}

//function for delete button
function itemDelete(index){

    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr.splice(index, 1);

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();
}


//edit button
function itemEdit(index){
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);
//turn item to editable
    if (document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').contentEditable == "false"){
        document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').contentEditable = "true";
    } else if (document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').contentEditable == "true") {
      document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').contentEditable = "false";
    }
//unmarks item
  if (document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className=='done') {
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='notdone'
  }

    saveItems(itemsArr);
}

//saving items in storage
function saveItems(obj){

    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

  fetchItems();
