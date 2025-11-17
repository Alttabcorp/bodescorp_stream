/**
 * Script para buscar e exibir dados do campeão Ornn
 * Adaptado do projeto WEB-esports-alttab
 */

const API_BASE = 'https://ddragon.leagueoflegends.com/cdn';
const LANG = 'pt_BR';
let currentVersion = '15.19.1';

/**
 * Obter versão mais recente do Data Dragon
 */
async function getLatestVersion() {
    try {
        const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await res.json();
        return versions[0];
    } catch (error) {
        console.warn('Erro ao buscar versão mais recente, usando padrão:', currentVersion);
        return currentVersion;
    }
}

/**
 * Obter detalhes completos de um campeão
 */
async function getChampionDetails(version, champId) {
    const url = `${API_BASE}/${version}/data/${LANG}/champion/${champId}.json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data[champId];
}

/**
 * Formatar descrição da habilidade
 */
function formatAbilityDescription(description) {
    if (!description) return 'Informações não disponíveis';
    
    // Substituir variáveis no formato {{ variableName }}
    return description.replace(/\{\{(.*?)\}\}/g, (match, variable) => {
        return '<span class="ability-value">' + variable + '</span>';
    });
}

/**
 * Construir HTML das habilidades
 */
function buildAbilitiesHTML(championData) {
    let html = '<div class="champion-abilities">';
    
    // Passiva
    if (championData.passive) {
        const imageUrl = `${API_BASE}/${currentVersion}/img/passive/${championData.passive.image.full}`;
        html += `
            <div class="ability-passive">
                <div class="ability-header">
                    <div class="ability-icon">
                        <img src="${imageUrl}" alt="${championData.passive.name}" loading="lazy">
                        <span class="ability-key">P</span>
                    </div>
                    <div class="ability-info">
                        <h4 class="ability-name">${championData.passive.name}</h4>
                        <p class="ability-description">${championData.passive.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Habilidades Q, W, E, R
    if (championData.spells) {
        html += '<div class="champion-spells">';
        championData.spells.forEach((spell, index) => {
            const spellKey = ['Q', 'W', 'E', 'R'][index];
            const imageUrl = `${API_BASE}/${currentVersion}/img/spell/${spell.image.full}`;
            const description = formatAbilityDescription(spell.description || spell.tooltip || 'Informações não disponíveis');
            
            const cooldown = spell.cooldownBurn || (spell.cooldown ? spell.cooldown.join('/') : 'N/A');
            const cost = spell.costBurn || (spell.cost ? spell.cost.join('/') : '0');
            const costType = spell.costType || spell.resource || 'Mana';
            
            html += `
                <div class="ability-spell" data-spell="${spellKey.toLowerCase()}">
                    <div class="ability-header">
                        <div class="ability-icon">
                            <img src="${imageUrl}" alt="${spell.name}" loading="lazy">
                            <span class="ability-key">${spellKey}</span>
                        </div>
                        <div class="ability-info">
                            <div class="ability-title">
                                <h4 class="ability-name">${spell.name}</h4>
                            </div>
                            <div class="ability-stats">
                                ${cooldown !== 'N/A' ? `<span class="ability-cooldown"><i class="fas fa-clock"></i> ${cooldown}s</span>` : ''}
                                ${cost !== '0' ? `<span class="ability-cost"><i class="fas fa-tint"></i> ${cost} ${costType}</span>` : ''}
                            </div>
                            <p class="ability-description">${description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    html += '</div>';
    return html;
}

/**
 * Construir HTML das estatísticas
 */
function buildStatsHTML(stats) {
    const statLabels = {
        hp: 'Vida',
        hpperlevel: 'Vida por nível',
        mp: 'Mana',
        mpperlevel: 'Mana por nível',
        movespeed: 'Velocidade de Movimento',
        armor: 'Armadura',
        armorperlevel: 'Armadura por nível',
        spellblock: 'Resistência Mágica',
        spellblockperlevel: 'Resistência Mágica por nível',
        attackrange: 'Alcance de Ataque',
        hpregen: 'Regeneração de Vida',
        hpregenperlevel: 'Regeneração de Vida por nível',
        mpregen: 'Regeneração de Mana',
        mpregenperlevel: 'Regeneração de Mana por nível',
        crit: 'Crítico',
        critperlevel: 'Crítico por nível',
        attackdamage: 'Dano de Ataque',
        attackdamageperlevel: 'Dano de Ataque por nível',
        attackspeedperlevel: 'Velocidade de Ataque por nível',
        attackspeed: 'Velocidade de Ataque'
    };

    let html = '<div class="stats-grid">';
    for (const [key, value] of Object.entries(stats)) {
        const label = statLabels[key] || key;
        html += `
            <div class="stat-item">
                <span class="stat-label">${label}:</span>
                <span class="stat-value">${value}</span>
            </div>
        `;
    }
    html += '</div>';
    return html;
}

/**
 * Construir HTML das skins
 */
function buildSkinsHTML(skins) {
    if (!skins || skins.length === 0) return '<p>Nenhuma skin disponível.</p>';

    let html = '<div class="skins-grid">';
    skins.forEach(skin => {
        const skinImageUrl = `${API_BASE}/img/champion/splash/Ornn_${skin.num}.jpg`;
        const loadingImageUrl = `${API_BASE}/img/champion/loading/Ornn_${skin.num}.jpg`;
        
        html += `
            <div class="skin-item">
                <div class="skin-images">
                    <img src="${skinImageUrl}" alt="${skin.name}" class="skin-splash" loading="lazy">
                    <img src="${loadingImageUrl}" alt="${skin.name} loading" class="skin-loading" loading="lazy">
                </div>
                <h4 class="skin-name">${skin.name}</h4>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

/**
 * Construir HTML moderno das skins para galeria
 */
function buildModernSkinsHTML(skins) {
    if (!skins || skins.length === 0) return '<p>Nenhuma skin disponível.</p>';

    let html = '<div class="modern-skins-grid">';
    skins.forEach((skin, index) => {
        const skinImageUrl = `${API_BASE}/img/champion/splash/Ornn_${skin.num}.jpg`;
        const isClassic = skin.num === 0;
        
        html += `
            <div class="modern-skin-card ${isClassic ? 'classic-skin' : ''}" data-skin-id="${skin.num}">
                <div class="skin-image-container">
                    <img src="${skinImageUrl}" alt="${skin.name}" class="skin-main-image" loading="lazy">
                    <div class="skin-overlay">
                        <div class="skin-info">
                            <h3 class="skin-title">${skin.name}</h3>
                            ${isClassic ? '<span class="skin-badge">Clássica</span>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

/**
 * Carregar e exibir dados do Ornn
 */
async function loadOrnnData() {
    try {
        // Obter versão mais recente
        currentVersion = await getLatestVersion();

        // Buscar dados do Ornn
        const ornnData = await getChampionDetails(currentVersion, 'Ornn');

        // Exibir dados na página
        displayOrnnInfo(ornnData);

    } catch (error) {
        console.error('Erro ao carregar dados do Ornn:', error);
        document.getElementById('ornn-info').innerHTML = '<p>Erro ao carregar dados do campeão.</p>';
    }
}

/**
 * Exibir informações do Ornn na página
 */
function displayOrnnInfo(championData) {
    const container = document.getElementById('ornn-info');
    if (!container) return;

    const imageUrl = `${API_BASE}/${currentVersion}/img/champion/${championData.image.full}`;

    container.innerHTML = `
        <div class="ornn-card">
            <div class="ornn-portrait">
                <img src="${imageUrl}" alt="${championData.name}" onerror="this.src='placeholder.png';">
            </div>
            <div class="ornn-details">
                <h2>${championData.name}</h2>
                <p class="ornn-title">${championData.title}</p>
                <div class="ornn-tags">
                    ${(championData.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p class="ornn-resource"><strong>Recurso:</strong> ${championData.partype}</p>
                <div class="ornn-info">
                    <div class="info-item">
                        <span class="info-label">Ataque:</span>
                        <span class="info-value">${championData.info.attack}/10</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Defesa:</span>
                        <span class="info-value">${championData.info.defense}/10</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Magia:</span>
                        <span class="info-value">${championData.info.magic}/10</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dificuldade:</span>
                        <span class="info-value">${championData.info.difficulty}/10</span>
                    </div>
                </div>
                <p class="ornn-lore">${championData.lore}</p>
            </div>
        </div>
        
        <div class="ornn-stats">
            <h3>Estatísticas Base</h3>
            ${buildStatsHTML(championData.stats)}
        </div>
        
        <div class="ornn-abilities">
            <h3>Habilidades</h3>
            ${buildAbilitiesHTML(championData)}
        </div>
        
        <div class="ornn-skins">
            <h3>Skins Disponíveis</h3>
            ${buildSkinsHTML(championData.skins)}
        </div>
        
        <div class="ornn-tips">
            <div class="tips-section">
                <h4>Dicas para Aliados</h4>
                <ul>
                    ${(championData.allytips || []).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            <div class="tips-section">
                <h4>Dicas para Inimigos</h4>
                <ul>
                    ${(championData.enemytips || []).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Carregar dados quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadOrnnData);
} else {
    loadOrnnData();
}