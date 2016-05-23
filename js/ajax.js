(function(){
    
    //load page via ajax
    var loadPage = function(url){
            var promise = $.Deferred();

            $.ajax(url, {
                data: {q: url},
                success:    function(result){ promise.resolve(result);},
                error:      function() { var error = 'Invalid url'; promise.reject(error);},
                timeout:    3000,
                beforeSend: function(){ console.log('Loading'); },
                complete:   function(){ console.log('complete'); }
            });
            return promise;
    };
    
    //select page to load and make callback
    var loadCurrentPage = function(place,url){
         
       loadPage(url)
            .done(function(result){
                $(place).html(result);
            })
            .fail(function(result){
                $(place).html(result);
        }); 
    };

    $(document).ready(function(){

    });
    
    
}()); 