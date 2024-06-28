document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    var query = document.getElementById("query").value;
    console.log(query);

    fetch('https://torrent-api-py-nx0x.onrender.com/api/v1/search?site=piratebay&query=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data && data.data) {
                displayResults(data.data);
            } else {
                console.error('Invalid data format:', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function displayResults(items) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (items && items.length > 0) {
        items.forEach(item => {
            var row = document.createElement('tr');

            var title = document.createElement('td');
            title.textContent = item.name;
            row.appendChild(title);

            var category = document.createElement('td');
            category.textContent = item.category;
            row.appendChild(category);

            var date = document.createElement('td');
            date.textContent = item.date;
            row.appendChild(date);

            var size = document.createElement('td');
            size.textContent = item.size;
            row.appendChild(size);

            var uploader = document.createElement('td');
            uploader.textContent = item.uploader;
            row.appendChild(uploader);

            // var seeders = document.createElement('td');
            // seeders.textContent = item.seeders;
            // row.appendChild(seeders);

            // var leechers = document.createElement('td');
            // leechers.textContent = item.leechers;
            // row.appendChild(leechers);

            var link = document.createElement('td');
            var linkAnchor = document.createElement('a');
            linkAnchor.href = item.magnet;
            linkAnchor.innerHTML = '<i class="fas fa-download"></i> Download';
            row.appendChild(linkAnchor);
            
            resultsContainer.appendChild(row);
        });
    } else {
        resultsContainer.innerHTML = '<tr><td colspan="8">No results found</td></tr>';
    }
}
