// Inicializa o modal do Bootstrap
const myModal = new bootstrap.Modal(document.getElementById("transactions-modal"));

// Obtém o estado de login das sessões de armazenamento
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    login: logged,
    transactions: []
};

// Adiciona o listener para o botão de logout
document.getElementById("button-logout").addEventListener("click", logout);

// Adicionar lançamento
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

    getCashIn();
    getCashOut();
    getTotal()

    alert("Lançamento adicionado com sucesso");
});

// Verifica o estado de login do usuário
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

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = cashIn.length > 5 ? 5 : cashIn.length;

        for (let index = 0; index < limit; index++) {
            const transaction = cashIn[index];
            cashInHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${transaction.value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${transaction.description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${transaction.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        document.getElementById("cash-in-list").innerHTML=cashInHtml;

        document.getElementById("cash-in-container").innerHTML = cashInHtml;
    }
}




function getCashOut() {
    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type === "2");

    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = cashOut.length > 5 ? 5 : cashOut.length;

        for (let index = 0; index < limit; index++) {
            const transaction = cashOut[index];
            cashOutHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${transaction.value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${transaction.description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${transaction.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        
    
}

    function getTotal() {
        const transaction = data.transactions; 

        

        transaction.forEach((item) => {
            let total =0;
            if(item.type === "1") {
                total += item.value;
            }  else {
                total -= item.value
            }
        })

        document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)} `; 
    }

        document.getElementById("cash-in-container").innerHTML = cashInHtml; 
        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    
    }

    function savedata(data) {
        localStorage.setItem(data.login, JSON.stringify(data));
    }

    