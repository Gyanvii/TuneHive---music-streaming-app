// Spotify Clone JavaScript

// Application State
let currentUser = null;
let currentPlaylist = null;
let currentTrack = null;
let isPlaying = false;
let currentTime = 0;
let duration = 0;
let volume = 0.7;
let navigationHistory = [];
let historyIndex = -1;
let progressInterval = null;

// Sample playlist data with placeholder covers
const playlistData = {
    "Daily Mix 1": {
        cover: "pop-gradient-cover",
        genre: "Pop",
        description: "Your daily mix of pop hits",
        songs: [
            { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", duration: "4:08", cover: "pop-gradient-cover" },
            { title: "Beautiful Things", artist: "Benson Boone", duration: "3:01", cover: "pop-gradient-cover" },
            { title: "BIRDS OF A FEATHER", artist: "Billie Eilish", duration: "3:30", cover: "pop-gradient-cover" },
            { title: "Espresso", artist: "Sabrina Carpenter", duration: "2:55", cover: "pop-gradient-cover" },
            { title: "Good Luck, Babe!", artist: "Chappell Roan", duration: "3:38", cover: "pop-gradient-cover" },
            { title: "I Had Some Help", artist: "Post Malone ft. Morgan Wallen", duration: "2:58", cover: "pop-gradient-cover" },
            { title: "Please Please Please", artist: "Sabrina Carpenter", duration: "3:06", cover: "pop-gradient-cover" },
            { title: "Taste", artist: "Sabrina Carpenter", duration: "2:37", cover: "pop-gradient-cover" },
            { title: "Flowers", artist: "Miley Cyrus", duration: "3:20", cover: "pop-gradient-cover" },
            { title: "Anti-Hero", artist: "Taylor Swift", duration: "3:20", cover: "pop-gradient-cover" }
        ]
    },
    "Daily Mix 2": {
        cover: "hiphop-urban-cover",
        genre: "Hip-Hop",
        description: "Your daily mix of hip-hop and rap",
        songs: [
            { title: "Not Like Us", artist: "Kendrick Lamar", duration: "4:34", cover: "hiphop-urban-cover" },
            { title: "WAP", artist: "Cardi B ft. Megan Thee Stallion", duration: "3:07", cover: "hiphop-urban-cover" },
            { title: "God's Plan", artist: "Drake", duration: "3:19", cover: "hiphop-urban-cover" },
            { title: "SICKO MODE", artist: "Travis Scott", duration: "5:12", cover: "hiphop-urban-cover" },
            { title: "Money Trees", artist: "Kendrick Lamar", duration: "6:26", cover: "hiphop-urban-cover" },
            { title: "Life Is Good", artist: "Future ft. Drake", duration: "4:17", cover: "hiphop-urban-cover" },
            { title: "The Box", artist: "Roddy Ricch", duration: "3:16", cover: "hiphop-urban-cover" },
            { title: "Rockstar", artist: "DaBaby ft. Roddy Ricch", duration: "3:01", cover: "hiphop-urban-cover" },
            { title: "Savage", artist: "Megan Thee Stallion", duration: "4:07", cover: "hiphop-urban-cover" },
            { title: "Lucid Dreams", artist: "Juice WRLD", duration: "3:59", cover: "hiphop-urban-cover" }
        ]
    },
    "Daily Mix 3": {
        cover: "electronic-neon-cover",
        genre: "Electronic",
        description: "Your daily mix of electronic and dance music",
        songs: [
            { title: "One More Time", artist: "Daft Punk", duration: "5:20", cover: "electronic-neon-cover" },
            { title: "Titanium", artist: "David Guetta ft. Sia", duration: "4:05", cover: "electronic-neon-cover" },
            { title: "Levels", artist: "Avicii", duration: "3:18", cover: "electronic-neon-cover" },
            { title: "Bangarang", artist: "Skrillex", duration: "3:35", cover: "electronic-neon-cover" },
            { title: "Strobe", artist: "Deadmau5", duration: "10:32", cover: "electronic-neon-cover" },
            { title: "Losing It", artist: "Fisher", duration: "3:28", cover: "electronic-neon-cover" },
            { title: "Opus", artist: "Eric Prydz", duration: "8:46", cover: "electronic-neon-cover" },
            { title: "Animals", artist: "Martin Garrix", duration: "5:05", cover: "electronic-neon-cover" },
            { title: "Clarity", artist: "Zedd ft. Foxes", duration: "4:31", cover: "electronic-neon-cover" },
            { title: "Wake Me Up", artist: "Avicii", duration: "4:07", cover: "electronic-neon-cover" }
        ]
    },
    "Release Radar": {
        cover: "radar-purple-cover",
        genre: "Mixed",
        description: "Catch all the latest music from artists you follow",
        songs: [
            { title: "Flowers", artist: "Miley Cyrus", duration: "3:20", cover: "radar-purple-cover" },
            { title: "Kill Bill", artist: "SZA", duration: "2:33", cover: "radar-purple-cover" },
            { title: "Unholy", artist: "Sam Smith ft. Kim Petras", duration: "2:36", cover: "radar-purple-cover" },
            { title: "Creepin'", artist: "Metro Boomin", duration: "3:31", cover: "radar-purple-cover" },
            { title: "Vampire", artist: "Olivia Rodrigo", duration: "3:39", cover: "radar-purple-cover" },
            { title: "Paint The Town Red", artist: "Doja Cat", duration: "3:50", cover: "radar-purple-cover" },
            { title: "Cruel Summer", artist: "Taylor Swift", duration: "2:58", cover: "radar-purple-cover" },
            { title: "Bad Habit", artist: "Steve Lacy", duration: "3:51", cover: "radar-purple-cover" },
            { title: "As It Was", artist: "Harry Styles", duration: "2:47", cover: "radar-purple-cover" },
            { title: "Stay", artist: "The Kid LAROI & Justin Bieber", duration: "2:21", cover: "radar-purple-cover" }
        ]
    },
    "Discover Weekly": {
        cover: "galaxy-cosmic-cover",
        genre: "Discovery",
        description: "Your weekly mixtape of fresh music",
        songs: [
            { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "galaxy-cosmic-cover" },
            { title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", cover: "galaxy-cosmic-cover" },
            { title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "galaxy-cosmic-cover" },
            { title: "Peaches", artist: "Justin Bieber", duration: "3:18", cover: "galaxy-cosmic-cover" },
            { title: "Good as Hell", artist: "Lizzo", duration: "2:39", cover: "galaxy-cosmic-cover" },
            { title: "Sunflower", artist: "Post Malone & Swae Lee", duration: "2:38", cover: "galaxy-cosmic-cover" },
            { title: "Circles", artist: "Post Malone", duration: "3:35", cover: "galaxy-cosmic-cover" },
            { title: "Don't Start Now", artist: "Dua Lipa", duration: "3:03", cover: "galaxy-cosmic-cover" },
            { title: "Mood", artist: "24kGoldn ft. iann dior", duration: "2:20", cover: "galaxy-cosmic-cover" },
            { title: "Positions", artist: "Ariana Grande", duration: "2:52", cover: "galaxy-cosmic-cover" }
        ]
    },
    "Liked Songs": {
        cover: "heart-pink-cover",
        genre: "Mixed",
        description: "Your liked songs",
        songs: [
            { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", duration: "4:08", cover: "heart-pink-cover" },
            { title: "Not Like Us", artist: "Kendrick Lamar", duration: "4:34", cover: "heart-pink-cover" },
            { title: "One More Time", artist: "Daft Punk", duration: "5:20", cover: "heart-pink-cover" },
            { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "heart-pink-cover" },
            { title: "Till I Collapse", artist: "Eminem", duration: "4:57", cover: "heart-pink-cover" },
            { title: "Stay", artist: "Rihanna", duration: "4:09", cover: "heart-pink-cover" }
        ]
    },
    "Workout Hits": {
        cover: "energy-orange-cover",
        genre: "Workout",
        description: "High-energy tracks to power your workout",
        songs: [
            { title: "Till I Collapse", artist: "Eminem", duration: "4:57", cover: "energy-orange-cover" },
            { title: "Stronger", artist: "Kanye West", duration: "5:11", cover: "energy-orange-cover" },
            { title: "Can't Hold Us", artist: "Macklemore", duration: "4:18", cover: "energy-orange-cover" },
            { title: "Thunder", artist: "Imagine Dragons", duration: "3:07", cover: "energy-orange-cover" },
            { title: "Pump It", artist: "Black Eyed Peas", duration: "3:33", cover: "energy-orange-cover" },
            { title: "Eye of the Tiger", artist: "Survivor", duration: "4:04", cover: "energy-orange-cover" },
            { title: "Lose Yourself", artist: "Eminem", duration: "5:26", cover: "energy-orange-cover" },
            { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", cover: "energy-orange-cover" },
            { title: "Confident", artist: "Demi Lovato", duration: "3:27", cover: "energy-orange-cover" },
            { title: "Work Out", artist: "J. Cole", duration: "3:54", cover: "energy-orange-cover" }
        ]
    },
    "Chill Vibes": {
        cover: "chill-blue-cover",
        genre: "Chill",
        description: "Relax and unwind with these chill tracks",
        songs: [
            { title: "Stay", artist: "Rihanna", duration: "4:09", cover: "chill-blue-cover" },
            { title: "Breathe Me", artist: "Sia", duration: "4:30", cover: "chill-blue-cover" },
            { title: "Mad World", artist: "Gary Jules", duration: "3:07", cover: "chill-blue-cover" },
            { title: "Skinny Love", artist: "Bon Iver", duration: "3:58", cover: "chill-blue-cover" },
            { title: "Holocene", artist: "Bon Iver", duration: "5:36", cover: "chill-blue-cover" },
            { title: "The Night We Met", artist: "Lord Huron", duration: "3:28", cover: "chill-blue-cover" },
            { title: "Someone Like You", artist: "Adele", duration: "4:45", cover: "chill-blue-cover" },
            { title: "Fix You", artist: "Coldplay", duration: "4:54", cover: "chill-blue-cover" },
            { title: "Hurt", artist: "Johnny Cash", duration: "3:38", cover: "chill-blue-cover" },
            { title: "Black", artist: "Pearl Jam", duration: "5:43", cover: "chill-blue-cover" }
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeElements();
        initializeEventListeners();
        loadPlaylists();
        
        // Check if user is already logged in
        const savedUser = localStorage.getItem('tuneHiveUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            showMainApp();
        } else {
            showLoginPage();
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

// Initialize DOM elements
function initializeElements() {
    // Get elements safely with fallbacks
    const getElement = (id) => document.getElementById(id) || document.createElement('div');
    
    // Core app elements
    window.loginPage = getElement('loginPage');
    window.mainApp = getElement('mainApp');
    window.profileBtn = getElement('profileBtn');
    window.profileMenu = getElement('profileMenu');
    window.searchInput = getElement('searchInput');
    window.searchResults = getElement('searchResults');
    
    // Player elements
    window.currentTrackTitle = getElement('currentTrackTitle');
    window.currentTrackArtist = getElement('currentTrackArtist');
    window.currentTrackCover = getElement('currentTrackCover');
    window.playBtn = getElement('playBtn');
    window.prevBtn = getElement('prevBtn');
    window.nextBtn = getElement('nextBtn');
    window.shuffleBtn = getElement('shuffleBtn');
    window.repeatBtn = getElement('repeatBtn');
    
    // Progress elements
    window.progressFill = getElement('progressFill');
    window.progressHandle = getElement('progressHandle');
    window.currentTimeEl = getElement('currentTime');
    window.totalTimeEl = getElement('totalTime');
    
    // Volume elements
    window.volumeFill = getElement('volumeFill');
    window.volumeHandle = getElement('volumeHandle');
    window.volumeBtn = getElement('volumeBtn');
}

// Initialize event listeners
function initializeEventListeners() {
    try {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Social login buttons
        document.querySelectorAll('.btn-social').forEach(btn => {
            btn.addEventListener('click', handleSocialLogin);
        });
        
        // Navigation
        const backBtn = document.getElementById('backBtn');
        const forwardBtn = document.getElementById('forwardBtn');
        if (backBtn) backBtn.addEventListener('click', navigateBack);
        if (forwardBtn) forwardBtn.addEventListener('click', navigateForward);
        
        // Profile dropdown
        if (window.profileBtn) {
            window.profileBtn.addEventListener('click', toggleProfileMenu);
        }
        document.addEventListener('click', closeProfileMenu);
        
        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        // Settings navigation
        document.querySelectorAll('[data-page]').forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                navigateToPage(page);
            });
        });
        
        // Search
        if (window.searchInput) {
            window.searchInput.addEventListener('input', handleSearch);
        }
        
        // Player controls
        if (window.playBtn) window.playBtn.addEventListener('click', togglePlay);
        if (window.prevBtn) window.prevBtn.addEventListener('click', playPrevious);
        if (window.nextBtn) window.nextBtn.addEventListener('click', playNext);
        if (window.shuffleBtn) window.shuffleBtn.addEventListener('click', toggleShuffle);
        if (window.repeatBtn) window.repeatBtn.addEventListener('click', toggleRepeat);
        
        // Progress bar
        const progressTrack = document.querySelector('.progress-track');
        if (progressTrack) {
            progressTrack.addEventListener('click', seekTo);
        }
        
        // Volume control
        const volumeTrack = document.querySelector('.volume-track');
        if (volumeTrack) {
            volumeTrack.addEventListener('click', setVolume);
        }
        
        // Initialize volume display
        updateVolumeDisplay();
        
        // Playlist play button
        const playlistPlayBtn = document.getElementById('playlistPlayBtn');
        if (playlistPlayBtn) {
            playlistPlayBtn.addEventListener('click', playCurrentPlaylist);
        }
        
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    try {
        const email = document.getElementById('email')?.value || '';
        const password = document.getElementById('password')?.value || '';
        
        if (email && password) {
            currentUser = {
                email: email,
                name: email.split('@')[0] || 'User',
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('tuneHiveUser', JSON.stringify(currentUser));
            showMainApp();
        }
    } catch (error) {
        console.error('Login error:', error);
    }
}

function handleSocialLogin(e) {
    e.preventDefault();
    try {
        const provider = e.currentTarget.textContent.toLowerCase();
        
        currentUser = {
            email: `user@${provider.includes('google') ? 'gmail.com' : provider + '.com'}`,
            name: 'User',
            provider: provider,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('tuneHiveUser', JSON.stringify(currentUser));
        showMainApp();
    } catch (error) {
        console.error('Social login error:', error);
    }
}

function handleLogout() {
    try {
        currentUser = null;
        localStorage.removeItem('tuneHiveUser');
        showLoginPage();
        
        // Reset application state
        currentPlaylist = null;
        currentTrack = null;
        isPlaying = false;
        navigationHistory = [];
        historyIndex = -1;
        
        stopProgressSimulation();
        updatePlayerDisplay();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Navigation functions
function showLoginPage() {
    if (window.loginPage) window.loginPage.classList.remove('hidden');
    if (window.mainApp) window.mainApp.classList.add('hidden');
}

function showMainApp() {
    if (window.loginPage) window.loginPage.classList.add('hidden');
    if (window.mainApp) window.mainApp.classList.remove('hidden');
    navigateToPage('home');
}

function navigateToPage(pageId, addToHistory = true) {
    try {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Add to navigation history
            if (addToHistory) {
                navigationHistory = navigationHistory.slice(0, historyIndex + 1);
                navigationHistory.push(pageId);
                historyIndex = navigationHistory.length - 1;
                updateNavigationButtons();
            }
            
            // Update sidebar active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
            if (activeNavItem && activeNavItem.classList.contains('nav-item')) {
                activeNavItem.classList.add('active');
            }
            
            // Load page-specific content
            loadPageContent(pageId);
        }
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

function navigateBack() {
    try {
        if (historyIndex > 0) {
            historyIndex--;
            const pageId = navigationHistory[historyIndex];
            navigateToPage(pageId, false);
            updateNavigationButtons();
        }
    } catch (error) {
        console.error('Navigate back error:', error);
    }
}

function navigateForward() {
    try {
        if (historyIndex < navigationHistory.length - 1) {
            historyIndex++;
            const pageId = navigationHistory[historyIndex];
            navigateToPage(pageId, false);
            updateNavigationButtons();
        }
    } catch (error) {
        console.error('Navigate forward error:', error);
    }
}

function updateNavigationButtons() {
    try {
        const backBtn = document.getElementById('backBtn');
        const forwardBtn = document.getElementById('forwardBtn');
        
        if (backBtn) backBtn.disabled = historyIndex <= 0;
        if (forwardBtn) forwardBtn.disabled = historyIndex >= navigationHistory.length - 1;
    } catch (error) {
        console.error('Update navigation buttons error:', error);
    }
}

// Profile dropdown functions
function toggleProfileMenu(e) {
    e.stopPropagation();
    if (window.profileMenu) {
        window.profileMenu.classList.toggle('show');
    }
}

function closeProfileMenu(e) {
    if (window.profileMenu && window.profileBtn) {
        if (!window.profileMenu.contains(e.target) && !window.profileBtn.contains(e.target)) {
            window.profileMenu.classList.remove('show');
        }
    }
}

// Playlist functions
function loadPlaylists() {
    try {
        const playlistList = document.getElementById('playlistList');
        const featuredGrid = document.getElementById('featuredGrid');
        const recentlyPlayed = document.getElementById('recentlyPlayed');
        const madeForYou = document.getElementById('madeForYou');
        
        // Clear existing content
        if (playlistList) playlistList.innerHTML = '';
        if (featuredGrid) featuredGrid.innerHTML = '';
        if (recentlyPlayed) recentlyPlayed.innerHTML = '';
        if (madeForYou) madeForYou.innerHTML = '';
        
        // Populate sidebar playlist list
        if (playlistList) {
            Object.keys(playlistData).forEach(playlistName => {
                const playlistItem = document.createElement('div');
                playlistItem.className = 'playlist-item';
                playlistItem.textContent = playlistName;
                playlistItem.addEventListener('click', () => openPlaylist(playlistName));
                playlistList.appendChild(playlistItem);
            });
        }
        
        // Populate featured playlists (first 6)
        if (featuredGrid) {
            const featuredPlaylists = Object.keys(playlistData).slice(0, 6);
            featuredPlaylists.forEach(playlistName => {
                const card = createPlaylistCard(playlistName, playlistData[playlistName]);
                featuredGrid.appendChild(card);
            });
        }
        
        // Populate recently played
        if (recentlyPlayed) {
            const recentPlaylists = Object.keys(playlistData).slice(0, 5);
            recentPlaylists.forEach(playlistName => {
                const card = createPlaylistCard(playlistName, playlistData[playlistName]);
                recentlyPlayed.appendChild(card);
            });
        }
        
        // Populate made for you
        if (madeForYou) {
            const madeForYouPlaylists = Object.keys(playlistData).slice(2, 7);
            madeForYouPlaylists.forEach(playlistName => {
                const card = createPlaylistCard(playlistName, playlistData[playlistName]);
                madeForYou.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading playlists:', error);
    }
}

function createPlaylistCard(name, data) {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.addEventListener('click', () => openPlaylist(name));
    
    card.innerHTML = `
        <div class="playlist-cover">
            <div class="playlist-cover-image ${data.cover}">
                ${name.charAt(0)}
            </div>
        </div>
        <div class="playlist-card-title">${name}</div>
        <div class="playlist-card-description">${data.description}</div>
    `;
    
    return card;
}

function openPlaylist(playlistName) {
    try {
        currentPlaylist = playlistName;
        const playlist = playlistData[playlistName];
        
        if (!playlist) return;
        
        // Update playlist page
        const playlistTitle = document.getElementById('playlistTitle');
        const playlistMeta = document.getElementById('playlistMeta');
        const playlistCover = document.getElementById('playlistCover');
        
        if (playlistTitle) playlistTitle.textContent = playlistName;
        if (playlistMeta) playlistMeta.textContent = `${playlist.songs.length} songs`;
        
        if (playlistCover) {
            playlistCover.innerHTML = `<div class="playlist-cover-image ${playlist.cover}">${playlistName.charAt(0)}</div>`;
        }
        
        // Load tracklist
        loadTracklist(playlist.songs);
        
        // Navigate to playlist page
        navigateToPage('playlist');
    } catch (error) {
        console.error('Error opening playlist:', error);
    }
}

function loadTracklist(songs) {
    try {
        const tracklist = document.getElementById('tracklist');
        if (!tracklist) return;
        
        tracklist.innerHTML = `
            <div class="track-header">
                <div>#</div>
                <div>TITLE</div>
                <div>ALBUM</div>
                <div>DATE ADDED</div>
                <div>⏱</div>
            </div>
        `;
        
        songs.forEach((song, index) => {
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';
            trackItem.addEventListener('click', () => playTrack(song, index));
            
            trackItem.innerHTML = `
                <div class="track-number">${index + 1}</div>
                <div class="track-info">
                    <div class="track-cover ${song.cover}">${song.title.charAt(0)}</div>
                    <div class="track-details">
                        <div class="track-name">${song.title}</div>
                        <div class="track-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="track-album">${currentPlaylist}</div>
                <div class="track-date">2 days ago</div>
                <div class="track-duration">${song.duration}</div>
            `;
            
            tracklist.appendChild(trackItem);
        });
    } catch (error) {
        console.error('Error loading tracklist:', error);
    }
}

// Search functions
function handleSearch() {
    try {
        const query = window.searchInput?.value?.trim()?.toLowerCase() || '';
        
        if (!query) {
            if (window.searchResults) {
                window.searchResults.innerHTML = '<div class="no-results">Start typing to search for songs, artists, and playlists</div>';
            }
            return;
        }
        
        const results = {
            songs: [],
            artists: new Set(),
            playlists: []
        };
        
        // Search through all playlists and songs
        Object.keys(playlistData).forEach(playlistName => {
            const playlist = playlistData[playlistName];
            
            // Search playlist names
            if (playlistName.toLowerCase().includes(query)) {
                results.playlists.push({ name: playlistName, data: playlist });
            }
            
            // Search songs
            playlist.songs.forEach(song => {
                if (song.title.toLowerCase().includes(query) || 
                    song.artist.toLowerCase().includes(query)) {
                    results.songs.push({ ...song, playlist: playlistName });
                    results.artists.add(song.artist);
                }
            });
        });
        
        displaySearchResults(results, query);
    } catch (error) {
        console.error('Search error:', error);
    }
}

function displaySearchResults(results, query) {
    try {
        if (!window.searchResults) return;
        
        let html = '';
        
        if (results.songs.length === 0 && results.playlists.length === 0) {
            html = '<div class="no-results">No results found for "' + query + '"</div>';
        } else {
            if (results.songs.length > 0) {
                html += '<div class="search-section"><h3>Songs</h3>';
                results.songs.slice(0, 10).forEach(song => {
                    html += `
                        <div class="track-item" onclick="playTrackFromSearch('${song.title}', '${song.artist}', '${song.playlist}')">
                            <div class="track-number">♪</div>
                            <div class="track-info">
                                <div class="track-cover ${song.cover}">${song.title.charAt(0)}</div>
                                <div class="track-details">
                                    <div class="track-name">${song.title}</div>
                                    <div class="track-artist">${song.artist}</div>
                                </div>
                            </div>
                            <div class="track-album">${song.playlist}</div>
                            <div class="track-date"></div>
                            <div class="track-duration">${song.duration}</div>
                        </div>
                    `;
                });
                html += '</div>';
            }
            
            if (results.playlists.length > 0) {
                html += '<div class="search-section"><h3>Playlists</h3><div class="playlist-row">';
                results.playlists.forEach(playlist => {
                    html += `
                        <div class="playlist-card" onclick="openPlaylist('${playlist.name}')">
                            <div class="playlist-cover">
                                <div class="playlist-cover-image ${playlist.data.cover}">
                                    ${playlist.name.charAt(0)}
                                </div>
                            </div>
                            <div class="playlist-card-title">${playlist.name}</div>
                            <div class="playlist-card-description">${playlist.data.description}</div>
                        </div>
                    `;
                });
                html += '</div></div>';
            }
        }
        
        window.searchResults.innerHTML = html;
    } catch (error) {
        console.error('Display search results error:', error);
    }
}

// Music player functions
function playTrack(track, index = 0) {
    try {
        currentTrack = { ...track, index };
        updatePlayerDisplay();
        
        // Simulate play
        isPlaying = true;
        updatePlayButton();
        
        // Simulate track duration
        duration = parseDuration(track.duration);
        currentTime = 0;
        startProgressSimulation();
    } catch (error) {
        console.error('Play track error:', error);
    }
}

function playTrackFromSearch(title, artist, playlistName) {
    try {
        const playlist = playlistData[playlistName];
        const track = playlist?.songs?.find(s => s.title === title && s.artist === artist);
        if (track) {
            currentPlaylist = playlistName;
            playTrack(track);
        }
    } catch (error) {
        console.error('Play track from search error:', error);
    }
}

function playCurrentPlaylist() {
    try {
        if (currentPlaylist && playlistData[currentPlaylist]) {
            const playlist = playlistData[currentPlaylist];
            if (playlist.songs && playlist.songs.length > 0) {
                playTrack(playlist.songs[0], 0);
            }
        }
    } catch (error) {
        console.error('Play current playlist error:', error);
    }
}

function togglePlay() {
    try {
        if (!currentTrack) return;
        
        isPlaying = !isPlaying;
        updatePlayButton();
        
        if (isPlaying) {
            startProgressSimulation();
        } else {
            stopProgressSimulation();
        }
    } catch (error) {
        console.error('Toggle play error:', error);
    }
}

function playPrevious() {
    try {
        if (!currentTrack || !currentPlaylist || !playlistData[currentPlaylist]) return;
        
        const playlist = playlistData[currentPlaylist];
        const currentIndex = currentTrack.index;
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.songs.length - 1;
        
        playTrack(playlist.songs[prevIndex], prevIndex);
    } catch (error) {
        console.error('Play previous error:', error);
    }
}

function playNext() {
    try {
        if (!currentTrack || !currentPlaylist || !playlistData[currentPlaylist]) return;
        
        const playlist = playlistData[currentPlaylist];
        const currentIndex = currentTrack.index;
        const nextIndex = currentIndex < playlist.songs.length - 1 ? currentIndex + 1 : 0;
        
        playTrack(playlist.songs[nextIndex], nextIndex);
    } catch (error) {
        console.error('Play next error:', error);
    }
}

function toggleShuffle() {
    try {
        if (window.shuffleBtn) {
            const isActive = window.shuffleBtn.style.color === 'rgb(29, 185, 84)';
            window.shuffleBtn.style.color = isActive ? '#a7a7a7' : '#1DB954';
        }
    } catch (error) {
        console.error('Toggle shuffle error:', error);
    }
}

function toggleRepeat() {
    try {
        if (window.repeatBtn) {
            const isActive = window.repeatBtn.style.color === 'rgb(29, 185, 84)';
            if (isActive) {
                window.repeatBtn.style.color = '#a7a7a7';
                window.repeatBtn.textContent = '🔁';
            } else {
                window.repeatBtn.style.color = '#1DB954';
                window.repeatBtn.textContent = '🔂';
            }
        }
    } catch (error) {
        console.error('Toggle repeat error:', error);
    }
}

function seekTo(e) {
    try {
        if (!currentTrack) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        currentTime = percentage * duration;
        updateProgressDisplay();
    } catch (error) {
        console.error('Seek error:', error);
    }
}

function setVolume(e) {
    try {
        const rect = e.currentTarget.getBoundingClientRect();
        volume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        updateVolumeDisplay();
    } catch (error) {
        console.error('Set volume error:', error);
    }
}

// Helper functions
function updatePlayerDisplay() {
    try {
        if (currentTrack) {
            if (window.currentTrackTitle) window.currentTrackTitle.textContent = currentTrack.title;
            if (window.currentTrackArtist) window.currentTrackArtist.textContent = currentTrack.artist;
            if (window.currentTrackCover) {
                window.currentTrackCover.className = currentTrack.cover;
                window.currentTrackCover.textContent = currentTrack.title.charAt(0);
            }
            if (window.totalTimeEl) window.totalTimeEl.textContent = currentTrack.duration;
        } else {
            if (window.currentTrackTitle) window.currentTrackTitle.textContent = 'Select a song';
            if (window.currentTrackArtist) window.currentTrackArtist.textContent = '';
            if (window.currentTrackCover) {
                window.currentTrackCover.className = '';
                window.currentTrackCover.textContent = '';
            }
            if (window.totalTimeEl) window.totalTimeEl.textContent = '0:00';
        }
    } catch (error) {
        console.error('Update player display error:', error);
    }
}

function updatePlayButton() {
    try {
        if (!window.playBtn) return;
        
        const playIcon = window.playBtn.querySelector('.play-icon');
        const pauseIcon = window.playBtn.querySelector('.pause-icon');
        
        if (playIcon && pauseIcon) {
            if (isPlaying) {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        }
    } catch (error) {
        console.error('Update play button error:', error);
    }
}

function updateProgressDisplay() {
    try {
        if (duration > 0) {
            const percentage = (currentTime / duration) * 100;
            if (window.progressFill) window.progressFill.style.width = percentage + '%';
            if (window.progressHandle) window.progressHandle.style.left = percentage + '%';
            if (window.currentTimeEl) window.currentTimeEl.textContent = formatTime(currentTime);
        }
    } catch (error) {
        console.error('Update progress display error:', error);
    }
}

function updateVolumeDisplay() {
    try {
        const percentage = volume * 100;
        if (window.volumeFill) window.volumeFill.style.width = percentage + '%';
        if (window.volumeHandle) window.volumeHandle.style.left = percentage + '%';
        
        // Update volume icon
        if (window.volumeBtn) {
            if (volume === 0) {
                window.volumeBtn.textContent = '🔇';
            } else if (volume < 0.5) {
                window.volumeBtn.textContent = '🔉';
            } else {
                window.volumeBtn.textContent = '🔊';
            }
        }
    } catch (error) {
        console.error('Update volume display error:', error);
    }
}

function startProgressSimulation() {
    stopProgressSimulation();
    
    progressInterval = setInterval(() => {
        try {
            if (isPlaying && currentTime < duration) {
                currentTime += 1;
                updateProgressDisplay();
                
                if (currentTime >= duration) {
                    playNext();
                }
            }
        } catch (error) {
            console.error('Progress simulation error:', error);
        }
    }, 1000);
}

function stopProgressSimulation() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function parseDuration(timeStr) {
    try {
        const parts = timeStr.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } catch (error) {
        return 0;
    }
}

function formatTime(seconds) {
    try {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    } catch (error) {
        return '0:00';
    }
}

function loadPageContent(pageId) {
    try {
        switch (pageId) {
            case 'library':
                loadLibraryContent();
                break;
            case 'search':
                // Focus search input when navigating to search page
                setTimeout(() => {
                    if (window.searchInput) window.searchInput.focus();
                }, 100);
                break;
        }
    } catch (error) {
        console.error('Load page content error:', error);
    }
}

function loadLibraryContent() {
    try {
        const libraryList = document.getElementById('libraryList');
        if (!libraryList) return;
        
        libraryList.innerHTML = '';
        
        // Show recently played playlists
        Object.keys(playlistData).slice(0, 5).forEach(playlistName => {
            const playlist = playlistData[playlistName];
            const item = document.createElement('div');
            item.className = 'library-item';
            item.addEventListener('click', () => openPlaylist(playlistName));
            
            item.innerHTML = `
                <div class="track-cover ${playlist.cover}">${playlistName.charAt(0)}</div>
                <div class="track-details">
                    <div class="track-name">${playlistName}</div>
                    <div class="track-artist">Playlist • ${playlist.songs.length} songs</div>
                </div>
            `;
            
            libraryList.appendChild(item);
        });
    } catch (error) {
        console.error('Load library content error:', error);
    }
}

// Make functions available globally for onclick handlers
window.openPlaylist = openPlaylist;
window.playTrackFromSearch = playTrackFromSearch;