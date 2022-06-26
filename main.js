$(document).ready(function () {
    $('#title').autocomplete({
        soucre: async function(request, response){
            let data = await fetch(`https://localhost:8000/search?query=${request.term}`)
                    .then(results => results.json())
                    .then(results => results.map(result => {
                        return {
                            label: result.title,
                            value: result.title, 
                            id: result._id
                        }
                    }))
                response(data)
        }, 
        minLength: 2,
        select: function(event, ui){
            console.log(ui.item.id)
            fetch(`https://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    $('#cast').empty()
                    result.cast.forEach(cast => {
                        $(cast).append(`<li>${cast}</li>`)
                    })
                    $('img').attr('src', result.poster)
                })
        }
    })
}

)