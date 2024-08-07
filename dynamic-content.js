// Function to load YAML file
async function loadYamlFile(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const yamlText = await response.text();
        return jsyaml.load(yamlText);
    } catch (error) {
        console.error("Error loading YAML:", error);
        throw error;
    }
}

// Function to populate content
function populateContent(config) {
    // Set the title and meta description
    document.title = config.title;
    document.querySelector('meta[name="description"]').setAttribute('content', `Download ${config.title} - Your AI-powered captioning assistant`);

    // Set content
    document.querySelector('h1').textContent = config.content.h1;
    document.querySelector('.subtitle').textContent = config.content.subtitle;

    // Set app links
    const appStoreLink = document.querySelector('.button.app-store');
    appStoreLink.href = config.content.app_links.app_store.url;
    appStoreLink.querySelector('span').textContent = config.content.app_links.app_store.text;

    const googlePlayLink = document.querySelector('.button.google-play');
    googlePlayLink.href = config.content.app_links.google_play.url;
    googlePlayLink.querySelector('span').textContent = config.content.app_links.google_play.text;

    // Set image src and alt
    const imgElement = document.querySelector('.mobile-frame img');
    imgElement.src = config.image.src;
    imgElement.alt = config.image.alt;

    // Set footer content
    const footerLove = document.querySelector('.footer__love');
    footerLove.innerHTML = `&copy;${config.footer.year} All rights reserved &mdash; <a href="https://qloudai.app/" target="_blank">${config.footer.company_name}</a> | Reach Us - <a href="mailto:${config.footer.support_email}" target="_blank">${config.footer.support_email_display}</a>`;

    document.querySelector('.footer__links a[href="privacy"]').href = config.footer.privacy_link;
    document.querySelector('.footer__links a[href="terms"]').href = config.footer.terms_link;
}

// Function to show loading indicator
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingOverlay);
}

// Function to hide loading indicator
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Load YAML and populate content when the page loads
window.onload = async function() {
    showLoading();
    try {
        const config = await loadYamlFile('config.yaml');
        populateContent(config);
    } catch (error) {
        console.error("Error loading or populating content:", error);
        document.querySelector('h1').textContent = "Error loading content";
        document.querySelector('.subtitle').textContent = "Please try again later.";
    } finally {
        hideLoading();
    }
};
