(function($) {

	$(document).ready(function(){
  
    // Переключение табов "Об участии"
    
    $(".ap-tabs .tab").click(function() {
      $(".ap-tabs .tab").removeClass("act");
      $(this).addClass("act");
      
      $(".ap-tab-content").hide();
      $(".ap-tab-content[rel='"+$(this).attr("rel")+"']").fadeIn(150);
    })
  
    // Переключение фильтров компаний
    
    $(".companies-catalogue .filter-trigger").click(function() {
      $(".companies-catalogue .filter-trigger").fadeIn(250);
      $(this).hide();
      $(".companies-catalogue dl").hide();
      $(this).parent().find("dl").fadeIn(250);
      $(".companies-filter").css("height","")
    });
    
    // Сворачивание-разворачивание фильтра
    
    $(".companies-catalogue .filter-collapse").click(function() {
      if (!$(".companies-filter").hasClass("filter-collapsed")) {
        origHeight = $(".companies-filter").height();
        $(".companies-filter").addClass("filter-collapsed").animate({
          height:27
        });
        $(this).find("u").html("развернуть фильтр");
      } else {
        $(".companies-filter").removeClass("filter-collapsed").animate({
          height: origHeight
        });
        $(this).find("u").html("свернуть фильтр");
      }
      
    });
  
    // Табы в партнерах
    
    $(".partners-button").click(function() {
      $(".partners-button").removeClass("partners-button-act");
      $(this).addClass("partners-button-act");
      $(".partners-tab").hide();
      $(".partners-tab[rel='"+$(this).attr("rel")+"']").fadeIn(250);
    })
  
    // Табы раздела "О программе"
    
    $(".about-tabs li").click(function() {
      if (!$(this).hasClass("act")) {
        $(".about-tabs li").removeClass("act");
        $(this).addClass("act");
        $(".about-tab-content").hide();
        $(".about-tab-content[rel='" + $(this).attr("rel") + "']").fadeIn(150);
      }
      
    });
    
    // Добавляем дивам в таблице событий классы
    
    $(".calendar-inner .past-proj-cont div.event").first().addClass("first")
    $(".calendar-inner .future-proj-cont").last().children("div.event").last().addClass("last")
  
    //если кликаем на новость подробнее
    $(document).on("click",".ancLinks", false, function(){
      var rel = $(this).attr("rel");
      var sel = $("#pr"+rel);
      //если невидимый
      if(!sel.is(":visible")){
        //найдем родителя
        var trigger = sel.closest(".hide-pos").attr("rel");
        $("."+trigger+" a").click();
      }
      destination = sel.offset().top - 180;
      var tbl = $("#event"+rel+" table");
      if(!tbl.hasClass("active"))
        sel.click();
			if($.browser.safari){
				$('body').animate( { scrollTop: destination }, 1100 );
			}else{
				$('html').animate( { scrollTop: destination }, 1100 );
			}
      return false;
    });

    
		$('#moreAboutK').fancybox({
			wrapCSS    : 'fancybox-regbox',
			helpers: {
				title : {}
			}
    });

    $(document).on("click", "#moreAboutK", false, function(e){
      e.preventDefault();
      /*
      $(this).next().toggle(300);
      $(this).hide();
      */
    });

    $(document).on("click", "#moreAboutH", false, function(e){
      e.preventDefault();
      /*
      $(this).parent().toggle(300,function(){
        $(this).prev().show();
      });
      */
    });

		$('input:text').each(function(){
			var txtval = $(this).val();
			$(this).focus(function(){
				$(this).css({'color':'#000'});
				if($(this).val() == txtval){
					$(this).val('')
				}
			});
			$(this).blur(function(){
				$(this).css({'color':'#a3a3a3'});
				if($(this).val() == ""){
					$(this).val(txtval);
				}
			});
		});
		
		//
		$('.all-b').eq(0).toggle(
			function(e){
				$(".hide-pos").eq(0).show();
				$('.calendar-inner .title-small').hide();
				var message = $(".all-b a").eq(0).attr("hm");
        if(!message) message = 'Скрыть прошедшие мероприятия';
        $(".all-b a").eq(0).html(message);
			},
			function(){
				$(".hide-pos").eq(0).hide();
				$('.calendar-inner .title-small').show();
				var message = $(".all-b a").eq(0).attr("sm");
        if(!message) message = 'Показать прошедшие мероприятия';
				$(".all-b a").eq(0).html(message);
				$(window).scrollTop($(".calendar-box").offset().top -180);
				e.preventDefault();
			}
		);

    //переключение мероприятий
		$('.all-b').eq(1).toggle(
			function(e){
				$(".hide-pos").eq(1).show();
				var message = $(".all-b a").eq(1).attr("hm");
        if(!message) message = 'Скрыть предстоящие мероприятия';
				$(".all-b a").eq(1).html(message);
			},
			function(){
				$(".hide-pos").eq(1).hide();
				var message = $(".all-b a").eq(1).attr("sm");
        if(!message) message = 'Показать список всех предстоящих мероприятий';
				$(".all-b a").eq(1).html(message);
				$(window).scrollTop($(".calendar-box").offset().top -180);
				e.preventDefault();
			}
		);

    //переключение новостей
		$('.all-b2').toggle(function(e){
			$(".hide-pos2").show();
			var message = $(".all-b2 a").attr("hm");
      if(!message) message = 'Показать последние новости';
			$(".all-b2 a").html(message);},
			function(){
			$(".hide-pos2").hide();
			var message = $(".all-b2 a").attr("sm");
      if(!message) message = 'Показать все новости';
			$(".all-b2 a").html(message);
			$(window).scrollTop($(".news-box").offset().top -180);
			e.preventDefault();
		});
		
		//
		$('.subs-box span').toggle(function(e){
			$(this).hide();
			$(".subs-form").show();},
			function(){
			$(this).show();
			$(".subs-form").hide();
			e.preventDefault();
		});

		//
		$('.partner-box .title a').live("click", function(e) {
			e.preventDefault();
			$(this).parent().find('span').replaceWith(function(index, oldHTML){
				return $('<a href="#"></a>').html(oldHTML);
			});
			$(this).replaceWith(function(index, oldHTML){
				return $('<span></span>').html(oldHTML);
			});
			$("div.sp").slideToggle("fast");
			$("div.insp").slideToggle("fast");

		});
		
		$(".insp").hide();


		//
		$("a.ancLinks").click(function (e) {
			e.preventDefault();
			elementClick = $(this).attr("href");
			destination = $(elementClick).offset().top - 180;
			$(this).siblings("li").removeClass("current").parents('li').toggleClass("current");
			if($.browser.safari){
				$('body').animate( { scrollTop: destination }, 1100 );
			}else{
				$('html').animate( { scrollTop: destination }, 1100 );
			}
		});
		
    // обработка скроллинга
		$(window).bind('load resize scroll', function() {
			if ($('body').length == 1) {
				var curScroll = $(window).scrollTop();
				if (!$('body').data('scrollAnimation')) {
					if (curScroll < $('#goTwo').offset().top - 180) {
						$('.mmenu li').removeClass('current');
						$('.about').addClass('current');
					} else if (curScroll < $('#goThree').offset().top - 180) {
						$('.mmenu li').removeClass('current');
						$('.calendar').addClass('current');
					} else if (curScroll < $('#goFour').offset().top - 180) {
						$('.mmenu li').removeClass('current');
						$('.partner').addClass('current');
					} else if (curScroll < $('#goFive').offset().top - 180) {
						$('.mmenu li').removeClass('current');
						$('.news').addClass('current');
					}
				}
				if ($(window).scrollTop() == $(document).height() - $(window).height()) {
					$('.mmenu li').removeClass('current');
					$('.contact').addClass('current');
				}
				
				/* Параллакс 
				
				var bgPos1 = - 170 + (-$('.about-box-paralax1').position().top + curScroll)*.25;
				var bgPos2 = 270 + (-$('.about-box-paralax2').position().top + curScroll)*.25;
				var bgPos3 = 235 + (-$('.calendar-box-parallax').position().top + curScroll)*.25;
				var bgPos4 = -200 + (-$('.partner-box-parallax').position().top + curScroll)*.25;
				var bgPos5 = 0 + (-$('.news-box-parallax').position().top + curScroll)*.25;
				var bgPos6 = 0 + (-$('.contact-box-parallax').position().top + curScroll)*.25;

				$('.about-box-paralax1').css('background-position',"right " + bgPos1 + "px");
				$('.about-box-paralax2').css('background-position',"100% " + bgPos2 + "px");
				$('.calendar-box-parallax').css('background-position',"-100px " + bgPos3 + "px");
				$('.partner-box-parallax').css('background-position',"0 " + bgPos4 + "px");
				$('.news-box-parallax').css('background-position',"0 " + bgPos5 + "px");
				$('.contact-box-parallax').css('background-position',"100% " + bgPos6 + "px");
				
				Параллакс END */
			}
		});

		// disabled link - потом удалить
		$(".help a, .pos01 a, .pos02 a, .pos03 a").click(function(e){
			e.preventDefault();
		});

		// ttip
		$(".ttip").easyTooltip();


		//раскрытие проекта
		$(".calendar-inner table.act").click(function(e){
			e.preventDefault();
			
			$(this).next("div.drop").slideToggle(300).siblings("div.drop:visible").slideUp(300);
			$(this).toggleClass("active");
			$(this).siblings("table").removeClass("active");

			var id = $(this).attr("rel");
			var lang = $(this).attr("lang");
			var item = $(this);
			if(!$(this).hasClass("loaded") && id){
				$.post('/ajax/load.project.php',{'id': id, 'lang':lang}, function(data) {
					item.next("div.drop").find("div.drop-inner").html(data);
					item.addClass("loaded");
          //проверим есть ли запрос на таб
          var tab = getUrlVar("tab");
          if(tab){
            $("#event"+id+" ."+tab+"").click();
          }
				});                                 
			}
		});

		//
		$(document).on('click', 'ul.tabs li:not(.current)', function(e) {
			e.preventDefault();
			$(this).addClass('current').siblings().removeClass('current').parents('div.drop').find('div.tbox').hide().eq($(this).index()).fadeIn(150);
		});
		
		//и сразу отключим дефолтное событие на неактивной
		$(document).delegate('ul.tabs li.current', 'click', function(e) {
			e.preventDefault();
		});

		//
		$(".event2_1").click(function(e){
			$(".event2").find('table').toggleClass("active");
			$("div.drop").eq(1).show();
			e.preventDefault();
		});

		//раскрытие новости
		$(".news-inner table").click(function(e){
			e.preventDefault();
		
			$(this).next("div.drop").slideToggle(300).siblings("div.news-full:visible").slideUp(300);
			$(this).toggleClass("active");
			$(this).siblings("table").removeClass("active");
			
			var item_id = $(this).attr("rel");
			var lang = $(this).attr("lang"); 
			var item = $(this);
			if(!$(this).hasClass("loaded") && item_id){
				$.post('/ajax/load.news.php?id='+item_id,{id: item_id, lang : lang}, function(data) {
					item.next("div.drop").find("div.drop-inner").html(data);
					item.addClass("loaded");
				});
			}
		});
		
		//	
		$('.fancybox').fancybox();
		
		$('.fancybox-gal').fancybox({
			wrapCSS    : 'fancybox-custom',
			helpers: {
				title : {
					type : 'inside'
				}
			},
      tpl : {
  			closeBtn: '<div title="" class="fancybox-item fancybox-close"></div>',
  			next: '<a title="" class="fancybox-item fancybox-next"><span></span></a>',
  			prev: '<a title="" class="fancybox-item fancybox-prev"><span></span></a>'
      }
		});
		
		$('.fancybox-reg').fancybox({
			wrapCSS    : 'fancybox-regbox',
			helpers: {
				title : {}
			},
      beforeShow: function(){
        var id = $(this.element).attr('rel');
        if(id){
  				$(".reg-box input[type='checkbox']").removeAttr("checked");
  				$(".reg-box .checkboxlabelclass").removeClass("labelselected");
  				$("#checkbox"+id).attr("checked","checked");
  				$("#label"+id).addClass("labelselected");
        }
      }
		});
                                
    //загрузка стенограммы
		$('.steno').fancybox({
			wrapCSS    : 'fancybox-regbox',
			helpers: {
				title : {}
			},
      beforeShow: function(){
        var id = $(this.element).attr('rel');
        var lang = $(this.element).attr('lang');
        if(id){
          $.post('/ajax/load.stenogramm.php',{id : id, lang : lang}, function(data) {
            $('.stenocontent').html(data);
          });
        }
      }
		});
		
		$('.fancybox-privacy').fancybox();
		
		//
		$(".checkboxclass").click(function(){
			if($(this).is(":checked")){
				$(this).next("label").addClass("labelselected");
			}else{
				$(this).next("label").removeClass("labelselected");
			}
		});
		
    //если загружено событие
		if( $('.pos01 a.eventlink').length ){
			id = getUrlVar('event');
			id = id ? id : '';
			if( id ){
				$('html, body').animate({
					 scrollTop: $('.pos01 a.eventlink').eq(id).offset().top - 190
				 }, 1000);
				$('.pos01 a.eventlink').eq(id).click();
			};
		}
		
	})
  
	$(document).ajaxComplete(function(){
		try{
			FB.XFBML.parse(); 
		}catch(ex){}
		
		twttr.widgets.load();
	});  
    
})(jQuery);


