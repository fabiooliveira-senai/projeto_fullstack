function deletarProduto(id_produto){
    if(!confirm('Tem certeza que deseja apagar o produto código nº '+id_produto+'?')){
        return
    }
    fetch('/produtos',{
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_produto})
    })
    .then(resposta => {alert("Deletado com sucesso!");
                       window.location.href = '/privado/area.html'
                      })
    .catch(erro => alert("Falhar no DELETE /produto"+erro))
}