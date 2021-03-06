const users = [
    {
        name:"Jonh Snow",
        email: "johnsnow@exemple.com",
        password: '123456',
    },
    {
        name:"Jonh Pyke",
        email: "johnpyke@exemple.com",
        password: '654321',
    },
    {
        name:"Je",
        email: "j@j",
        password: '123',
    }
]

function signIn() {

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const user = users.find(user => user.email === email.value && user.password === password.value);

    if(!user){
        console.log("email ou senha incorreto!");
        return
    }

    return window.location.href ='dashboard.html';
    
}



document.querySelector("form")
    .addEventListener("submit", event => {
        
        console.log("enviar formulário");

        // função preventDefaul() não enviar o formulário, evitando o reload
        event.preventDefault();
    });

const fields = document.querySelectorAll("[required]");
console.log(fields.validity);

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;
        // FOR IN intera sobre cada elementos(propriedadescc) do objeto
        for(let error in field.validity) {
            // se nao for customError
            // então verifica se tem erro
            if(field.validity[error] && !field.validity.valid) {
                foundError = error;
            }
        }

        return foundError;
    }

    // console.log(field)

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing:"Nome é obrigatório",
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido",
            },
            password: {
                valueMissing: "Por favor, preencha este campo"
            },
        }

        return messages[field.type][typeError];
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error");
         
        if(message){
            // classList adiciona class active ao span
            spanError.classList.add("active");
            // innerHTML adiciona texto interno no span
            spanError.innerHTML = message;
        }else{
            // classList remove class active do span
            spanError.classList.remove("active");
            // Limpar texto interno
            spanError.innerHTML = "";
        }
        
    }

    return function() {

        const error = verifyErrors();

        if(error){
            const message = customMessage(error);

            field.style.borderColor = "red";
            setCustomMessage(message);
        }else {
            field.style.borderColor = "green";
            setCustomMessage();
        }
    };
}

function customValidate(event){
    const field = event.target
    const validation = ValidateField(field);

    validation();
}

for(let field of fields) {
  field.addEventListener("invalid", event => {
      // eliminar bubble
      event.preventDefault();
      customValidate(event);
  });
  field.addEventListener("blur", customValidate);
}
