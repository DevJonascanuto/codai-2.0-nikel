
const myModal = new bootstrap.Modal(document.getElementById("transactions-modal"));

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    login: logged,
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);



document.getElementById("transactions-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    savedata(data);
    e.target.reset();
    myModal.hide();


    getTransactions();


    alert("Lançamento adicionado com sucesso");
});

checkLogged();

function checkLogged() {
    if (session) {
        // Se houver uma sessão, define o estado de login na sessionStorage
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    // Se não estiver logado, redireciona para a página de login
    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const datauser = localStorage.getItem(logged);
    if (datauser) {
        data = JSON.parse(datauser);
        data.login = logged;
        console.log(data);
    }

    getTransactions();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}


function getTransactions() {
    const transactions = data.transactions;
    let transactionHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "entrada";

            if (item.type === "2") {
                type = "saída";
            }

            transactionHtml += `
                <<th scope="row"> ${item.date} 04/06/2024</th>
                      <td>${item.value.toFixed(2)}</td>
                      <td>${type}</td>
                      <td>${item.description}</td>
            `;
        });
    }

        document.getElementById("transactions-list").innerHTML;

    return transactionHtml;
}



function savedata(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}