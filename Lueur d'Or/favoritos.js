document.addEventListener('DOMContentLoaded', () => {
    const produtosFavoritosContainer = document.querySelector('.produtos-favoritos');
    const itensFavoritosValor = document.getElementById('itens-favoritos-valor');
    const taxaEntregaFavoritos = document.getElementById('taxa-entrega-favoritos');
    const subtotalFavoritosValor = document.getElementById('subtotal-favoritos-valor');

    // Taxa de entrega fixa para o exemplo.
    const TAXA_ENTREGA = parseFloat(taxaEntregaFavoritos.textContent.replace('$', '').replace(',', '.')) || 0.00;

    // Função para formatar números como moeda brasileira (ex: $ 123,45)
    function formatCurrency(value) {
        return `$ ${value.toFixed(2).replace('.', ',')}`;
    }

    // Função para atualizar o resumo do rodapé
    function updateFavoritosSummary() {
        let totalFavoritos = 0;
        const produtosAtivos = produtosFavoritosContainer.querySelectorAll('.produto-favorito');

        produtosAtivos.forEach(produto => {
            const precoBase = parseFloat(produto.dataset.price);
            totalFavoritos += precoBase;
        });

        const subtotal = totalFavoritos + TAXA_ENTREGA;

        itensFavoritosValor.textContent = formatCurrency(totalFavoritos);
        subtotalFavoritosValor.textContent = formatCurrency(subtotal);
    }

    // Adiciona event listeners para remover itens favoritos
    produtosFavoritosContainer.querySelectorAll('.remover-favorito').forEach(button => {
        button.addEventListener('click', (event) => {
            const produtoParaRemover = event.target.closest('.produto-favorito');
            if (produtoParaRemover) {
                produtoParaRemover.remove();
                updateFavoritosSummary(); // Recalcula o resumo após remover um item
                // Em uma aplicação real, você também removeria este item do backend/localStorage
                console.log('Produto removido dos favoritos.');
            }
        });
    });

    // Lógica para o botão "Adicionar Todos ao Carrinho"
    const addTodosCarrinhoBtn = document.querySelector('.add-todos-carrinho');
    if (addTodosCarrinhoBtn) {
        addTodosCarrinhoBtn.addEventListener('click', () => {
            alert('Todos os itens favoritos foram adicionados ao carrinho! (Funcionalidade a ser implementada)');
            // Aqui você faria a lógica para adicionar todos os itens ativos ao carrinho,
            // talvez iterando novamente pelos .produto-favorito
        });
    }

    // Atualiza o resumo dos favoritos na carga inicial da página
    updateFavoritosSummary();
});