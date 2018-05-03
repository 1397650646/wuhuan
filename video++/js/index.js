/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-03-30 20:40:53
 * @version $Id$
 */


$(function(){
    // 头部热点轮播
    (function(){
        var $banner = $('.toolbar .wrap ul.navbar-nav');
        var $li = $banner.children();
        $banner.append( $li.eq(0).clone() );
        var num=0;
        (function request(){
            num++;
            $banner.animate({top:-num*$li.eq(0).height()},function(){
                if(num == $li.length){
                    num %=$li.length;
                    $banner.css({top:0});
                }
            });
            setTimeout(request,2000);
        })();
    })();

    //头部背景颜色随滚轮变化
    (function(){
        var $head = $('.header .nav');
        $(window).scroll(function () {
            var scrollTop = $(document).scrollTop();
            if ( scrollTop < 200 )
            {
                $head.css({backgroundColor:'rgba(0,0,0,0)'});
            }else {
                $head.css({backgroundColor:'#fff'});
            }
        });
    })();

    // 头部热点轮播
    (function(){
        var $banner = $('.banner .marker .wrap ul');
        var $li = $banner.children();
        $banner.append( $li.eq(0).clone() );
        var num=0;
        (function request(){
            num++;
            $banner.animate({top:-num*$li.eq(0).height()},function(){
                if(num == $li.length){
                    num %=$li.length;
                    $banner.css({top:0});
                }
            });
            setTimeout(request,7000);
        })();
    })();

    // banner轮播
    (function(){
        var $video = $('.banner .bg-video video');
        var len = $video.length;
        var num = 0;
        var $curVideo;
        var onoff = true;
        var arr = ['vote_bg_video.mp4','magic_bg_video.mp4','shelves_video.mp4','trading_video.mp4'];
        var timer;
        // 按钮
        var $tab = $('.banner .marker ul.tab li');
        var $bar = $('.banner .marker ul.tab li span');
        request();
        function request(){
            $curVideo = $video[0];
            var progress = $curVideo.currentTime/$curVideo.duration;
            $bar.eq(num).width(progress*100+'%');
            if(progress > 0.98 && onoff){
                onoff = false;
                $video.animate({opacity:0},500,function(){
                    $bar.eq(num).width(0);
                    num++;
                    num%=arr.length;
                    $curVideo.src = 'video/' + arr[num];
                    $video.animate({opacity:1},500);
                    onoff = true;
                });
            }
            timer = requestAnimationFrame( request );
        };

        $tab.click(function(){
            cancelAnimationFrame(timer);
            onoff = true;
            $bar.eq(num).width(0);
            num = $(this).index();
            $curVideo.src = 'video/' + arr[num];
            request();
        });
    })();

    // 视频弹窗

    (function(){
        var $btn_right = $('.banner .marker .btn-group .btn-right a');
        var $point = $('.banner .marker .btn-group .point');
        var $video_wrap = $('.banner .video-wrap');
        var $video = $('.banner .video-wrap video');
        var $close = $('.v-wrap .close');
        $btn_right.click(function(){
            $btn_right.animate({width:50},100,function(){
                $btn_right.fadeOut();
                $point.fadeIn();
                $point.animate({left:420,top:-40},100,function(){
                    $point.animate({width:3000,height:3000,left:-1100,top:-1500},function(){
                        $video_wrap[0].style.display = 'block';
                        $video[0].currentTime = 0;
                        $video[0].play();
                    });
                });
            });
        });
        $close.click(function(){
            $video_wrap[0].style.display = 'none';
            $video[0].pause();
            $point.animate({left:420,top:-40,width:50,height:50},800,function(){
                $point.animate({top:3,left:178},100,function(){
                    $point.fadeOut();
                    $btn_right.fadeIn();
                    $btn_right.animate({width:140},100);
                });
            });
        });


    })();

    // underline  切换
    (function(){
        var $Li = $('.worth .tab ul.nav li');
        var $line = $('.worth .tab ul.nav li a span');
        var num = 0;
        $Li.click(function(){
            $line.eq(num).animate({width:0},300);
            num = $(this).index();
            $line.eq(num).animate({width:50},300);
        });
    })();


    //波浪

    (function(){
        var canvas = document.getElementById('wave');
        var ctx =  canvas.getContext('2d');
        var  w =  canvas.width =  canvas.parentNode.offsetWidth;
        var  h =  canvas.height =  canvas.parentNode.offsetHeight;

        var waveDefault = h/2;//默认高度
        var waveBo = waveDefault/4;//波浪最大高度
        var colors = ["rgba(0,222,255, 0.2)",
                       "rgba(0,168,255, 0.2)"];
        var num=0;
        (function requestA(){
            ctx.clearRect(0,0,w,h);//擦除画布
            num++;
            for(var i=0;i<colors.length;i++){
                var angle = (num+i*60)*Math.PI/180;
                var sinHeight = Math.sin( angle )*waveBo;//左边
                var cosHeight = Math.cos( angle )*waveBo;//右边
                ctx.strokeStyle=colors[i];   //绘制边框
                ctx.beginPath();//开始路径
                ctx.moveTo(0,waveDefault+sinHeight);//(x,y)移动画笔
                ctx.bezierCurveTo(w/2,waveDefault-waveBo+sinHeight,w/2,waveDefault-waveBo+cosHeight,w,waveDefault+cosHeight);
                ctx.lineTo(w,h);     //右下角
                ctx.lineTo(0,h);    //左下角
                ctx.lineTo(0,waveDefault+sinHeight);//移动画笔
                ctx.stroke();          //画 填充
            }
            requestAnimationFrame(requestA);
        })();


    })();
    //开放式视频创收应用
    (function(){
        var $revenue_content = $('.partners-revenue ul.revenue-content');
        var $h4 = $('.partners-revenue ul.revenue-content li h4');
        var arr = [106536169,340,36];
        var onoff = true;
        $(window).scroll(function(){
           var top =  $revenue_content.eq(0)[0].getBoundingClientRect().top;
           //console.log( top );
           if(top < 200 && onoff){
            onoff = false;
                for(var i=0;i<arr.length;i++){
                    requestA(arr[i],5000,i);
                }
           }
           function requestA(number,duration,index){
                var init_t = new Date();
                (function run(){
                    var current_t =  new Date();
                    var percent = (current_t-init_t)/duration;//动画进度
                    if(percent>=1){
                        percent = 1;
                    }else{
                        requestAnimationFrame(run);
                    }
                    var value = (number*percent).toFixed(0);
                    switch (index) {
                        case 0:
                        var one = Math.floor(value/1000000);
                        var two = Math.floor(value%1000000/1000);
                        var three = Math.floor(value%1000);
                        $h4.eq(index).html(one+','+two+','+three);
                            break;
                        case 1:
                            $h4.eq(index).html(value);
                            break;
                        case 2://5
                            $h4.eq(index).html(value/10);
                            break;
                    }
                })();
            }
        });
    })();
    //客户服务
    (function(){
        var $wrap = $('.partners-server .server-content');
        var wrapW = $wrap.innerWidth();
        var $img = $wrap.find('img');
        var imgW = $img.innerWidth();
        var scrollMaxW =  imgW - wrapW;
        var num=0;
        var onoff = true;
        (function requestA(){
            if(onoff){
                num+=2;
                if(num>scrollMaxW){
                    onoff =  false;
                }
            }else{
                num-=2;
                if(num<0){
                    num = 0;
                    onoff =  true;
                }
            }
            $img.css({left:-num});
            requestAnimationFrame(requestA);
        })();
    })();
    //案例
    (function(){
        var $tab_wrap = $('.cases .cases-top .text .tab-content');
        var $tab_panes = $('.cases .cases-top .text .tab-content .tab-pane');
        var $tab_images = $('.cases .cases-top .picture ul li');
        var $tab_btns = $('.cases .cases-content a.nav-item');

        var h =  $tab_panes.eq(0).innerHeight();
        $tab_wrap.css({height:h});
        var num = 0;
        var timer;

        $tab_btns.click(function(){
                // clearTimeout(timer);
                $tab_btns.eq(num).removeClass('active');
                $tab_panes.stop(true,true).eq(num).show().animate({top:'-100%',opacity:0},500);
                $tab_images.eq(num).fadeOut(500);//图片
                num = $(this).index();
                $tab_btns.eq(num).addClass('active');
                $tab_images.eq(num).fadeIn(1200);
                $tab_panes.eq(num).css({top:'-100%'}).show().animate({top:0,opacity:1},500);

        });
        timer = setTimeout(requestA,3000);
        function requestA(){
            $tab_btns.eq(num).removeClass('active');
            // $tab_panes.stop(true,true).eq(num).show().animate({top:'100%',opacity:0},500);
            $tab_panes.eq(num).show().animate({top:'100%',opacity:0},500);
            $tab_images.eq(num).fadeOut(500);//图片
            num++;
            num %= $tab_btns.length;
            $tab_btns.eq(num).addClass('active');
            $tab_images.eq(num).fadeIn(1200);
            // $tab_panes.eq(num).css({top:'-100%'}).fadeIn().animate({top:0,opacity:1},500);
            $tab_panes.eq(num).css({top:'-100%',opacity:1}).fadeIn().animate({top:0},500);
            setTimeout(requestA,3000);
        }
    })();
    // // 画圆
    // (function(){
    //     var canvas = document.getElementById('circle');
    //     var ctx = canvas.getContext('2d');
    //     var w = canvas.width = canvas.parentNode.offsetWidth;
    //     var h = canvas.height = canvas.parentNode.offsetHeight;
    //     var r = 200;//小圆半径
    //     var R = Math.sqrt( Math.pow(w/2,2)+Math.pow(h,2) );//圆的最大半径
    //     var offset = 125;//圆与圆之间距离
    //     var num = Math.floor( (R-r)/offset) ;

    //     var arr = [];
    //     for(var i=0;i<=num;i++){
    //         var obj = {};
    //         obj.r = offset*i + r;
    //         arr.push(obj);

    //     }
    //     //动画
    //     (function requestA(){
    //         ctx.clearRect(0,0,w,h);
    //         for(var i=0;i<arr.length;i++){
    //             if( arr[i].r > R ){
    //                 arr[i].r = r;
    //             }else{
    //                 arr[i].r++;
    //             }
    //             arr[i].opacity = (R-arr[i].r)/R;
    //             draw(arr[i]);
    //         }
    //         requestAnimationFrame(requestA);
    //     })();

    //     //绘制canvas
    //     function draw(obj){
    //         ctx.beginPath();
    //         ctx.lineWidth = obj.r/100;//线条宽度
    //         ctx.strokeStyle = 'rgba(255,255,255,'+obj.opacity+')';//绘制边框颜色
    //         ctx.arc(w/2,h,obj.r,0,360*Math.PI/180,true);//绘制圆路径
    //         ctx.stroke();
    //     };

    // })();

    // 响应式最小模式下的菜单
    (function(){
        var $plus = $('.header .nav .nav-plus');
        var $menu = $('.header .nav .nav-menu');
        var onoff = true;
        var h = $menu.height();
        $menu.css({opacity:1,height:0});
        $plus.click(function() {
            if(onoff){
                $(this).html('x');
                $menu.animate({height:h});
                onoff = false;
            }else{
                $(this).html('+');
                $menu.animate({height:0});
                onoff = true;
            }
        });


    })();
    //响应式最小模式下的EN
    (function(){
        var $len = $('.header .nav .nav-len');
        var w = $(window).innerWidth();
        var isOnload = true;
        $(window).scroll(function () {
            if(w<=780&&isOnload){
                var scrollTop = $(document).scrollTop();
                if ( scrollTop < 200 )
                {
                    $len.css({display:'none'});
                }else{
                    $len.css({display:'block'});
                }
            }

        });

        $(window).resize(function() {
            isOnload = false;
            w = $(window).innerWidth();
            $(window).scroll(function () {
                if(w<=780){
                    var scrollTop = $(document).scrollTop();
                    if ( scrollTop < 200 )
                    {
                        $len.css({display:'none'});
                    }else{
                        $len.css({display:'block'});
                    }
                }else{
                    $len.css({display:'none'});
                }
            });

        });

    })();

 });

