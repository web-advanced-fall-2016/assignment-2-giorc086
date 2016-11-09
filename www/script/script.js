(function() {
    let URL = "http://148.75.251.185:8888/students/";
    let searchField = document.querySelector('#search');
    let studentEntries = [];
    let resultElement = document.querySelector('.results');
    let picture

    //searching through the students from user input on keyup
    $('#search').keyup(function() {
        let key = $('#search').val();
        let regEx = new RegExp(key, 'i');
        let newArray = [];

        if (key === '') {
            resultElement.innerHTML = '';
            return; //ends execution of function
        }

        for (let i = 0; i < studentEntries.length; i++) {
            if (regEx.test(`${studentEntries[i].first_name} ${studentEntries[i].last_name}`)) {
                newArray.push(studentEntries[i]);
            } //else do nothing
        }
        console.log(newArray);
        resultElement.innerHTML = '';
        for (item of newArray) {
            let newLi = document.createElement('li'); //create a new li element in html 
            newLi.innerText = item.first_name + ' ' + item.last_name; //show name and number in a li in html
            newLi.dataset.myCustomId = item.id; //add new data type to li tag with corresponding id 
            resultElement.appendChild(newLi);
        }
        //find the id of each student clicked 
        $("li").click(function() {
            // alert(this.dataset.myCustomId); // id of clicked li by directly accessing DOMElement property
            let clickedStudentId = this.dataset.myCustomId;
            console.log(clickedStudentId);

            //ajax call for IMG
            $.ajax({
                    method: "GET",
                    url: "http://148.75.251.185:8888/students/" + clickedStudentId
                })
                .done(function(response) {
                    console.log(response);
                    picture = response;
                    $('#img').html("<img src=http://148.75.251.185:8888" + response.profile_picture + ">");
                    $('#excerpt').text('Excerpt: ' + response.excerpt);
                    // $('#img').append(<img src= url >);
                    // $('<img src='${url} ${picture.profile_picture}'>').appendTo('#img');
                });


            //ajax call for bio
            $.ajax({
                    method: "GET",
                    url: "http://148.75.251.185:8888/students/" + clickedStudentId + "/bio"
                })
                .done(function(response) {
                    console.log(response);
                    biography = response;
                    $('#bio').text('Biography');
                    $('#bio').text('Biography: ' + biography.full_bio);
                });


        });



    });

    $.ajax({
            method: "GET",
            url: URL
        })
        .done(function(response) {
            console.log(response); //logs the array
            studentEntries = response;
            searchField.removeAttribute('disabled');

        });

})();
