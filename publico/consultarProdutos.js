fetch('/produtos')
.then(res => res.json())
.then(dados =>{
    let listaProdutos = document.getElementById("listaProdutos")
    dados.forEach(item =>{
        listaProdutos.innerHTML += `
        <div class='cartoes'>
            <h5>${item.nome_produto}</h5>
            <p>Cód: ${item.id_produto}</p>
            <p>Preço: R$ ${item.preco}</p>
            <p>Estoque: ${item.estoque}</p>
            <p>Categoria: ${item.nome_categoria}</p>
            <button onClick='editarProduto(${item.id_produto})'>✏️Editar</button>
            <button onClick='deletarProduto(${item.id_produto})'>🗑️Deletar</button>
        </div>
        `
    })
})
.catch(erro => alert("Falha ao consultar os produtos! "+erro))
