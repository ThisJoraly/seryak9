const trackList = document.getElementById("track-list");
const addTrackBtn = document.getElementById("add-track-btn");

let tracks = [];


function addTrack(title, artist, duration) {
    const track = {
        id: Date.now(),
        title,
        artist,
        duration,
    };

    tracks.push(track);
    renderTracks();
}

addTrackBtn.addEventListener("click", () => {
    const title = prompt("Введите название трека");
    const artist = prompt("Введите исполнителя трека");
    const duration = prompt("Введите длину трека (в секундах)");

    if (title && artist && duration) {
        addTrack(title, artist, parseInt(duration));
    }
});


function renderTracks() {
    trackList.innerHTML = "";

    tracks.forEach((track) => {
        const trackItem = document.createElement("div");
        trackItem.className = "track-item";
        trackItem.innerHTML = `
      <h3>${track.title}</h3>
      <p>ИСПОЛНИТЕЛЬ: ${track.artist}</p>
      <p>ЧИСТОГО КАЙФА: ${track.duration} СЕКУНД</p>
      <button class="edit-btn" data-id="${track.id}">ИЗМЕНИТЬ BA$$</button>
      <button class="delete-btn" data-id="${track.id}">УДАЛИТЬ BA$$</button>
    `;

        trackList.appendChild(trackItem);
    });

    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");

    editBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const index = tracks.findIndex((track) => track.id === parseInt(id));

            if (index !== -1) {
                const newTitle = prompt("Введите название трека", tracks[index].title);
                const newArtist = prompt("Введите исполнителя", tracks[index].artist);
                const newDuration = prompt("Введите длину трека (в секундах)", tracks[index].duration);

                if (newTitle && newArtist && newDuration) {
                    tracks[index].title = newTitle;
                    tracks[index].artist = newArtist;
                    tracks[index].duration = parseInt(newDuration);
                    renderTracks();
                }
            }
        });
    });

    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const index = tracks.findIndex((track) => track.id === parseInt(id));

            if (index !== -1) {
                tracks.splice(index, 1);
                renderTracks();
            }
        });
    });
}
