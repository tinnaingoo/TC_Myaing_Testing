// ===== 1. Fetch and Display Posts =====
// JSON ကနေ post တွေကို ဆွဲယူပြီး ပြသဖို့ function
async function fetchAndDisplayPosts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const postGrid = document.getElementById('post-content-grid');

    if (!loadingIndicator || !postGrid) {
        console.error('Required DOM elements are missing.');
        return;
    }

    loadingIndicator.style.display = 'block';
    postGrid.innerHTML = '';

    try {
        const response = await fetch('/post/post-data.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const posts = await response.json();

        let postHTML = '';
        posts.forEach(post => {
            postHTML += `
                <div class="post-card" data-category="${post.Category}">
                    <div class="post-image">
                        <img src="${post.ImageUrl}" alt="${post.ImageCaption}">
                    </div>
                    <div class="post-content">
                        <span class="post-category">${post.Category}</span>
                        <h2 class="post-title" style="text-align: center;">${post.title}</h2>
                        <p class="post-excerpt">${post.Description}</p>
                        <div class="post-footer">
                            <a href="${post.PostUrl}.html" class="read-more">KEEP READING...</a>
                            <span class="post-meta">By <a href="#">${post.Author}</a> • ${post.Date}</span>
                        </div>
                    </div>
                </div>`;
        });

        postGrid.innerHTML = postHTML;
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error('Error fetching or displaying posts:', error.message);
        loadingIndicator.style.display = 'none';
        postGrid.innerHTML = `<p>Sorry, something went wrong: ${error.message}</p>`;
    }
}

// Page load တဲ့အခါ posts ကို fetch လုပ်ဖို့
document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);

