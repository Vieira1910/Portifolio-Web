// === 1. SPOTLIGHT SEGUIDOR DE MOUSE ===
const spotlight = document.getElementById('mouse-spotlight');
if (spotlight) {
    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
    });
}

// === 2. TROCA INTERATIVA DA FOTO DE PERFIL ===
let currentPhotoIndex = 1;
function toggleProfilePhoto() {
    const img = document.getElementById('profile-img');
    const badgeText = document.getElementById('photo-badge-text');
    
    if (!img) return;

    img.style.opacity = '0';
    
    setTimeout(() => {
        if (currentPhotoIndex === 1) {
            img.src = img.getAttribute('data-photo2') || img.src;
            if (badgeText) badgeText.innerText = "Foto 2 de 2 (Clique para voltar)";
            currentPhotoIndex = 2;
        } else {
            img.src = img.getAttribute('data-photo1') || img.src;
            if (badgeText) badgeText.innerText = "Foto 1 de 2 (Clique para alternar)";
            currentPhotoIndex = 1;
        }
        img.style.opacity = '1';
    }, 200);
}

// === 3. MENU MOBILE DRAWER ===
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');

if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
    });
}

function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('hidden');
}

// === 4. FILTRAGEM DINÂMICA DE FERRAMENTAS ===
function filterTools(category) {
    const cards = document.querySelectorAll('.tool-card');
    const btns = document.querySelectorAll('.tool-filter-btn');

    btns.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.className = "tool-filter-btn min-h-[2.5rem] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black transition-all active:scale-95";
        } else {
            btn.className = "tool-filter-btn min-h-[2.5rem] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95";
        }
    });

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.opacity = '1';
            card.style.filter = 'none';
        } else {
            card.style.opacity = '0.25';
            card.style.filter = 'grayscale(100%)';
        }
    });
}

// === 5. DADOS E MODAL DE PROJETOS ===

const projectsData = {
    techland: {
        title: 'Verus Barber Studio',
        subtitle: 'Landing Page & Sistema de Barbearia',
        description: 'Uma landing page moderna desenvolvida para barbearia, focada em conversão, apresentação de serviços, tabela de preços e agendamento rápido.',
        techs: ['HTML5', 'CSS3 Grid', 'JavaScript', 'Vercel'],
        image: 'Imagens do portifólio/Verus_Barber.png',
        platform: 'github',
        github: 'https://github.com/Vieira1910/VerusBarberStudio',
        demo: 'https://verusbarberstudio.vercel.app/'
    },
    dashboard: {
        title: 'Memphis Grizzlies Fan Page',
        subtitle: 'Portal de Basquete & Fan Community',
        description: 'Interface de conteúdo dedicado ao Memphis Grizzlies, trazendo estatísticas, história, elenco e layout personalizado em dark mode.',
        techs: ['HTML5', 'CSS3 Grid', 'JavaScript ES6', 'Vercel'],
        image: 'Imagens do portifólio/Memphis_Grizzlies.png',
        platform: 'gitlab',
        gitlab: 'https://gitlab.com/vieira-group1/memphisgrizzlies/',
        demo: 'https://memphisgrizzlies.vercel.app/'
    },
    taskapp: {
        title: 'TaskFlow App',
        subtitle: 'Aplicação de Gerenciamento Pessoal',
        description: 'Aplicação web leve para organização de tarefas diárias com persistência de dados no LocalStorage do navegador, filtros por status e prioridades.',
        techs: ['JavaScript ES6+', 'CSS Variables', 'GitHub', 'GitLab'],
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        github: 'https://github.com',
        demo: 'https://vercel.com'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');
    const data = projectsData[projectId];

    if (!modal || !content || !data) return;

    // Lógica para detectar se é GitHub ou GitLab
    let repoUrl = '#';
    let repoIcon = 'fa-brands fa-git-alt';
    let repoName = 'Repositório';

    if (data.gitlab) {
        repoUrl = data.gitlab;
        repoIcon = 'fa-brands fa-gitlab text-orange-500';
        repoName = 'GitLab';
    } else if (data.github) {
        repoUrl = data.github;
        repoIcon = 'fa-brands fa-github';
        repoName = 'GitHub';
    }

    content.innerHTML = `
        <div class="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-800">
            <div>
                <h3 class="font-display text-lg sm:text-2xl font-bold text-white">${data.title}</h3>
                <p class="text-[0.6875rem] sm:text-xs text-zinc-400">${data.subtitle}</p>
            </div>
            <button onclick="closeProjectModal()" aria-label="Fechar modal" class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors active:scale-95">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>

        <div class="h-[12rem] sm:h-[15rem] rounded-xl overflow-hidden bg-zinc-950">
            <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover">
        </div>

        <div class="space-y-3 sm:space-y-4">
            <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">${data.description}</p>

            <div>
                <p class="text-[0.625rem] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Tecnologias Utilizadas</p>
                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                    ${data.techs.map(t => `<span class="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-white">${t}</span>`).join('')}
                </div>
            </div>
        </div>

        <div class="pt-3 sm:pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <a href="${data.demo}" target="_blank" rel="noopener" class="flex-1 py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs text-center hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 active:scale-95">
                <span>Ver Projeto Online</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <a href="${repoUrl}" target="_blank" rel="noopener" class="flex-1 py-3 px-4 rounded-xl bg-zinc-800 text-white font-semibold text-xs text-center hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 active:scale-95">
                <i class="${repoIcon} text-sm"></i>
                <span>Ver no ${repoName}</span>
            </a>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.add('hidden');
}

document.getElementById('project-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeProjectModal();
});
