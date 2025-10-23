function editarProduto(id_produto){
    document.getElementById('modalEditar').style.display = 'flex';
    let formEditar = document.getElementById('formEditar');

    let selecionado = todosProdutos.filter(item => item.id_produto == id_produto)
    formEditar.querySelector('input[name=preco]').value = selecionado[0].preco
    formEditar.querySelector('input[name=estoque]').value = selecionado[0].estoque
    formEditar.querySelector('select[name=fk_id_categoria]').value =  selecionado[0].fk_id_categoria
    formEditar.querySelector('input[name=nome_produto]').value = selecionado[0].nome_produto
    formEditar.querySelector('input[name=id_produto]').value = id_produto
    formEditar.querySelector('input[name=id_produto]').style.display = 'none'
}