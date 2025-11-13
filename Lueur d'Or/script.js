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

    // Lógica para os ícones de Favorito (mantida para a página index.html)
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

    // --- Lógica para o FAQ (Perguntas Frequentes) (mantida para a página faq.html) ---
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


    // --- Lógica para o Carrossel do Banner ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselContainer = document.querySelector('.hero-carousel'); // Container para hover

    let currentSlide = 0;
    let autoPlayInterval;
    const intervalTime = 5000; // Tempo em milissegundos para troca automática (5 segundos)

    function showSlide(index) {
        // Garante que o index esteja dentro dos limites
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        // Remove 'active' de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Adiciona 'active' ao slide e dot atual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        stopAutoPlay(); // Limpa qualquer intervalo anterior
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event Listeners para botões de navegação
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay(); // Reinicia o autoplay após navegação manual
        });

        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay(); // Reinicia o autoplay após navegação manual
        });
    }

    // Event Listeners para os dots
    if (dots) {
        dots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                stopAutoPlay();
                const index = parseInt(event.target.dataset.slideIndex);
                currentSlide = index;
                showSlide(currentSlide);
                startAutoPlay(); // Reinicia o autoplay após navegação manual
            });
        });
    }

    // Pausar/Retomar autoplay ao passar o mouse (melhora UX)
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Inicializa o carrossel
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoPlay();
    }
});