function getUrlVar(key){
	var result = new RegExp('[\\?&]' + key + "=([^&]*)", "i").exec(window.location.search); 
	return result && result[1] || ""; 
}

$(".subs-form input[type='submit']").live("click", function(){
	var eml = $("#emailSubs").val();
	var def = $("#emailSubs").attr("rel");
	if(eml && eml != def){
		$.ajax({
			url: "/ajax/subscribe.php",
			type: "POST",
			dataType: "json",
			data: {email:eml}
		}).done(function ( data ) {
			if(data.status == "1"){
				$("#emailSubs").val(def).blur();
			}
			alert(data.message);
		});
	}
	return false;
});

$(".reg-box .send-b").live("click", function(){
	var surname = $(".reg-box input[name='surname']").val();
	var name = $(".reg-box input[name='name']").val();
	var midname = $(".reg-box input[name='midname']").val();
	var company = $(".reg-box input[name='company']").val();
	var post = $(".reg-box input[name='post']").val();
	var email = $(".reg-box input[name='email']").val();
	var phone = $(".reg-box input[name='phone']").val();
	var events = [];
	$(".reg-box input[name='events[]']:checked").each(function() {
		events.push($(this).val());
	}); 
	var agreement = $(".reg-box input[name='agreement']:checked").val();
	if(agreement){
		$.ajax({
		url: "/ajax/register.php",
		type: "POST",
		dataType: "json",
		data: {surname:surname, name:name, midname:midname, company:company, post:post, email:email, phone:phone, events:events, agreement:agreement}
		}).done(function ( data ) {
			if(data.status == "1"){
				//обнулим форму
				$(".reg-box input[name='surname']").val("");
				$(".reg-box input[name='name']").val("");
				$(".reg-box input[name='midname']").val("");
				$(".reg-box input[name='company']").val("");
				$(".reg-box input[name='post']").val("");
				$(".reg-box input[name='email']").val("");
				$(".reg-box input[name='phone']").val("");
				$(".reg-box input[type='checkbox']").removeAttr("checked");
				$(".reg-box .checkboxlabelclass").removeClass("labelselected");
			}else {
				$(".reg-box input[name='"+data.status+"']").focus();
			}
			alert(data.message);
		});
	}else{
		alert("Необходимо согласие с политикой конфиденциальности");
	}
	return false;
});
