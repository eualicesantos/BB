document.addEventListener("DOMContentLoaded", function () {
    let editingRow = null; 

    document.getElementById("userForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let id = editingRow ? editingRow.cells[0].textContent : Date.now(); // Mantém o ID ao editar
        let name = document.getElementById("name").value;
        let cpf = document.getElementById("cpf").value;
        let dob = document.getElementById("dob").value;
        let address = document.getElementById("address").value;
        
        // Converter data para o formato brasileiro (dd/mm/aaaa)
        let dateObj = new Date(dob);
        let formattedDob = dateObj.toLocaleDateString("pt-BR");

        if (name && cpf && dob && address) {
            if (editingRow) {
                // Atualizar usuário existente
                editingRow.cells[1].textContent = name;
                editingRow.cells[2].textContent = cpf;
                editingRow.cells[3].textContent = formattedDob;
                editingRow.cells[4].textContent = address;
                
                editingRow = null; // Finaliza a edição
                alert("Usuário atualizado com sucesso!");
            } else {
                // Criar novo usuário
                let table = document.getElementById("userList");
                let row = table.insertRow();
                
                row.insertCell(0).textContent = id;
                row.insertCell(1).textContent = name;
                row.insertCell(2).textContent = cpf;
                row.insertCell(3).textContent = formattedDob;
                row.insertCell(4).textContent = address;
                
                // Criar célula de ações
                let actionsCell = row.insertCell(5);

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
        document.getElementById("cpf").value = row.cells[2].textContent;

        // Converter data de dd/mm/aaaa para aaaa-mm-dd (formato do input date)
        let dateParts = row.cells[3].textContent.split("/");
        let formattedDob = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        document.getElementById("dob").value = formattedDob;

        document.getElementById("address").value = row.cells[4].textContent;
    }
});
