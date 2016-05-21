(function(){
    
    /* PLUGINS */
    
    //toggle plugin
    $.fn.toggleMenu = function(){
        var el = $(this);
        var show = el.find('.navmain-toggle');
        var menu = $(show.attr('data-target'));
        var close = el.find('.navmain-close');
        var lockMenu = false;
        var lockMouse = false;
        
        show.on('click', function(){ menu.toggleClass('move'); lockMenu=true;});
        close.on('click', function(){ menu.toggleClass('move'); lockMenu=false;});
        
        el.hover(function(){ lockMouse=true; },function(){ lockMouse=false; });
        
        $('body').on('click', function(e){
            if(lockMenu==true && lockMouse==false){
                menu.toggleClass('move');
                lockMenu=false;
            };
        });
    };
    
    //jumTo plugin (go to anahor section)
    $.fn.jumpTo = function(options){
        //settings (delay)
        var settings = $.extend({
            delay: 1000
        }, options);
        
        this.on('click', function(){
            var el = $(this);
            //check
            var goTo = $(el.attr('href'));
            $('html, body').animate({
                scrollTop: goTo.offset().top
            }, settings.delay);          
        });
    };
    
    /* /. PLUGINS */
    
    $(document).ready(function(){
        
        //PLUGINS handles
        //toggle menu on click
        $('.navmain').toggleMenu();
        //jump to anahor
        $('.anahor').jumpTo({delay:1500});
        
        
        //hover effect section 5
        var lock=false;
        $('.countAnimation').hover(function(a,b,c){
            if(lock==true) return false;
            lock=true;
            //check
            c = $(this).attr('data-number');
            b = $(this).find('span');
            // count number
            var i =1;
            $({countNum: 1}).animate({countNum: c}, {
              duration: 800,
              easing:'linear',
              step: function(i) {
                a = Math.floor(i++);
                b.html(a);
              },
              complete: function() {
                  lock=false;
                  return;
              }
            });
        }, function(){});
        
        
        //FIRST ANIMATION after load
        var firstAnimation = function(){
            var section = '.first-section';
            $(section + ' h1').hide().delay(500).fadeIn(1000);
            $(section + ' .lead').hide().delay(1500).fadeIn(2000);
            $(section + ' .anahor').hide().delay(3500).fadeIn(2000);
        };
        firstAnimation();
       
        //ANIMATION EFFECTS based on scroll
        $(window).scroll(function(options){
            //6 heights/animations for based 500px height
            var settings = $.extend({
                height1: 0,
                height2: 500,
                height3: 700,
                height4: 1600,
                height5: 2000,
                width1: 480,
                width2: 768,
                width3: 992,
                width4: 1200,
            },options)
            
            var height = $(this).scrollTop();
            var width = $(this).width();
            var winHeight = $(this).height();
            var reduce = 0;
            //console.log(height,width, winHeight);
            
            var firstAnimation = function(){
                //remove class for menu
                $('.navmain').removeClass('background');
                $('.navmain .navmain-brand').hide();
            };
            
            var secondAnimation = function(){
                //add background for menu
                $('.navmain').addClass('background');
                $('.navmain .navmain-brand').show();
                
                //animation for content
                var section = ('#section2');
                var duration = 2000;
                $(section + ' .an1').delay(500).animate({opacity: 1},duration);
                $(section + ' .an2').delay(1000).animate({opacity: 1},duration);
                $(section + ' .an3').delay(2000).animate({opacity: 1},duration);
                $(section + ' .an4').delay(3000).animate({opacity: 1},duration);
            };
            
            var thirdAnimation = function(){
                var section = ('#section3');
                var duration = 2000;

                $(section + ' .an1').delay(500).animate({opacity:1}, duration);
                $(section + ' .an2').delay(1000).animate({opacity:1}, duration);
                $(section + ' .an3').delay(1500).animate({opacity:1}, duration);
                $(section + ' .an4').delay(2000).animate({opacity:1}, duration);
            };
            
            var fourthAnimation = function(e){
                var section = ('#section4');
                var duration = 2000;
                e = $(section + ' .row').children('.col-sm-2');
                e.each(function(i){
                    $(this).delay(i*1100).animate({opacity:1}, duration);
                });
  
            };
            
            if( width<settings.width1 && winHeight>400){ reduce = 100; }
            if(width>settings.width1 && winHeight<400){ reduce = -280; }
            if(height > settings.height1+reduce) firstAnimation();
            if(height > settings.height2+reduce) secondAnimation();
            if(height > settings.height3+reduce) thirdAnimation();
            if(height > settings.height4+reduce) fourthAnimation();
            
        })

    });
})();