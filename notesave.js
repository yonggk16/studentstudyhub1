let currentSort = "newest";

// Store original order on page load
function storeOriginalOrder() {
    const tbody = document.querySelector(".notes-table tbody");
    if (!tbody) return;

    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.dataset.originalIndex = index; // 0, 1, 2, 3, 4 ...
    });
}

// Sorting
function sortTable() {
    const tbody = document.querySelector(".notes-table tbody");
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const textA = a.cells[1].textContent.trim();
        const textB = b.cells[1].textContent.trim();
        const indexA = parseInt(a.dataset.originalIndex, 10);
        const indexB = parseInt(b.dataset.originalIndex, 10);

        switch (currentSort) {
            // A to Z
            case "az":
                return textA.localeCompare(textB, undefined, { sensitivity: "base" });
            // Z to A
            case "za":
                return textB.localeCompare(textA, undefined, { sensitivity: "base" });
            // Oldest first
            case "oldest":
                return indexB - indexA;
            // Newest first
            case "newest":
            default:
                return indexA - indexB;
        }
    });

    // Updates # after sorting
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
        tbody.appendChild(row);
    });
}

// Updates and run sorting
function changeSort(value) {
    currentSort = value;
    sortTable();
}

function initSortControl() {
    const sortSelect = document.getElementById("sort-notes");
    if (!sortSelect) return; // Stop function if sort-notes does not exist

    sortSelect.addEventListener("change", (e) => {
        changeSort(e.target.value); // Change sorting when user choose an option
    });
}

// Run after HTML loads
document.addEventListener("DOMContentLoaded", () => {
    storeOriginalOrder();
    initSortControl();
});