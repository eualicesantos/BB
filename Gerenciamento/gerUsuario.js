document.addEventListener("DOMContentLoaded", function () {
    let editingRow = null; 

    document.getElementById("userForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let id = editingRow ? editingRow.cells[0].textContent : Date.now(); // Mantém o ID ao editar
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let dob = document.getElementById("dob").value;
        
        // Converter data para o formato brasileiro (dd/mm/aaaa)
        let dateObj = new Date(dob);
        let formattedDob = dateObj.toLocaleDateString("pt-BR");

        if (name && email && dob) {
            if (editingRow) {
                // Atualizar usuário existente
                editingRow.cells[1].textContent = name;
                editingRow.cells[2].textContent = email;
                editingRow.cells[3].textContent = formattedDob;
                
                editingRow = null; // Finaliza a edição
                alert("Usuário atualizado com sucesso!");
            } else {
                // Criar novo usuário
                let table = document.getElementById("userList");
                let row = table.insertRow();
                
                row.insertCell(0).textContent = id;
                row.insertCell(1).textContent = name;
                row.insertCell(2).textContent = email;
                row.insertCell(3).textContent = formattedDob;
                
                // Criar célula de ações
                let actionsCell = row.insertCell(4);

                // Botão Editar
                let editBtn = document.createElement("button");
                editBtn.textContent = "Editar";
                editBtn.classList.add("edit-btn");
                editBtn.onclick = function() {
                    editUser(row);
                };
                actionsCell.appendChild(editBtn);

                // Botão Excluir
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Excluir";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = function() {
                    table.deleteRow(row.rowIndex - 1);
                };
                actionsCell.appendChild(deleteBtn);
                
                alert("Usuário cadastrado com sucesso!");
            }
            
            document.getElementById("userForm").reset();
        } else {
            alert("Preencha todos os campos!");
        }
    });

    function editUser(row) {
        editingRow = row;
        document.getElementById("name").value = row.cells[1].textContent;
        document.getElementById("email").value = row.cells[2].textContent;

        // Converter data de dd/mm/aaaa para aaaa-mm-dd (formato do input date)
        let dateParts = row.cells[3].textContent.split("/");
        let formattedDob = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        document.getElementById("dob").value = formattedDob;
    }
});
