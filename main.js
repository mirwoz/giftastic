$(document).ready(function () {

    let animals = [
        "dog", "cat", "elephant", "bunny"
    ];

    animals.forEach(animal => {

        let b = $("<button>");
        b.addClass("animalButton");
        b.text(animal);
        b.attr("data-type", animal);
        $(".theButtons").append(b)

    });

    function createButton(val) {
        $("#newAnimal").empty();
        let b = $("<button>");
        b.addClass("animalButton");
        b.text(val);
        b.attr("data-type", val);
        $(".theButtons").append(b)
    };

    $("#addAnimalButton").on("click", () => {
        var text = $("#newAnimal").val();
        createButton(text);

    });

    $(document).on("click", ".animalButton", function () {
        event.preventDefault();
        $("#cuteAnimals").empty();
        var type = $(this).attr("data-type");
        console.log(type)
        $.ajax({
            url: `http://api.giphy.com/v1/gifs/search?q=${type}&api_key=vvPqUHW20BJMl5fg2E8sxtqp1tavP8iw`,
            method: "GET"
        })
            .done(res => {
                let results = res.data;
                console.log(results)
                for (let i = 0; i < results.length; i++) {
                    var animalDiv = $("<div>");
                    animalDiv.addClass("animal-div");
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var animalImage = $("<img>");
                    animalImage.attr("src", still);
                    animalImage.attr("data-still", still);
                    animalImage.attr("data-animate", animated);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("animal-image");

                    animalDiv.append(animalImage);
                    $("#cuteAnimals").append(animalDiv);
                }
            });
    });

    $(document).on("click", ".animal-image", function (animalImage) {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});