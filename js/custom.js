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
        hide = function(){ menu.toggleClass('move'); lockMenu=false; };
        
        show.on('click', function(){ menu.toggleClass('move'); lockMenu=true;});
        close.on('click', function(){ menu.toggleClass('move'); lockMenu=false; });
        
        el.hover(function(){ lockMouse=true; },function(){ lockMouse=false; });
        
        //hide menu if clik outside
        $('body').on('click', function(e){
            if(lockMenu==true && lockMouse==false){
                menu.toggleClass('move'); lockMenu=false;
            };
        });
        //hide menu if click on link
        el.find('a').on('click', function(){ menu.toggleClass('move'); lockMenu=false; })
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
    
    /* FUNCTIONS */
    var animationsScroll = function(){
        //ANIMATION EFFECTS based on scroll
        
        //SET VARIABLES
        //variable name to handle
        var el = $('section');
        var breakpoints = [];
        
        //set breakpoints method
        setBreakpoints=function(){
            breakpoints =[];
            el.each(function(){
                breakpoints.push($(this).height());
            });
            return breakpoints;
        };
        setBreakpoints();
        
        //when resize window
        $(window).resize(function(){
            //setBreakpoints when windows size changed
            setBreakpoints();
        });
        
        //if windows scroll
        $(window).scroll(function(options){
            //Position from top
            var posTop = $(this).scrollTop();
            
            var Animation1 = function(){
                //remove class for menu
                $('.navmain').removeClass('background');
                $('.navmain .navmain-brand').hide();
            };
            
            var Animation2 = function(){
                //add background for menu
                $('.navmain').addClass('background');
                $('.navmain .navmain-brand').show();
                
                //animation for content
                var section = ('#about');
                var duration = 2000;
                $(section + ' .an1').delay(500).animate({opacity: 1},duration);
                $(section + ' .an2').delay(1000).animate({opacity: 1},duration);
                $(section + ' .an3').delay(2000).animate({opacity: 1},duration);
                $(section + ' .an4').delay(3000).animate({opacity: 1},duration);
            };
            
            var Animation3 = function(){
                var section = ('#features');
                var duration = 2000;

                $(section + ' .an1').delay(500).animate({opacity:1}, duration);
                $(section + ' .an2').delay(1000).animate({opacity:1}, duration);
                $(section + ' .an3').delay(1500).animate({opacity:1}, duration);
                $(section + ' .an4').delay(2000).animate({opacity:1}, duration);
            };
            
            var Animation4 = function(e){
                var section = ('#summary');
                var duration = 2000;
                e = $(section + ' .row').children('.col-sm-2');
                e.each(function(i){
                    $(this).delay(i*1100).animate({opacity:1}, duration);
                });
  
            };
            
            //look for breakpont from array
            //set breakpoint position(margin)
            var breakpoint =-100;
            for(var i=0; i<breakpoints.length; i++){
                if(posTop > breakpoint){
                    if(i==0) Animation1();
                    if(i==1) Animation2();
                    if(i==2) { Animation3(); }
                    if(i==3) Animation4();
                }
                breakpoint +=breakpoints[i];
            }
        })
        // /.ANIMATION EFFECT
    };
    /* /.FUNCTIONS */
    
    
    $(document).ready(function(){
        
        animationsScroll();
        
        //PLUGINS handles
        //toggle menu on click
        $('.navmain').toggleMenu();
        //jump to anahor
        $('.anahor').jumpTo({delay:1500});
        //stick to link menu and jump to anahor
        $('.navmain-wraper li a').jumpTo({delay:1500});
        
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
        firstAnimation = function(duration){
            var section = '.first-section';
            $(section + ' h1').hide().delay(500).fadeIn(duration);
            $(section + ' .lead').hide().delay(1500).fadeIn(duration);
            $(section + ' .anahor').hide().delay(3500).fadeIn(duration);
        };
        firstAnimation(1500);

    });
})();