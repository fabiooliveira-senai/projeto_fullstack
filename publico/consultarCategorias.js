fetch('/categorias')
.then(resposta => resposta.json())
.then(dados => {
    let fk_id_categoria = document.getElementById('fk_id_categoria')
    let fk_id_categoria2 = document.getElementById('fk_id_categoria2')

    dados.forEach(item =>{
        fk_id_categoria.innerHTML += `
            <option value='${item.id_categoria}'>${item.nome_categoria}</option>
        `
    })
    dados.forEach(item =>{
        fk_id_categoria2.innerHTML += `
            <option value='${item.id_categoria}'>${item.nome_categoria}</option>
        `
    })

})
.catch(erro => alert("Falha ao listar categorias!"+erro))