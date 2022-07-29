$('.btn-search-movie').on('click', function(){
    $.ajax({
        url: 'https://www.omdbapi.com/?apikey=adec1774&s=' + $('.key-search-movie').val(),
        success: result => {
            if(result.Response == "True"){
                const movies = result.Search
                let el = ''
                movies.forEach(e => {
                    el += showCard(e)
                })
                $('#movies-container').html(el)
            }else{
                $('#movies-container').html(showError(result.Error))
            }
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: `https://www.omdbapi.com/?apikey=adec1774&i=${$(this).data('movie-id')}`,
                    success: m => {
                        $('.detail-movie').html(showDetailMovie(m))
                    },
                    error: e => {
                        console.log(e.responseText);
                    }
                })
            })
        },
        error: e => {
            console.log(e.responseText);
        }
    })
})

function showCard(e){
    return `<div class="col-xl-3 col-md-4 col-sm-6 my-3">
                <div class="card">
                    <img src="${e.Poster}" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${e.Title}</h5>
                        <h6 class="text-muted">${e.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-movie-id="${e.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}

function showDetailMovie(m){
    return `<div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                        <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>Plot: </strong><br>${m.Plot}</li>
                    </ul>
                </div>
            </div>`
}

function showError(e){
    return `<p class="text-center mt-5 fs-5">${e}</p>`
}