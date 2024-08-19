const inputBox = document.getElementById("input-box"); 
const listContainer = document.getElementById("list-container");

function addTask() {
   if (inputBox.value == '') {
      alert("You must write something.");
   } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);
      
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.append(span);
   }
   inputBox.value = "";
   saveData();
}

listContainer.addEventListener("click", function(e) {
   if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
   } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
   }
}, false);

// Add event listener for editing tasks
listContainer.addEventListener("dblclick", function(e) {
   if (e.target.tagName === "LI") {
      let currentTask = e.target.innerText.slice(0, -1); // Exclude the delete button (×)
      let input = document.createElement("input");
      input.type = "text";
      input.value = currentTask;
      input.className = "edit-box";
      
      e.target.innerHTML = "";
      e.target.appendChild(input);
      
      input.addEventListener("blur", function() {
         e.target.innerHTML = input.value;
         let span = document.createElement("span");
         span.innerHTML = "\u00d7";
         e.target.append(span);
         saveData();
      });
      
      input.addEventListener("keypress", function(event) {
         if (event.key === "Enter") {
            input.blur(); // Trigger blur event to save the task
         }
      });
      
      input.focus();
   }
});

function saveData() {
   localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
   listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
