document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters to check for free content before gating
    const urlParams = new URLSearchParams(window.location.search);
    const seasonId = urlParams.get('season');

    // --- Data for all seasons ---
    // IMPORTANT: Replace these paths with the actual paths to your video and thumbnail files.
    // With Vimeo, each video has a unique link. The concept of a 'videoBaseUrl' is no longer needed.
    // You will get these links from your Vimeo account under each video's Distribution settings.
    // const videoBaseUrl = '...'; // This is no longer used.

    const seasonsData = {
        '1': {
            title: "Season 1",
            episodeCount: 12,
            description: "A genius boy, Xiao Yan, suddenly loses all his powers. In a world governed by strength and respect, his fall from grace makes him a target of scorn. With the help of a mysterious spirit in his ring, he begins a journey to reclaim his glory.",
            vas: "Xiao Yan:Rohan Sharma,Yao Lao:Vikram Kumar",
            episodes: Array.from({ length: 12 }, (_, i) => ({
                title: `Episode ${i + 1}`,
                src: `https://player.vimeo.com/external/123456789.m3u8?s=your_unique_hash_here`, // <-- PASTE HLS LINK HERE
                downloadSources: [
                    { quality: '720p', size: '180 MB', src: `https://player.vimeo.com/progressive_redirect/download/123456789/720p?s=your_unique_hash_here` }, // <-- PASTE 720p DOWNLOAD LINK
                    { quality: '480p', size: '90 MB', src: `https://player.vimeo.com/progressive_redirect/download/123456789/480p?s=your_unique_hash_here` }  // <-- PASTE 480p DOWNLOAD LINK
                ]
            }))
        },
        '2': {
            title: "Season 2",
            episodeCount: 12,
            description: "After leaving his clan, Xiao Yan travels to the Jia Ma Empire to enroll in the prestigious Jia Nan Academy. He hones his skills, makes new allies, and continues his quest for the powerful Heavenly Flames.",
            vas: "Xiao Yan:Rohan Sharma,Xiao Xun'er:Priya Singh",
            episodes: Array.from({ length: 12 }, (_, i) => ({
                title: `Episode ${i + 1}`,
                src: `https://player.vimeo.com/external/YOUR_UNIQUE_ID_s2_e${i + 1}.m3u8?s=...`, // <-- REPLACE
                downloadSources: [
                    { quality: '720p', size: '180 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s2_e${i + 1}/720p?s=...` }, // <-- REPLACE
                    { quality: '480p', size: '90 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s2_e${i + 1}/480p?s=...` }  // <-- REPLACE
                ]
            }))
        },
        '3': {
            title: "Season 3",
            episodeCount: 12,
            description: "To find the Heavenly Flame, Xiao Yan ventures into the treacherous Tagor Desert, where he confronts the formidable Queen Medusa and her snake-people tribe.",
            vas: "Xiao Yan:Rohan Sharma,Queen Medusa:Anjali Mehta,Yao Lao:Vikram Kumar",
            episodes: Array.from({ length: 12 }, (_, i) => ({
                title: `Episode ${i + 1}`,
                src: `https://player.vimeo.com/external/YOUR_UNIQUE_ID_s3_e${i + 1}.m3u8?s=...`, // <-- REPLACE
                downloadSources: [
                    { quality: '720p', size: '180 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s3_e${i + 1}/720p?s=...` }, // <-- REPLACE
                    { quality: '480p', size: '90 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s3_e${i + 1}/480p?s=...` }  // <-- REPLACE
                ]
            }))
        },
        '4': {
            title: "Season 4",
            episodeCount: 24,
            description: "Three years have passed. Xiao Yan returns to the Jia Ma Empire, now a powerful alchemist, to fulfill his promise and challenge Nalan Yanran of the Misty Cloud Sect.",
            vas: "Xiao Yan:Rohan Sharma,Xiao Xun'er:Priya Singh",
            episodes: Array.from({ length: 24 }, (_, i) => ({
                title: `Episode ${i + 1}`,
                src: `https://player.vimeo.com/external/YOUR_UNIQUE_ID_s4_e${i + 1}.m3u8?s=...`, // <-- REPLACE
                downloadSources: [
                    { quality: '720p', size: '180 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s4_e${i + 1}/720p?s=...` }, // <-- REPLACE
                    { quality: '480p', size: '90 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s4_e${i + 1}/480p?s=...` }  // <-- REPLACE
                ]
            }))
        },
        '5': {
            title: "Season 5",
            episodeCount: 52,
            description: "The epic conclusion of the Three-Year Agreement arc. Xiao Yan faces the full might of the Misty Cloud Sect, leading to an earth-shattering battle for honor and revenge.",
            vas: "Xiao Yan:Rohan Sharma,Queen Medusa:Anjali Mehta,Yao Lao:Vikram Kumar",
            episodes: Array.from({ length: 52 }, (_, i) => ({
                title: `Episode ${i + 1}`,
                src: `https://player.vimeo.com/external/YOUR_UNIQUE_ID_s5_e${i + 1}.m3u8?s=...`, // <-- REPLACE
                downloadSources: [
                    { quality: '720p', size: '180 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s5_e${i + 1}/720p?s=...` }, // <-- REPLACE
                    { quality: '480p', size: '90 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_s5_e${i + 1}/480p?s=...` }  // <-- REPLACE
                ]
            }))
        }
    };

    const specialsData = {
        '1': {
            title: "Song of Desert",
            description: "This special focuses on the story of Queen Medusa, her tribe in the Tagor Desert, and her fateful encounter with Xiao Yan.",
            vas: "Queen Medusa:Anjali Mehta,Xiao Yan:Rohan Sharma",
            episodes: [{
                title: 'Song of Desert',
                src: `https://player.vimeo.com/external/YOUR_UNIQUE_ID_special_1.m3u8?s=...`, // <-- REPLACE
                downloadSources: [
                    { quality: '1080p', size: '1.5 GB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_special_1/1080p?s=...` }, // <-- REPLACE
                    { quality: '720p', size: '750 MB', src: `https://player.vimeo.com/progressive_redirect/download/YOUR_UNIQUE_ID_special_1/720p?s=...` }  // <-- REPLACE
                ]
            }]
        },
        '2': {
            title: "Yun Yun Special",
            description: "A special episode exploring the complex relationship and shared moments between Xiao Yan and Yun Yun, the leader of the Misty Cloud Sect.",
            vas: "Xiao Yan:Rohan Sharma,Yun Yun:Pooja Sharma", // Example VA
            episodes: [{
                title: 'Yun Yun Special',
                src: `https://player.vimeo.com/external/904020795.m3u8?s=2a5a6f1a8b1b9c1c0d0e0f0a0b0c0d0e0f0a0b0c`,
                downloadSources: [
                    { quality: '1080p', size: '800 MB', src: `https://player.vimeo.com/progressive_redirect/download/904020795/1080p?s=2a5a6f1a8b1b9c1c0d0e0f0a0b0c0d0e0f0a0b0c` },
                    { quality: '720p', size: '400 MB', src: `https://player.vimeo.com/progressive_redirect/download/904020795/720p?s=2a5a6f1a8b1b9c1c0d0e0f0a0b0c0d0e0f0a0b0c` }
                ]
            }]
        }
    };

    // --- Get elements from the DOM ---
    const videoElement = document.getElementById('player-video-element');
    const titleElement = document.getElementById('player-title');
    const descriptionElement = document.getElementById('player-description');
    const episodeListElement = document.getElementById('episode-list');
    const pageTitle = document.querySelector('title');
    const downloadModal = document.getElementById('download-modal');
    const downloadOptionsList = document.getElementById('download-options-list');

    // --- Define content variables (URL params already parsed at the top) ---
    const specialId = urlParams.get('special');
    const isSpecial = !!specialId;
    const contentId = isSpecial ? specialId : seasonId;
    const dataSource = isSpecial ? specialsData : seasonsData;
    const seasonData = dataSource[contentId];
    const progressPrefix = isSpecial ? 'special_' : 'season_';
    
    // --- Functions ---
    function getProgress() {
        try {
            const progress = localStorage.getItem('btthProgress');
            return progress ? JSON.parse(progress) : {};
        } catch (e) {
            console.warn("Could not access localStorage. Progress will not be saved.", e);
            return {};
        }
    }

    function saveProgress(id, episodeIndex) {
        try {
            const progress = getProgress();
            const key = progressPrefix + id;
            if (!progress[key]) {
                progress[key] = [];
            }
            if (!progress[key].includes(episodeIndex)) {
                progress[key].push(episodeIndex);
            }
            localStorage.setItem('btthProgress', JSON.stringify(progress));
        } catch (e) {
            console.warn("Could not access localStorage. Progress could not be saved.", e);
        }
    }

    function removeProgress(id, episodeIndex) {
        try {
            const progress = getProgress();
            const key = progressPrefix + id;
            if (progress[key] && progress[key].includes(episodeIndex)) {
                progress[key] = progress[key].filter(index => index !== episodeIndex);
                if (progress[key].length === 0) {
                    delete progress[key];
                }
                localStorage.setItem('btthProgress', JSON.stringify(progress));
            }
        } catch (e) {
            console.warn("Could not access localStorage. Progress could not be updated.", e);
        }
    }

    function getLastPlayed() {
        try {
            const lastPlayed = localStorage.getItem('btthLastPlayed');
            return lastPlayed ? JSON.parse(lastPlayed) : {};
        } catch (e) {
            console.warn("Could not access localStorage. Last played episode will not be loaded.", e);
            return {};
        }
    }

    function saveLastPlayed(id, episodeIndex) {
        try {
            const lastPlayed = getLastPlayed();
            const key = progressPrefix + id;
            lastPlayed[key] = episodeIndex;
            localStorage.setItem('btthLastPlayed', JSON.stringify(lastPlayed));
        } catch (e) {
            console.warn("Could not access localStorage. Last played episode could not be saved.", e);
        }
    }

    function updateUI(id, seasonData) {
        // Populate static details
        pageTitle.textContent = `Watch ${seasonData.title} | RJ Dubbers`;
        descriptionElement.textContent = seasonData.description;

        // Populate VAs
        const vaContainer = document.querySelector('.player-vas');
        if (vaContainer && seasonData.vas) {
            const vas = seasonData.vas.split(',');
            const vaListHTML = vas.map(va => {
                const parts = va.split(':');
                if (parts.length < 2) return ''; // Skip malformed entries
                const character = parts[0].trim();
                const actor = parts[1].trim();
                return `<li><strong>${character}:</strong> ${actor}</li>`;
            }).join('');

            vaContainer.innerHTML = vaListHTML
                ? `<h3>Key Voice Actors</h3><ul id="player-va-list">${vaListHTML}</ul>`
                : '';
        }

        // Populate Episodes
        episodeListElement.innerHTML = '';
        if (seasonData.episodes && seasonData.episodes.length > 0) {
            const progressKey = progressPrefix + id;
            const progress = getProgress()[progressKey] || [];
            seasonData.episodes.forEach((episode, index) => {
                const li = document.createElement('li');
                li.dataset.index = index;

                const episodeActionsHTML = `
                    <button class="episode-download-btn" title="Download Episode">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" fill="currentColor"/></svg>
                    </button>
                `;

                if (progress.includes(index)) {
                    li.classList.add('watched');
                }

                li.innerHTML = `
                    <div class="episode-info-wrapper">
                        <span class="watched-indicator" title="Mark as unwatched">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"/></svg>
                        </span>
                        <span class="episode-title">${episode.title}</span>
                    </div>
                    <div class="episode-actions">
                        ${episodeActionsHTML}
                    </div>
                `;

                episodeListElement.appendChild(li);
            });
        } else {
            episodeListElement.innerHTML = '<li>Episodes coming soon...</li>';
        }
    }

    function playEpisode(element, id, index, shouldSave = true) {
        if (!element) {
            console.error("playEpisode was called without a valid element.");
            return;
        }
        const episodeData = dataSource[id].episodes[index];
        if (!episodeData || !episodeData.src) {
            console.error("No video sources found for this episode.");
            return;
        }

        // Update video player source
        videoElement.src = episodeData.src;
        videoElement.load(); // Load the new source
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented. This is normal browser behavior.
                // The user will have to click the play button on the controls.
                console.log("Autoplay was prevented:", error);
            });
        }

        // Update title under video
        titleElement.textContent = episodeData.title;

        // Save this as the last played episode, regardless of whether it was user-initiated
        saveLastPlayed(id, index);

        // Update styles
        document.querySelectorAll('#episode-list li').forEach(li => li.classList.remove('playing'));
        element.classList.add('playing');

        // Scroll the playing item into view
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Save progress
        if (shouldSave) {
            saveProgress(id, index);
            element.classList.add('watched');
        }
    }

    videoElement.addEventListener('ended', () => {
        const currentPlaying = document.querySelector('#episode-list li.playing');
        if (currentPlaying) {
            const nextEpisodeElement = currentPlaying.nextElementSibling;
            // Check if the next element is a valid episode item
            if (nextEpisodeElement && nextEpisodeElement.dataset.index) {
                const nextIndex = parseInt(nextEpisodeElement.dataset.index, 10);
                if (!isNaN(nextIndex)) {
                    // The contentId is available in the outer scope, play the next episode
                    playEpisode(nextEpisodeElement, contentId, nextIndex);
                }
            }
        }
    });

    // --- Download Modal Logic ---
    function openDownloadModal(episodeIndex) {
        const episode = seasonData.episodes[episodeIndex];
        if (!episode || !episode.downloadSources) return;

        downloadOptionsList.innerHTML = ''; // Clear previous options

        episode.downloadSources.forEach(source => {
            const link = document.createElement('a');
            link.href = source.src;
            link.download = true; // This attribute triggers the download
            link.innerHTML = ` 
                <span class="quality-label">${source.quality}</span>
                <span class="size-label">${source.size}</span>
            `;
            downloadOptionsList.appendChild(link);
        });

        showModal('download-modal');
    }

    // Centralized event listener for the episode list
    episodeListElement.addEventListener('click', (e) => {
        const li = e.target.closest('li[data-index]');
        if (!li) return;

        const episodeIndex = parseInt(li.dataset.index, 10);
        if (isNaN(episodeIndex)) return;

        // Check if the watched indicator was clicked to toggle it off
        if (e.target.closest('.watched-indicator')) {
            removeProgress(contentId, episodeIndex);
            li.classList.remove('watched');
        }
        // Check if the download button was clicked
        else if (e.target.closest('.episode-download-btn')) {
            openDownloadModal(episodeIndex);
        }
        // Otherwise, the click is to play the episode
        else {
            playEpisode(li, contentId, episodeIndex);
        }
    });

    // --- Modal Management (for Download Modal) ---
    function showModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    }

    function hideModals() {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', hideModals);
    });
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModals();
        });
    });

    // --- Initial Page Load ---
    function initializePlayer() {
        // 1. Handle case where content ID is missing
        if (!seasonData || !videoElement) {
            handleContentNotFound();
            return;
        }
        updateUI(contentId, seasonData);

        if (seasonData.episodes && seasonData.episodes.length > 0) {
            const lastPlayed = getLastPlayed();
            const lastPlayedKey = progressPrefix + contentId;
            let episodeToLoadIndex = 0; // Default to the first episode
            if (lastPlayed[lastPlayedKey] !== undefined) {
                const savedIndex = lastPlayed[lastPlayedKey];
                // Ensure the saved index is valid for the current content
                if (savedIndex >= 0 && savedIndex < seasonData.episodes.length) {
                    episodeToLoadIndex = savedIndex;
                }
            }

            const episodeElementToLoad = episodeListElement.querySelector(`li[data-index="${episodeToLoadIndex}"]`);
            if (episodeElementToLoad) {
                playEpisode(episodeElementToLoad, contentId, episodeToLoadIndex, false);
            }
        }
    }

    function handleContentNotFound() {
        if (titleElement) titleElement.textContent = "Content Not Found";
        if (descriptionElement) {
            const detailsWrapper = descriptionElement.parentElement;
            detailsWrapper.innerHTML = `
                <p style="font-size: 1.1rem; color: var(--text-muted);">The content you're looking for could not be loaded. This usually happens if you access this page directly without selecting a season or special.</p>
                <p style="margin-bottom: 30px;">Please return to the homepage to make a selection.</p>
                <a href="index.html" class="watch-button" style="text-decoration: none;">Go to Homepage</a>
            `;
            detailsWrapper.style.textAlign = 'center';
            detailsWrapper.style.padding = '20px 0';
        }

        // Hide irrelevant UI elements for a cleaner error page
        const videoWrapper = document.querySelector('.player-video-wrapper');
        const infoPanel = document.querySelector('.player-info-panel');

        if (videoWrapper) videoWrapper.style.display = 'none';
        if (infoPanel) infoPanel.style.display = 'none';
    }

    initializePlayer();
});
