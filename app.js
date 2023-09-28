document.addEventListener("DOMContentLoaded", function () {
    var submitBtn = document.getElementById("submitBtn");
    var inputField = document.getElementById("topicInput");

    submitBtn.addEventListener("click", function () {
        searchImages();
    });

    inputField.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            searchImages();
        }
    });

    function searchImages() {
        var search = inputField.value;

        // Clear previous images
        var container = document.querySelector('.container');
        container.innerHTML = '';

        function showImages(url) {
            var img = document.createElement('img');
            img.src = url;
            img.addEventListener("click", function () {
                openImageInNewTab(url);
            });
            container.appendChild(img);
        }

        function openImageInNewTab(url) {
            // Open the image in a new tab
            window.open(url, '_blank');
        }

        const id = "6ln4MFXGml8lLHm0z3l24dDm6Qaiq4-bxvS4_vnfbf4"
        const length = 30;

        const api_url = `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${id}&per_page=${length}`;

        fetch(api_url)
            .then((data) => data.json())
            .then((final) => {
                for (var i = 0; i < length; i++) {
                    showImages(final.results[i].urls.regular);
                }
            })
            .catch((e) => {
                console.log(e);
            });

        // Clear the input field
        inputField.value = '';
    }
});
