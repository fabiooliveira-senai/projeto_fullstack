fetch('/categorias')
.then(resposta => resposta.json())
.then(dados => {
    let fk_id_categoria = document.getElementById('fk_id_categoria')
    dados.forEach(item =>{
        fk_id_categoria.innerHTML += `
            <option value='${item.id_categoria}'>${item.nome_categoria}</option>
        `
    })
})
.catch(erro => alert("Falha ao listar categorias!"+erro))