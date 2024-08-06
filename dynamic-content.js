document.addEventListener("DOMContentLoaded", function() {
    fetch('config.yaml')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log("YAML data:", data);
            const config = jsyaml.load(data);
            console.log("Parsed config:", config);

            // Set the title
            document.title = config.title;

            // Set content
            document.querySelector('h1').textContent = config.content.h1;
            document.querySelector('.subtitle').textContent = config.content.subtitle;

            // Set app links
            const appStoreLink = document.querySelector('.buttons a:nth-child(1)');
            appStoreLink.href = config.content.app_links.app_store.url;
            appStoreLink.querySelector('span').textContent = config.content.app_links.app_store.text;

            const googlePlayLink = document.querySelector('.buttons a:nth-child(2)');
            googlePlayLink.href = config.content.app_links.google_play.url;
            googlePlayLink.querySelector('span').textContent = config.content.app_links.google_play.text;

            // Set image src and alt
            const imgElement = document.querySelector('.mobile-frame img');
            imgElement.src = config.image.src;
            imgElement.alt = config.image.alt;

            // Set footer content
            const footerYear = new Date().getFullYear();
            document.querySelector('.footer__love').innerHTML = `&copy;${footerYear} All rights reserved &mdash; <a href="https://qloudai.app/" target="_blank">${config.footer.company_name}</a> | Reach Us - <a href="mailto:${config.footer.support_email}" target="_blank">${config.footer.support_email_display}</a>`;

            document.querySelector('.footer__link a[href="privacy"]').href = config.footer.privacy_link;
            document.querySelector('.footer__link a[href="terms"]').href = config.footer.terms_link;
        })
        .catch(error => {
            console.error("Error loading YAML:", error);
            document.querySelector('h1').textContent = "Error loading content";
        });
});
