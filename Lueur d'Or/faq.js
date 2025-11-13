document.addEventListener('DOMContentLoaded', () => {
    // Lógica para o Menu Hambúrguer
    const hamburgerMenu = document.getElementById('hamburgerMenuMobile');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Adiciona/remove a classe 'active' para animar o hambúrguer
        });
    }

    // Lógica para os ícones de Favorito
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('active'); // Alterna a classe para mudar a cor do coração
            icon.classList.toggle('far'); // Coração de contorno
            icon.classList.toggle('fas'); // Coração sólido
            
            const productId = icon.dataset.productId;
            if (icon.classList.contains('active')) {
                console.log(`Produto ${productId} adicionado aos favoritos.`);
            } else {
                console.log(`Produto ${productId} removido dos favoritos.`);
            }
        });
    });

    // --- Lógica para o FAQ (Perguntas Frequentes) ---
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling; // O próximo elemento é a div da resposta

            // Fecha outras perguntas abertas (opcional, mas comum em accordions)
            document.querySelectorAll('.faq-question').forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.classList.remove('active');
                    otherButton.nextElementSibling.style.maxHeight = null; // Reseta a altura para esconder
                }
            });

            // Alterna a classe 'active' no botão da pergunta
            button.classList.toggle('active');
            // Alterna a classe 'active' na resposta
            answer.classList.toggle('active');

            // Ajusta a altura da resposta para animar o abrir/fechar
            if (answer.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px'; // Define a altura máxima para o conteúdo total
            } else {
                answer.style.maxHeight = null; // Reseta para 0 para esconder
            }
        });
    });
});