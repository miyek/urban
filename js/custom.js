(function(){
    
    /* PLUGINS */
    
    //toggle plugin
    $.fn.toggleMenu = function(){
        var el = $(this);
        var show = el.find('.navmain-toggle');
        var menu = $(show.attr('data-target'));
        var close = el.find('.navmain-close');
        var link = el.find('ul li a');
        var lockMenu , lockMouse= false;
        function hide(){ menu.toggleClass('move'); lockMenu=false; };
        
        show.on('click', function(){ menu.toggleClass('move'); lockMenu=true;});
        close.on('click', hide);
        
        el.hover(function(){ lockMouse=true; },function(){ lockMouse=false; });
        
        //hide menu if clik outside
        $('body').on('click', function(e){
            if(lockMenu==true && lockMouse==false){
                hide();
            };
        });
        //hide menu if click on link
        link.on('click', hide);
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
            if(goTo.length==0) return;
            
            $('html, body').animate({
                scrollTop: goTo.offset().top
            }, settings.delay);          
        });
    };
    
    //modal box
    $.fn.modal = function(options){
        //modal settings
        var settings = $.extend({
            boxname: '.modal-box',
            close: '.modal-box-close',
            show: false,
            duration: 500,
            delay: 0
        },options);
        
        //set variables
        var box = $(settings.boxname);
        var close = box.find(settings.close);
        var click =$(this);
        
        fadeBox = function(){
            box.delay(settings.delay).fadeIn(settings.duration);
        };
        
        //show modal box on load
        if(settings.show) fadeBox();
        
        //show modal on click
        if(click.attr('href')) click.on('click', fadeBox);
        
        //close modal
        close.on('click', function(){
            box.fadeOut(settings.duration);
        });
    };
    
    /* /. PLUGINS */
    
    /* FUNCTIONS */
    function animationsScroll(options){
        //ANIMATION EFFECTS based on scroll
        
        //settings animationsScroll
         var settings = $.extend({
                section: $('section'),
                menu: '.navmain',
                active: 'active'
            }, options);
        
        //SET VARIABLES
        //variable name to handle
        var el = $(settings.section);
        var menu = $(settings.menu);
        var active = settings.active;
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
        
        //animation (show up)
        function Animation(options){
            //settings Animation
            var settings = $.extend({
                section: 'section',
                class: '.animation',
                duration: 2000,
                delay: 500
            }, options);
            var e = $(settings.section).find(settings.class);
            e.each(function(i){
                $(this).delay(settings.delay*i).animate({opacity: 1},settings.delay);
            });
        };
        
        //if windows scroll
        $(window).scroll(function(options, breakpoint, posTop){
            //Position from top
            posTop = $(this).scrollTop();
            
            //look for breakpont from array
            //set breakpoint position(margin)
            breakpoint =-100;
            for(var i=0; i<breakpoints.length; i++){
                if(posTop > breakpoint){
                    if(i==0) menu.removeClass(active);
                    if(i==1) { menu.addClass(active); Animation({section: '#about'});};
                    if(i==2) Animation({section: '#features'});
                    if(i==3) Animation({section: '#summary', delay: 1000});
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
        $('.navmain a').jumpTo({delay:1500});
        //modal box (load after 5s)
        //$('.modal-box').modal({show: true, delay: 5000});
        
        
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